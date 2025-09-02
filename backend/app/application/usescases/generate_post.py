from typing import Dict
from app.application.services.post_agent import PostAgent
from app.application.ports.post_agent import PostOutput


class GeneratePostFromSources:
    def __init__(self, agent: PostAgent):
        self.agent = agent

    def execute(self, payload: Dict) -> PostOutput:
        return self.agent.run(
            topic=payload["topic"],
            audience=payload.get("audience", "general"),
            tone=payload.get("tone", "professional"),
            sources=payload.get("sources", []),
            max_len=payload.get("max_len", 1800),
            seed_hashtags=payload.get("seed_hashtags"),
        )
