import uuid
from typing import List
from app.domain.models import BriefInput, BriefOutput, VisualConcept, FactCard
from app.application.ports.llm import LLMPort
from app.application.ports.trends import TrendsPort
from app.application.ports.news import NewsPort
from app.application.ports.image import ImageGenPort
from app.application.ports.logger import LoggerPort

class GenerateBrief:
    def __init__(self, llm: LLMPort, trends: TrendsPort, news: NewsPort, image: ImageGenPort, logger: LoggerPort):
        self.llm, self.trends, self.news, self.image, self.logger = llm, trends, news, image, logger

    def __call__(self, inp: BriefInput) -> BriefOutput:
        run_id = uuid.uuid4().hex
        self.logger.info("run.start", run_id=run_id, platform=inp.platform)

        facts: List[FactCard] = []
        # facts += self.trends.top_queries(inp.prompt)
        facts += self.trends.top_queries("OPEN AI")
        # facts += self.news.headlines(inp.prompt, days=7)
        facts += self.news.headlines("Bolivia", days=7)
        self.logger.info("facts.collected", count=len(facts))

        core_text = self.llm.complete(
            f"Genera un copy de lanzamiento breve y claro para {inp.platform}. Prompt: {inp.prompt}"
        )
        caption = self.llm.complete(
            f"Escribe un caption conciso con CTA para objetivo {inp.objective} basado en: {core_text}"
        )
        hashtags = ["#SaaSLaunch", "#TaskAutomation", "#StudentLife"]

        visual: VisualConcept = self.image.propose(core_text)

        rationale_lines = [f"• {f.source}: {f.claim}" for f in facts]
        rationale = "Elegimos LinkedIn + carrusel para maximizar alcance B2B.\n" + "\n".join(rationale_lines)

        return BriefOutput(
            core_text=core_text,
            caption=caption,
            hashtags=hashtags,
            post_type="Launch",
            visual_concept=visual,
            facts=facts,
            reasoning=rationale,
            run_id=run_id,
        )
