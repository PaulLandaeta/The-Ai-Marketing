from typing import Protocol, List
from app.domain.models import FactCard


class TrendsPort(Protocol):
    async def top_queries(self, query: str) -> List[FactCard]: ...