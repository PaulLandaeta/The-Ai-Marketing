import os
import base64
from typing import Optional, List
import anyio
from openai import OpenAI
from app.domain.models import VisualConcept, VisualFrame
from app.application.ports.image import ImageGenPort


class DalleAdapter(ImageGenPort):
    def __init__(
        self,
        model: str = "gpt-image-1",
        api_key: Optional[str] = None,
        out_dir: str = "app/static",       # directory served at /static
        public_url_prefix: str = "/static" # URL prefix for files in out_dir
    ):
        self.client = OpenAI(api_key=api_key or os.getenv("OPENAI_API_KEY"))
        self.model = model
        self.out_dir = out_dir
        self.public_url_prefix = public_url_prefix
        os.makedirs(self.out_dir, exist_ok=True)

    async def _generate_image_resp(self, prompt: str):
        """Run the blocking OpenAI SDK call in a worker thread."""
        def _call():
            return self.client.images.generate(
                model=self.model,   # "gpt-image-1"
                prompt=prompt,
                size="1024x1024",
            )
        return await anyio.to_thread.run_sync(_call)

    async def _get_b64_from_resp(self, resp) -> str:
        """Extract base64 or raise a clear error."""
        if not getattr(resp, "data", None) or len(resp.data) == 0:
            raise RuntimeError("Image generation returned no data.")
        item = resp.data[0]
        b64 = getattr(item, "b64_json", None)
        if b64:
            return b64
        # Some SDK/server combos may return a URL; surface that clearly.
        url = getattr(item, "url", None)
        if url:
            raise RuntimeError(
                "Image generation returned a URL instead of base64. "
                "Either download it manually or change the adapter to use URLs."
            )
        raise RuntimeError("Image generation payload missing both b64_json and url.")

    async def propose(self, message: str) -> VisualConcept:
        # 1) Frames (keep your heuristic)
        frames: List[VisualFrame] = [
            VisualFrame(title="Problem", shot="top-down desk messy"),
            VisualFrame(title="Solution", shot="clean UI hero"),
        ]

        # 2) Prompt (you can incorporate `message` as needed)
        prompt = (
            "Minimalist SaaS productivity app visual, clean UI mock, soft lighting, "
            "blue/green palette, crisp typography, modern UI card components"
        )

        # 3) Generate and extract base64
        resp = await self._generate_image_resp(prompt)
        b64 = await self._get_b64_from_resp(resp)

        # 4) Write file to static dir
        filename = "concept.png"
        path = os.path.join(self.out_dir, filename)
        with open(path, "wb") as f:
            f.write(base64.b64decode(b64))

        # 5) Return URL that maps to where it was saved
        rel_url = f"{self.public_url_prefix}/{filename}"

        return VisualConcept(
            format="Carousel",
            frames=frames,
            why="Blue/green conveys trust/calm; carousel performs well for LinkedIn B2B",
            image_url=rel_url,
        )
