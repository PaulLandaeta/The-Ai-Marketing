import time
from fastapi import APIRouter
from app.domain.models import BriefInput, BriefOutput
from .di_container import build_generate_brief
from app.infrastructure.http.di_container import build_generate_post_usecase
from app.adapters.logger_structlog import logger


router = APIRouter()


@router.post("/generate-brief", response_model=BriefOutput)
async def generate_brief(payload: BriefInput):
    start = time.perf_counter()
    logger.info("brief.request", platform=payload.platform)
    uc = build_generate_brief()
    try:
        out = await uc(payload)
        return out
    finally:
        dur_ms = int((time.perf_counter() - start) * 1000)
        logger.info("brief.response", duration_ms=dur_ms)


@router.post("/posts:generate")
def generate_post(payload: dict):
    start = time.perf_counter()
    logger.info(
        "post.generate.request",
        keys=list(payload.keys()),
        variations=payload.get("variations"),
        topic=payload.get("topic"),
    )
    uc = build_generate_post_usecase()
    try:
        out = uc.execute(payload)
        return out
    finally:
        dur_ms = int((time.perf_counter() - start) * 1000)
        logger.info("post.generate.response", duration_ms=dur_ms)
