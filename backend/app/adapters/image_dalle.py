import os
import time
import base64
from typing import Optional, List
from openai import OpenAI
from app.application.ports.image import ImageGenPort
from app.adapters.logger_structlog import logger

def _slugify(text: str) -> str:
    return "".join(c.lower() if c.isalnum() else "-" for c in text).strip("-")

class DalleAdapter(ImageGenPort):
    def __init__(
        self,
        model: str = "gpt-image-1",
        api_key: Optional[str] = None,
        out_dir: str = "app/static",
        public_url_prefix: str = "/static",
        size: str = "1024x1024",
    ):
        self.client = OpenAI(api_key=api_key or os.getenv("OPENAI_API_KEY"))
        self.model = model
        self.out_dir = out_dir
        self.public_url_prefix = public_url_prefix
        self.size = size
        os.makedirs(self.out_dir, exist_ok=True)

    def _call_generate(self, prompt: str):
        logger.info("image.api.request", model=self.model, size=self.size)
        return self.client.images.generate(
            model=self.model,
            prompt=prompt,
            size=self.size,
        )

    @staticmethod
    def _extract_b64(resp) -> str:
        if not getattr(resp, "data", None):
            raise RuntimeError("Image generation returned no data.")
        item = resp.data[0]
        if getattr(item, "b64_json", None):
            return item.b64_json
        if getattr(item, "url", None):
            raise RuntimeError("Server returned URL; this adapter expects base64.")
        raise RuntimeError("Image generation payload missing b64_json/url.")

    def generate(self, *, prompt: str, filename: str | None = None) -> str:
        start = time.perf_counter()
        logger.info("image.generate", prompt_preview=prompt[:60])
        resp = self._call_generate(prompt)
        b64 = self._extract_b64(resp)
        fname = filename or f"{_slugify(prompt)[:48]}.png"
        path = os.path.join(self.out_dir, fname)
        with open(path, "wb") as f:
            f.write(base64.b64decode(b64))
        dur_ms = int((time.perf_counter() - start) * 1000)
        url = f"{self.public_url_prefix}/{fname}"
        logger.info("image.saved", path=path, url=url, duration_ms=dur_ms)
        return url

    def generate_many(
        self,
        *,
        prompts: List[str],
        filenames: Optional[List[str]] = None,
    ) -> List[str]:
        if filenames and len(filenames) != len(prompts):
            raise ValueError("filenames length must match prompts length")
        urls: List[str] = []
        for i, p in enumerate(prompts):
            fname = (
                filenames[i]
                if filenames
                else f"{i+1:02d}-{_slugify(p)[:40]}.png"
            )
            urls.append(self.generate(prompt=p, filename=fname))
        return urls
