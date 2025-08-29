from typing import Protocol, List

class LLMPort(Protocol):
    async def complete(self, prompt: str, *, system: str | None = None) -> str: ...