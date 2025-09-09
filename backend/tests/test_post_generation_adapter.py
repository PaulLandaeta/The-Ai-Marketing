import json
from typing import Any

from app.adapters.post_agent import PostGenerationAdapter


class FakeLLM:
    def __init__(self, responses: list[str] | None = None):
        self._responses = responses or [
            "This is a generated post text.",
            json.dumps(["ai", "marketing", "growth"]),
        ]
        self.calls: list[dict[str, Any]] = []

    def complete(self, *, prompt: str, system: str | None = None) -> str:  # matches OpenAIAdapter interface
        self.calls.append({"prompt": prompt, "system": system})
        return self._responses[min(len(self.calls) - 1, len(self._responses) - 1)]


def test_generate_post_with_seed_hashtags():
    llm = FakeLLM()
    adapter = PostGenerationAdapter(llm=llm)  # type: ignore[arg-type]

    out = adapter.generate_post(
        topic="AI Marketing",
        audience="marketers",
        tone="professional",
        max_len=120,
        seed_hashtags=["AI", "#growth", "marketing", "AI"],
        template="professional",
        include_emojis=False,
        language="en",
        generate_hashtags=True,
    )

    assert out["post"].startswith("This is a generated post")
    # seeds are sanitized and deduped, with '#'
    assert set(out["hashtags"]) <= {"#ai", "#growth", "#marketing"}
    assert len(out["hashtags"]) == 3


def test_generate_post_generates_hashtags_when_no_seeds():
    # 1st call returns text, 2nd call returns a JSON array of tags
    llm = FakeLLM([
        "Post body text",
        json.dumps(["ai", "marKeting", "growth", "content"]),
    ])
    adapter = PostGenerationAdapter(llm=llm)  # type: ignore[arg-type]

    out = adapter.generate_post(
        topic="AI Marketing Trends",
        audience="growth teams",
        tone="professional",
        max_len=200,
        seed_hashtags=[],
        generate_hashtags=True,
    )
    assert len(out["hashtags"]) >= 3
    assert all(h.startswith("#") for h in out["hashtags"])


def test_generate_post_hashtag_fallback_when_llm_not_json():
    # 2nd call returns non-JSON; adapter should fallback to local tags
    llm = FakeLLM([
        "Body",
        "not-json here",
    ])
    adapter = PostGenerationAdapter(llm=llm)  # type: ignore[arg-type]

    out = adapter.generate_post(
        topic="AI Content Strategy",
        audience="B2B",
        tone="professional",
        seed_hashtags=None,
        generate_hashtags=True,
    )
    assert len(out["hashtags"]) >= 1
    assert all(h.startswith("#") for h in out["hashtags"])

