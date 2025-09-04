import os
import time
from typing import Any, Dict, Optional, Tuple
from openai import OpenAI
from app.application.ports.llm import LLMPort
from app.adapters.logger_structlog import logger


class OpenAIAdapter(LLMPort):
    def __init__(self, model: str = "gpt-4o-mini", api_key: Optional[str] = None):
        self.client = OpenAI(api_key=api_key or os.getenv("OPENAI_API_KEY"))
        self.model = model

    def complete(self, prompt: str, *, system: Optional[str] = None) -> str:
        start = time.perf_counter()
        messages = []
        if system:
            messages.append({"role": "system", "content": system})
        messages.append({"role": "user", "content": prompt})
        logger.info("llm.request", model=self.model)
        resp = self.client.chat.completions.create(
            model=self.model,
            messages=messages,
            temperature=0.7,
        )
        dur_ms = int((time.perf_counter() - start) * 1000)
        logger.info("llm.response", duration_ms=dur_ms)
        return resp.choices[0].message.content or ""
    
    
    def complete_with_usage(self, *, prompt: str, system: str) -> Tuple[str, Dict[str, Any]]:
        """Texto + usage real (tokens/margen)."""
        resp = self.client.chat.completions.create(
            model=self.model,
            temperature=self.temperature,
            messages=[
                {"role": "system", "content": system},
                {"role": "user", "content": prompt},
            ],
        )
        text = resp.choices[0].message.content or ""
        u = getattr(resp, "usage", None)
        usage = {
            "model": self.model,
            "prompt_tokens": getattr(u, "prompt_tokens", 0) if u else 0,
            "completion_tokens": getattr(u, "completion_tokens", 0) if u else 0,
            "total_tokens": getattr(u, "total_tokens", 0) if u else 0,
        }
        return text, usage