from typing import List, Optional
from app.adapters.logger_structlog import logger
from app.application.ports.post_agent import PostGenerationPort, PostOutput
from app.adapters.llm_openai import OpenAIAdapter
from app.application.services.mappers import build_system_prompt
from app.application.utils.costs import cost_from_usage_usd

def _sanitize_hashtags(tags: Optional[List[str]]) -> List[str]:
    if not tags: return []
    out, seen = [], set()
    for t in tags:
        t = ("#" + t.lstrip("#")).replace(" ", "")
        if t and t.lower() not in seen:
            seen.add(t.lower()); out.append(t)
    return out[:6]

class PostGenerationAdapter(PostGenerationPort):
    def __init__(self, llm: OpenAIAdapter):
        self.llm = llm

    def generate_post(
        self, *,
        topic: str,
        audience: str,
        tone: str,
        max_len: int = 1800,
        seed_hashtags: Optional[List[str]] = None,
        template: str = "professional",
        include_emojis: bool = False,
        language: str = "en",
        brand_rules=None,
        prompt: Optional[str] = None,
        generate_hashtags: bool = True,
    ) -> PostOutput:
        logger.info(
            "post.adapter.generate_post",
            topic=topic,
            audience=audience,
            tone=tone,
            max_len=max_len,
            template=template,
            include_emojis=include_emojis,
            language=language,
            generate_hashtags=generate_hashtags,
        )
        usage = {"model": getattr(self.llm, "model", "unknown"), "prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0}
        system = build_system_prompt(template, tone, audience, language, include_emojis, brand_rules)
        user = (
            f"Topic: {topic}\n"
            f"User prompt/context: {prompt or topic}\n"
            f"Hard limit: approx {max_len} words. "
            "Use short lines; end with a clear CTA. "
            "Do not invent facts."
        )
        text = self.llm.complete(prompt=user, system=system).strip()
        

        hashtags = _sanitize_hashtags(seed_hashtags) if generate_hashtags else []
        image_prompt = f"Minimal, clean illustration representing: {topic}"

        llm_usd = cost_from_usage_usd(
            model=usage.get("model", "unknown"),
            prompt_tokens=int(usage.get("prompt_tokens", 0)),
            completion_tokens=int(usage.get("completion_tokens", 0)),
        )
        usage["llm_usd"] = round(llm_usd, 4)
        
        out = {
            "post": text,
            "hashtags": hashtags,
            "image_prompt": image_prompt,
            "score": 0.0,
            "sources": [],
            "usage": usage, 
        }
        logger.info("post.adapter.generate_post.done", text_len=len(text), hashtags=len(hashtags))
        return out
