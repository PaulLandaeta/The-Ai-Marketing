from fastapi import APIRouter
from app.domain.models import BriefInput, BriefOutput
from .di_container import build_generate_brief
from app.infrastructure.http.di_container import build_generate_post_usecase


router = APIRouter()


@router.post("/generate-brief", response_model=BriefOutput)
async def generate_brief(payload: BriefInput):
    uc = build_generate_brief()
    return await uc(payload)


@router.post("/posts:generate")
def generate_post(payload: dict):
    uc = build_generate_post_usecase()
    return uc.execute(payload)