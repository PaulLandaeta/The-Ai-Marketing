from typing import Protocol, List, Optional, TypedDict


class PostOutput(TypedDict):
    post: str
    hashtags: List[str]
    image_prompt: str
    score: float
    sources: List[str]


class PostGenerationPort(Protocol):
    def generate_post(
        self,
        *,
        topic: str,
        audience: str,
        tone: str,
        max_len: int = 1800,
        seed_hashtags: Optional[List[str]] = None,
        # más adelante: curated_context: str,
    ) -> PostOutput:
        ...