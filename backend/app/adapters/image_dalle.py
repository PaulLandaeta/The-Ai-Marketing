import os
import base64
from typing import Optional
from openai import OpenAI
from app.application.ports.image import ImageGenPort

def _slugify(text: str) -> str:
    return "".join(c.lower() if c.isalnum() else "-" for c in text).strip("-")

class DalleAdapter(ImageGenPort):
    def __init__(
        self,
        model: str = "gpt-image-1",
        api_key: Optional[str] = None,
        out_dir: str = "app/static",        # directorio servido en /static
        public_url_prefix: str = "/static", # prefijo público
    ):
        self.client = OpenAI(api_key=api_key or os.getenv("OPENAI_API_KEY"))
        self.model = model
        self.out_dir = out_dir
        self.public_url_prefix = public_url_prefix
        os.makedirs(self.out_dir, exist_ok=True)

    def _generate_image_resp(self, prompt: str):
        # Llamada síncrona al SDK de OpenAI
        return self.client.images.generate(
            model=self.model,
            prompt=prompt,
            size="1024x1024",
        )

    def _get_b64_from_resp(self, resp) -> str:
        if not getattr(resp, "data", None) or len(resp.data) == 0:
            raise RuntimeError("Image generation returned no data.")
        item = resp.data[0]
        b64 = getattr(item, "b64_json", None)
        if b64:
            return b64
        url = getattr(item, "url", None)
        if url:
            raise RuntimeError(
                "Image generation returned a URL instead of base64. "
                "Switch adapter to download URLs if needed."
            )
        raise RuntimeError("Image generation payload missing both b64_json and url.")

    def generate(self, *, prompt: str, filename: str | None = None) -> str:
        resp = self._generate_image_resp(prompt)
        b64 = self._get_b64_from_resp(resp)

        # nombre de archivo estable, evitando strings enormes
        base = _slugify(prompt)[:48] or "image"
        fname = filename or f"{base}.png"

        path = os.path.join(self.out_dir, fname)
        # si existe, versionamos simple: image.png -> image-1.png, etc.
        if os.path.exists(path):
            root, ext = os.path.splitext(path)
            i = 1
            while os.path.exists(f"{root}-{i}{ext}"):
                i += 1
            path = f"{root}-{i}{ext}"
            fname = os.path.basename(path)

        with open(path, "wb") as f:
            f.write(base64.b64decode(b64))

        return f"{self.public_url_prefix}/{fname}"
