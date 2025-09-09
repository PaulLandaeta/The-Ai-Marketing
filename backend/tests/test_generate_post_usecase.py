from typing import List

from app.application.usescases.generate_post import GeneratePostFromSources
from app.application.services.post_agent import PostAgent
from app.application.ports.post_agent import PostOutput
from app.application.ports.image import ImageGenPort


class FakeGenerator:
    def generate_post(self, **kwargs) -> PostOutput:  # type: ignore[override]
        return {
            "post": "Hello world post",
            "hashtags": ["#hello"],
            "image_prompt": "Minimal, clean illustration representing: test",
            "score": 0.0,
            "sources": [],
            "usage": {"model": "fake", "prompt_tokens": 1, "completion_tokens": 1, "total_tokens": 2, "llm_usd": 0.0},
        }


class FakeImage(ImageGenPort):
    def generate(self, *, prompt: str, filename: str | None = None) -> str:  # type: ignore[override]
        return f"/static/{filename or 'one.png'}"

    def generate_many(self, *, prompts: List[str], filenames: List[str] | None = None) -> List[str]:  # type: ignore[override]
        names = filenames or [f"img-{i}.png" for i in range(len(prompts))]
        return [f"/static/{n}" for n in names]


def test_usecase_single_image_path_and_costs():
    agent = PostAgent(generator=FakeGenerator())
    uc = GeneratePostFromSources(agent=agent, image_gen=FakeImage())

    payload = {
        "prompt": "Generate a test post",
        "variations": 1,
        "word_count": 100,
        "tone": "professional",
        "audience": "general",
        "n_images": 0,
    }
    out = uc.execute(payload)
    assert out["post"]
    # When n_images == 0 and image_gen present, it generates one image_url
    assert "image_url" in out
    assert out["usage"]["total_usd"] >= out["usage"]["llm_usd"]


def test_usecase_multiple_images():
    agent = PostAgent(generator=FakeGenerator())
    uc = GeneratePostFromSources(agent=agent, image_gen=FakeImage())
    payload = {
        "prompt": "Another test",
        "variations": 1,
        "word_count": 100,
        "tone": "professional",
        "audience": "general",
        "n_images": 2,
        "image_style": "minimal-ui",
        "image_palette": "blue/green",
        "image_size": "512x512",
    }
    out = uc.execute(payload)
    assert isinstance(out.get("images"), list)
    assert len(out["images"]) == 2

