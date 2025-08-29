import os
from app.adapters.llm_openai import OpenAIAdapter
from app.adapters.trends_pytrends import PyTrendsAdapter
from app.adapters.news_newsapi import NewsAPIAdapter
from app.adapters.image_dalle import FakeImage
from app.adapters.logger_structlog import StructLogger
from app.application.usescases.generate_brief import GenerateBrief


def build_generate_brief() -> GenerateBrief:
    llm = OpenAIAdapter(model=os.getenv("OPENAI_MODEL", "gpt-4o-mini"))
    trends = PyTrendsAdapter(geo=os.getenv("PYTRENDS_GEO", "US"), tz=0)
    news = NewsAPIAdapter(api_key=os.getenv("NEWSAPI_KEY"), language=os.getenv("NEWSAPI_LANG", "en"))
    image = FakeImage()
    logger = StructLogger()
    return GenerateBrief(llm, trends, news, image, logger)