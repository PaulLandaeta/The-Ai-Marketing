from typing import Protocol
from app.domain.models import VisualConcept


class ImageGenPort(Protocol):
    async def generate(self, *, prompt: str, filename: str | None = None) -> str:
        ...