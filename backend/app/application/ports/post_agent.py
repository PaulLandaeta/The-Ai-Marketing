from typing import Any, Dict, NotRequired, Protocol, List, Optional, TypedDict


class PostOutput(TypedDict):
    post: str
    hashtags: List[str]
    image_prompt: str
    score: float
    sources: List[str]
    usage: NotRequired[Dict[str, Any]]


class PostGenerationPort(Protocol):
    def generate_post(
        self,
        *,
        topic: str,
        audience: str,
        tone: str,
        max_len: int = 1800,
        seed_hashtags: Optional[List[str]] = None,
        # optional extras
        template: str = "professional",
        include_emojis: bool = False,
        language: str = "en",
        brand_rules: Optional[dict] = None,
        prompt: Optional[str] = None,
        generate_hashtags: bool = True,
        # más adelante: curated_context: str,
    ) -> PostOutput:
        ...
