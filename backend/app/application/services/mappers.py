from typing import Dict, Optional, Sequence, Any

TEMPLATE_GUIDES: Dict[str, str] = {
    "casual":       "Conversational, friendly, short paragraphs.",
    "professional": "Concise, credible, value-first, no fluff.",
    "storytelling": "Narrative arc: hook → conflict → insight → outcome.",
    "technical":    "Concrete details, numbers, bulleted insights, no hype.",
    "contrarian":   "Challenge a common belief, present evidence, respectful.",
    "case-study":   "Context → Action → Result, include metrics if possible.",
    "announcement": "Clear headline and gratitude; keep it humble and factual.",
}

# --- tiny helpers ----------------------------------------------------------

def _get_rule(rules: Any, key: str, default):
    """Works with None, objects, and dict-like."""
    if rules is None:
        return default
    if isinstance(rules, dict):
        return rules.get(key, default)
    return getattr(rules, key, default)

def _norm_list(value: Optional[Sequence[str]]) -> list[str]:
    if not value:
        return []
    return [str(v).strip() for v in value if str(v).strip()]

# --- main ------------------------------------------------------------------

def build_system_prompt(
    template: str,
    tone: str,
    audience: str,
    language: str,
    include_emojis: bool,
    brand_rules: Any,   # tolerate None/dict/object
) -> str:
    guide = TEMPLATE_GUIDES.get(template, TEMPLATE_GUIDES["professional"])
    emoji_rule = (
        "Avoid emojis."
        if not include_emojis
        else "Include 2–4 relevant emojis, placed only where they add clarity; never overuse."
    )

    cta_style = _get_rule(brand_rules, "cta_style", "Clear, action-oriented CTA at the end")
    link_policy = _get_rule(brand_rules, "link_policy", "Include links only when truly useful; never clickbait.")
    banned_phrases = _norm_list(_get_rule(brand_rules, "banned_phrases", []))

    cta_rule = f"CTA style: {cta_style}."
    link_rule = f"Links policy: {link_policy}."
    banned = ", ".join(banned_phrases) if banned_phrases else "none"

    return (
        "You are an elite LinkedIn content strategist.\n"
        f"Style guide: {guide}\n"
        f"Tone: {tone}. Audience: {audience}. Language: {language}.\n"
        f"{emoji_rule} {cta_rule} {link_rule}\n"
        f"Banned phrases: {banned} (do not use)."
    )

def image_prompt_from_controls(topic: str, style: str, palette: str) -> str:
    return f"{style} LinkedIn carousel visual, {palette} palette, clean typography — {topic}"
