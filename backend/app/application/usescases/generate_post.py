from typing import Dict
from app.application.services.post_agent import PostAgent
from app.application.ports.image import ImageGenPort

class GeneratePostFromSources:
    def __init__(self, agent: PostAgent, image_gen: ImageGenPort | None = None):
        self.agent = agent
        self.image_gen = image_gen

    def execute(self, payload: Dict) -> Dict:
        result = self.agent.run(
            topic=payload["topic"],
            audience=payload.get("audience", "general"),
            tone=payload.get("tone", "professional"),
            sources=payload.get("sources", []),
            max_len=payload.get("max_len", 1200),
            seed_hashtags=payload.get("seed_hashtags"),
        )

        if self.image_gen and result.get("image_prompt"):
            result["image_url"] = self.image_gen.generate(
                prompt=result["image_prompt"],
                filename=None,
            )
        return result
