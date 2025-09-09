import json
from app.adapters.post_reviewer import PostReviewAdapter


class FakeLLM:
    def __init__(self, payload: dict | None = None):
        self.payload = payload or {"good_post_percent": 78, "credibility": 85, "reasons": ["Clear", "Accurate"]}

    def complete(self, *, prompt: str, system: str | None = None) -> str:  # type: ignore[override]
        return json.dumps(self.payload)


def test_post_reviewer_parses_json():
    llm = FakeLLM()
    reviewer = PostReviewAdapter(llm=llm)  # type: ignore[arg-type]
    out = reviewer.review(post="content", topic="t", audience="a", tone="professional")
    assert 0 <= out["good_post_percent"] <= 100
    assert 0 <= out["credibility"] <= 100
    assert isinstance(out["reasons"], list)

