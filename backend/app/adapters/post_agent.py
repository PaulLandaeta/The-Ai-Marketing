from typing import List, Optional
from app.application.ports.post_agent import PostGenerationPort, PostOutput
from app.adapters.llm_openai import OpenAIAdapter

SYSTEM_PROMPT = (
    "You are an elite LinkedIn content strategist. "
    "Generate ONE clear, engaging post with hook + insight + CTA. "
)


def _sanitize_hashtags(tags: Optional[List[str]]) -> List[str]:
    if not tags:
        return []
    out = []
    seen = set()
    for t in tags:
        t = t.strip()
        if not t:
            continue
        if not t.startswith("#"):
            t = "#" + t.lstrip("#")
        t = t.replace(" ", "")  # LinkedIn hashtags sin espacios
        if t.lower() not in seen:
            seen.add(t.lower())
            out.append(t)
    # límite razonable
    return out[:6]

class PostGenerationAdapter(PostGenerationPort):
    def __init__(self, llm: OpenAIAdapter):
        self.llm = llm

    def generate_post(
            self,
            *,
            topic: str,
            audience: str,
            tone: str,
            max_len: int = 1800,
            seed_hashtags: Optional[List[str]] = None,
    ) -> PostOutput:
        system = f"{SYSTEM_PROMPT} Tone: {tone}. Audience: {audience}. Max length: {max_len}."
        user = f"Topic: {topic}\n\nWrite a LinkedIn post for {audience}."

        output = self.llm.complete(prompt=user, system=system)
        hashtags = seed_hashtags or ["#AI", "#Marketing"]
        image_prompt = f"Illustration about {topic}"

        return {
            "post": output.strip(),
            "hashtags": hashtags,
            "image_prompt": image_prompt,
            "score": 0.0,
            "sources": [],
        }
