import json
from typing import List
from app.adapters.logger_structlog import logger
from app.adapters.llm_openai import OpenAIAdapter
from app.application.ports.post_review import PostReviewPort, ReviewOutput


SYSTEM_REVIEWER = (
    "You are a strict LinkedIn post reviewer. "
    "Evaluate content quality and credibility. "
    "Return only JSON with fields: good_post_percent (0..100), credibility (0..100), reasons (array of short strings)."
)


class PostReviewAdapter(PostReviewPort):
    def __init__(self, llm: OpenAIAdapter):
        self.llm = llm

    def review(
        self,
        *,
        post: str,
        topic: str,
        audience: str,
        tone: str,
        max_len: int = 1800,
    ) -> ReviewOutput:
        logger.info(
            "post.reviewer.review",
            topic=topic,
            audience=audience,
            tone=tone,
            max_len=max_len,
            text_len=len(post or ""),
        )

        prompt = (
            "Evaluate the following LinkedIn post draft.\n"
            f"Topic: {topic}\n"
            f"Audience: {audience}\n"
            f"Expected tone: {tone}\n"
            f"Max length guidance: ~{max_len} words.\n"
            "Criteria: clarity, structure (hook → body → CTA), audience fit, tone consistency, usefulness, originality, and factual caution (no fabricated claims).\n"
            "Return JSON exactly with keys: good_post_percent, credibility, reasons.\n"
            "Post:\n" + post.strip()
        )

        raw = self.llm.complete(prompt=prompt, system=SYSTEM_REVIEWER)

        def _fallback() -> ReviewOutput:
            return {
                "good_post_percent": 60.0,
                "credibility": 60.0,
                "reasons": ["Default heuristic fallback"],
            }

        try:
            # try direct JSON
            data = json.loads(raw)
        except Exception:
            try:
                # try to extract JSON block
                start = raw.find("{")
                end = raw.rfind("}")
                if start != -1 and end != -1 and end > start:
                    data = json.loads(raw[start : end + 1])
                else:
                    logger.warning("post.reviewer.parse_failed", sample=raw[:120])
                    return _fallback()
            except Exception:
                logger.warning("post.reviewer.parse_failed.json_block", sample=raw[:120])
                return _fallback()

        try:
            reasons: List[str] = data.get("reasons") or []
            gp = float(data.get("good_post_percent", 0.0))
            cr = float(data.get("credibility", 0.0))
            review: ReviewOutput = {
                "good_post_percent": max(0.0, min(100.0, gp)),
                "credibility": max(0.0, min(100.0, cr)),
                "reasons": [str(r) for r in reasons][:6],
            }
            return review
        except Exception:
            logger.warning("post.reviewer.normalize_failed")
            return _fallback()

