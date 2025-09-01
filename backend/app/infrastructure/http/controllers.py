from fastapi import APIRouter
from app.domain.models import BriefInput, BriefOutput
from .di_container import build_generate_brief


router = APIRouter()


@router.post("/generate-brief", response_model=BriefOutput)
async def generate_brief(payload: BriefInput):
    uc = build_generate_brief()
    return await uc(payload)