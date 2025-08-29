from app.domain.models import VisualConcept, VisualFrame
from app.application.ports.image import ImageGenPort


class FakeImage(ImageGenPort):
    async def propose(self, message: str) -> VisualConcept:
        return VisualConcept(
            format="Carousel",
            frames=[
            VisualFrame(title="El problema", shot="top-down desk messy"),
            VisualFrame(title="La solución", shot="clean UI hero"),
            ],
            why="Azul/verde transmite confianza y calma; carrusel performa mejor en LinkedIn B2B",
        )