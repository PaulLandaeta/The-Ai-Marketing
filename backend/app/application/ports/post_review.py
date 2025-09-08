from typing import List, Protocol, TypedDict


class ReviewOutput(TypedDict):
    good_post_percent: float  # 0..100
    credibility: float        # 0..100
    reasons: List[str]


class PostReviewPort(Protocol):
    def review(
        self,
        *,
        post: str,
        topic: str,
        audience: str,
        tone: str,
        max_len: int = 1800,
    ) -> ReviewOutput:
        ...

