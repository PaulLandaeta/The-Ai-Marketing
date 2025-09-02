from typing import Protocol, List, Optional
from app.domain.models import VisualConcept


class ImageGenPort(Protocol):
    async def generate(self, *, prompt: str, filename: str | None = None) -> str:
        ...

    def generate_many(
            self,
            *,
            prompts: List[str],
            filenames: Optional[List[str]] = None,
    ) -> List[str]:
        ...