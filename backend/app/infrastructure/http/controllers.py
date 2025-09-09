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
        prompt_len=len(payload.get("prompt") or ""),
        variations=payload.get("variations"),
        word_count=payload.get("word_count"),
        audience=payload.get("audience"),
        tone=payload.get("tone"),
        generate_hashtags=payload.get("generate_hashtags"),
        include_emojis=payload.get("include_emojis"),
        language=payload.get("language"),
        seed_hashtags=payload.get("seed_hashtags"),
        n_images=payload.get("n_images"),
        image_style=payload.get("image_style"),
        image_palette=payload.get("image_palette"),
        image_size=payload.get("image_size"),
        brand_rules=payload.get("brand_rules"),
    )
    uc = build_generate_post_usecase()
    try:
        out = uc.execute(payload)
        return out
    finally:
        dur_ms = int((time.perf_counter() - start) * 1000)
        logger.info("post.generate.response", duration_ms=dur_ms)
