from typing import Tuple
from app.config.pricing import PRICING, IMAGE_PRICING

def cost_from_usage_usd(model: str, prompt_tokens: int, completion_tokens: int) -> float:
    price = PRICING.get(model)
    if not price:
        return 0.0
    return (prompt_tokens / 1000.0) * price.input_per_1k + (completion_tokens / 1000.0) * price.output_per_1k

def image_cost_usd(size: str, n_images: int) -> float:
    return IMAGE_PRICING.get(size, 0.0) * max(0, n_images)
