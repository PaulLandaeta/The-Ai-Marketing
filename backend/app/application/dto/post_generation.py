from typing import List, Optional, Literal
from pydantic import BaseModel, Field, conint

TemplateT = Literal["casual","professional","storytelling","technical","contrarian","case-study","announcement"]
ToneT     = Literal["enthusiastic","professional","friendly","humble","confident","technical","celebratory"]
ImageStyleT = Literal["minimal-ui","isometric","data-viz","abstract","diagram"]
LinkPolicyT = Literal["no_links","allow_one","allow_many"]
CTAStyleT   = Literal["strong","neutral","subtle"]

class BrandRules(BaseModel):
    banned_phrases: List[str] = []
    cta_style: CTAStyleT = "neutral"
    link_policy: LinkPolicyT = "no_links"

class GeneratePostIn(BaseModel):
    prompt: str = Field(..., min_length=8, max_length=1200)
    template: TemplateT = "casual"
    variations: conint(ge=1, le=8) = 1
    word_count: conint(ge=50, le=1200) = 200
    tone: ToneT = "professional"
    audience: str = "general"
    generate_hashtags: bool = True
    include_emojis: bool = False
    language: str = "en"
    seed_hashtags: List[str] = []
    topic: Optional[str] = None

    n_images: conint(ge=0, le=10) = 0
    image_style: ImageStyleT = "minimal-ui"
    image_palette: str = "blue/green"
    image_size: str = "1024x1024"

    brand_rules: BrandRules = BrandRules()
