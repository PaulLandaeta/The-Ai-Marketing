from typing import List, Dict
from app.adapters.logger_structlog import logger
from app.application.ports.post_agent import PostGenerationPort, PostOutput
# from app.domain.services.trend_analyzer import TrendAnalyzerService
# from domain.services.content_curator import ContentCuratorService


class PostAgent:
    def __init__(
    self,
    *,
    generator: PostGenerationPort,
    # trend_analyzer: TrendAnalyzerService,
    # curator: ContentCuratorService,
    ) -> None:
        self.generator = generator
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
    ) -> PostOutput:
        # trends = self.trend_analyzer.analyze(sources)
        # curated = self.curator.curate(sources, trends)
        logger.info("post.agent.run", topic=topic, audience=audience, tone=tone, max_len=max_len)
        return self.generator.generate_post(
        topic=topic,
        audience=audience,
        tone=tone,
        # curated_context=curated,
        max_len=max_len,
        seed_hashtags=seed_hashtags,
        )
