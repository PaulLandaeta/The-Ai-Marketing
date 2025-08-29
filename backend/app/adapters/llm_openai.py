import os
from typing import Optional
from openai import AsyncOpenAI
from app.application.ports.llm import LLMPort


class OpenAIAdapter(LLMPort):
    def __init__(self, model: str = "gpt-4o-mini", api_key: Optional[str] = None):
        self.client = AsyncOpenAI(api_key=api_key or os.getenv("OPENAI_API_KEY"))
        self.model = model

    async def complete(self, prompt: str, *, system: Optional[str] = None) -> str:
        messages = []
        if system:
            messages.append({"role": "system", "content": system})
        messages.append({"role": "user", "content": prompt})
        resp = await self.client.chat.completions.create(
            model=self.model,
            messages=messages,
            temperature=0.7,
        )
        return resp.choices[0].message.content or ""