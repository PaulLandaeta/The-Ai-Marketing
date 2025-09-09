from typing import List, Dict
from app.adapters.logger_structlog import logger
from app.application.ports.post_agent import PostGenerationPort, PostOutput
from app.application.ports.post_review import PostReviewPort
# from app.domain.services.trend_analyzer import TrendAnalyzerService
# from domain.services.content_curator import ContentCuratorService


class PostAgent:
    def __init__(
    self,
    *,
    generator: PostGenerationPort,
    reviewer: PostReviewPort | None = None,
    # trend_analyzer: TrendAnalyzerService,
    # curator: ContentCuratorService,
    ) -> None:
        self.generator = generator
        self.reviewer = reviewer
        # self.trend_analyzer = trend_analyzer
        # self.curator = curator


    def run(
    self,
    *,
    topic: str,
    audience: str,
    tone: str,
    sources: List[str],
    max_len: int = 1800,
    seed_hashtags: List[str] | None = None,
    template: str = "professional",
    include_emojis: bool = False,
    language: str = "en",
    brand_rules=None,
    prompt: str | None = None,
    generate_hashtags: bool = True,
    ) -> PostOutput:
        # trends = self.trend_analyzer.analyze(sources)
        # curated = self.curator.curate(sources, trends)
        logger.info("post.agent.run", topic=topic, audience=audience, tone=tone, max_len=max_len)
        result = self.generator.generate_post(
        topic=topic,
        audience=audience,
        tone=tone,
        # curated_context=curated,
        max_len=max_len,
        seed_hashtags=seed_hashtags,
        template=template,
        include_emojis=include_emojis,
        language=language,
        brand_rules=brand_rules,
        prompt=prompt,
        generate_hashtags=generate_hashtags,
        )
        # Post-generation verification (credibility + quality %)
        try:
            if self.reviewer and result.get("post"):
                review = self.reviewer.review(
                    post=result["post"],
                    topic=topic,
                    audience=audience,
                    tone=tone,
                    max_len=max_len,
                )
                # score: use the good_post_percent as main indicator
                result["score"] = float(review.get("good_post_percent", 0.0))
                result["credibility"] = float(review.get("credibility", 0.0))
                result["review"] = review
        except Exception as e:
            logger.warning("post.agent.review.failed", error=str(e))
        return result
