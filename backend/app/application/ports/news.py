from typing import Protocol, List
from app.domain.models import FactCard


class NewsPort(Protocol):
    async def headlines(self, query: str, days: int = 7) -> List[FactCard]: ...