from dataclasses import dataclass

@dataclass(frozen=True)
class LLMPrice:
    input_per_1k: float
    output_per_1k: float

PRICING = {
    "gpt-4o-mini": LLMPrice(input_per_1k=0.15, output_per_1k=0.60),
    "gpt-4o":      LLMPrice(input_per_1k=2.50, output_per_1k=10.00),
}

IMAGE_PRICING = {
    "256x256":   0.004,
    "512x512":   0.010,
    "1024x1024": 0.040,
}
