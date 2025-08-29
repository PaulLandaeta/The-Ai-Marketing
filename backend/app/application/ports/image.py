from typing import Protocol
from app.domain.models import VisualConcept


class ImageGenPort(Protocol):
    async def propose(self, message: str) -> VisualConcept: ...