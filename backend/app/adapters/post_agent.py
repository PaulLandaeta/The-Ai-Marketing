from typing import List, Optional
import json
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
        
        # --- hashtags -------------------------------------------------------
        hashtags: List[str] = []
        if generate_hashtags:
            # If user provided seeds, sanitize them; else ask LLM for 3–6 tags
            seeds = _sanitize_hashtags(seed_hashtags)
            if seeds:
                hashtags = seeds
            else:
                def _fallback() -> List[str]:
                    # Build simple, deterministic tags from topic and audience
                    import re
                    words = [w for w in re.split(r"[^A-Za-z0-9]+", topic) if len(w) > 2]
                    uniq = []
                    seen = set()
                    for w in words:
                        lw = w.lower()
                        if lw not in seen:
                            seen.add(lw); uniq.append(lw)
                    base = [f"#{w}" for w in uniq[:5]]
                    if audience and audience.strip():
                        a = re.sub(r"[^A-Za-z0-9]", "", audience.strip().lower())
                        if a:
                            base.append("#" + a)
                    return _sanitize_hashtags(base)[:6]

                hs_system = (
                    "You are a social media strategist. Return only JSON: a flat array of 3-6 hashtags (strings)"
                    " without the leading #, concise, no spaces, no duplicates."
                )
                hs_user = (
                    f"Generate hashtags for a LinkedIn post.\n"
                    f"Topic: {topic}\nAudience: {audience}\nLanguage: {language}"
                )
                raw = self.llm.complete(prompt=hs_user, system=hs_system)
                parsed = False
                try:
                    data = json.loads(raw)
                    if isinstance(data, list):
                        hashtags = _sanitize_hashtags([str(x) for x in data])
                        parsed = len(hashtags) > 0
                except Exception:
                    # try to extract JSON array from text
                    try:
                        start = raw.find('['); end = raw.rfind(']')
                        if start != -1 and end != -1 and end > start:
                            data = json.loads(raw[start:end+1])
                            if isinstance(data, list):
                                hashtags = _sanitize_hashtags([str(x) for x in data])
                                parsed = len(hashtags) > 0
                    except Exception:
                        pass
                if not parsed:
                    logger.warning("post.adapter.hashtags.fallback", sample=raw[:120])
                    hashtags = _fallback()
        
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
        logger.info(
            "post.adapter.generate_post.done",
            text_len=len(text),
            hashtags=len(hashtags),
            include_emojis=include_emojis,
            language=language,
            template=template,
        )
        return out
