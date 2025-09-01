from __future__ import annotations
from pydantic import BaseModel
from typing import List, Literal, Optional


PostType = Literal["Launch", "Sale", "Educational", "Announcement"]


class VisualFrame(BaseModel):
    title: str
    shot: str


class VisualConcept(BaseModel):
    format: Literal["Image", "Carousel", "Video"] = "Carousel"
    frames: List[VisualFrame] = []
    palette: List[str] = ["#0B5FFF", "#0FD28F"]
    typography: str = "Inter"
    why: str = ""
    image_url: Optional[str] = None


class FactCard(BaseModel):
    source: str
    claim: str
    url: Optional[str] = None


class BriefInput(BaseModel):
    prompt: str
    platform: Literal["LinkedIn", "Instagram", "Facebook", "TikTok"]
    objective: Literal["Awareness", "Engagement", "Conversion", "LeadGen"]
    brand_cues: Optional[str] = None


class BriefOutput(BaseModel):
    core_text: str
    caption: str
    hashtags: List[str]
    post_type: PostType
    visual_concept: VisualConcept
    facts: List[FactCard]
    reasoning: str
    run_id: str
