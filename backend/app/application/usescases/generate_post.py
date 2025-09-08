from typing import Dict, List
import uuid
from app.adapters.logger_structlog import logger
from app.application.services.post_agent import PostAgent
from app.application.ports.image import ImageGenPort
from app.application.dto.post_generation import GeneratePostIn
from app.application.services.mappers import image_prompt_from_controls
from app.application.utils.costs import image_cost_usd

DEFAULT_IMAGE_SIZE = "1024x1024"

class GeneratePostFromSources:
    def __init__(self, agent: PostAgent, image_gen: ImageGenPort | None = None):
        self.agent = agent
        self.image_gen = image_gen

    def _one(self, body: GeneratePostIn) -> Dict:
        topic = body.topic or body.prompt
        run_id = uuid.uuid4().hex[:12]
        logger.info(
            "post.usecase.one.start",
            topic=topic,
            audience=body.audience,
            tone=body.tone,
            word_count=body.word_count,
            n_images=body.n_images,
        )
        result = self.agent.run(
            topic=topic,
            audience=body.audience,
            tone=body.tone,
            sources=[],
            max_len=body.word_count,
            seed_hashtags=body.seed_hashtags,
        )

        usage = result.get("usage") or {}
        image_size = getattr(body, "image_size", DEFAULT_IMAGE_SIZE) or DEFAULT_IMAGE_SIZE
        n_images = int(body.n_images or 0)
        llm_usd = float(usage.get("llm_usd", 0.0))


        # Image prompt enriquecido por UI
        if body.n_images and body.n_images > 0:
            base_prompt = image_prompt_from_controls(topic, body.image_style, body.image_palette)
            prompts = [
                f"{base_prompt} (variation {i+1})" for i in range(body.n_images)
            ]
            # Unique filenames per run to avoid browser/proxy caching
            filenames = [f"post-{run_id}-{i+1:02d}.png" for i in range(body.n_images)]
            if self.image_gen:
                logger.info("image.generate_many.start", count=len(prompts))
                result["images"] = self.image_gen.generate_many(prompts=prompts, filenames=filenames)
                logger.info("image.generate_many.done", count=len(result.get("images", [])))
            result["image_prompt"] = base_prompt
            img_usd = image_cost_usd(size=image_size, n_images=n_images)
        else:
            if self.image_gen:
                logger.info("image.generate.start", size=getattr(body, "image_size", None))
                result["image_url"] = self.image_gen.generate(
                    prompt=image_prompt_from_controls(topic, body.image_style, body.image_palette),
                    # Unique filename per run to avoid caching the same URL
                    filename=f"post-{run_id}.png",
                )
                logger.info("image.generate.done", url=result.get("image_url"))
                img_usd = image_cost_usd(size=image_size, n_images=1)
        
        total_usd = round(llm_usd + img_usd, 4)
        result["usage"] = {**usage, "image_usd": round(img_usd, 4), "total_usd": total_usd}
        result["run_id"] = run_id
        logger.info("post.usecase.one.done", run_id=run_id)
        return result

    def execute(self, payload: Dict) -> Dict:
        body = GeneratePostIn(**payload)
        variations = body.variations

        logger.info(
            "post.usecase.execute.start",
            variations=variations,
            prompt_len=len(body.prompt or ""),
            audience=body.audience,
            tone=body.tone,
        )

        if variations == 1:
            out = self._one(body)
            logger.info("post.usecase.execute.done", options=1)
            return out

        # varias opciones de post
        options: List[Dict] = []
        for i in range(variations):
            # variantes ligeras: añade hints al prompt
            body_i = body.copy()
            body_i.prompt = f"{body.prompt} (variation {i+1})"
            options.append(self._one(body_i))

        result = {
            "topic": body.topic or body.prompt,
            "audience": body.audience,
            "tone": body.tone,
            "options": options,
        }
        logger.info("post.usecase.execute.done", options=len(options))
        return result
