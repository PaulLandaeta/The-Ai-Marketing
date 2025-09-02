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
            n_images = int(payload.get("n_images", 1))

            if n_images > 1:
                prompts: List[str] = [
                    f"{result['image_prompt']} (variation {i + 1})"
                    for i in range(n_images)
                ]
                filenames = [
                    f"post-img-{i + 1:02d}.png" for i in range(n_images)
                ]
                result["images"] = self.image_gen.generate_many(
                    prompts=prompts,
                    filenames=filenames,
                )
            else:
                result["image_url"] = self.image_gen.generate(
                    prompt=result["image_prompt"],
                    filename="post-img.png",
                )
        return result
