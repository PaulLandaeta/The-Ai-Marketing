import os
from app.adapters.trends_pytrends import PyTrendsAdapter
from app.adapters.news_newsapi import NewsAPIAdapter
from app.adapters.image_dalle import DalleAdapter
from app.adapters.logger_structlog import StructLogger
from app.application.usescases.generate_brief import GenerateBrief
from app.adapters.llm_openai import OpenAIAdapter
from app.adapters.post_agent import PostGenerationAdapter
from app.application.services.post_agent import PostAgent
from app.application.usescases.generate_post import GeneratePostFromSources


def build_generate_brief() -> GenerateBrief:
    llm = OpenAIAdapter(model=os.getenv("OPENAI_MODEL", "gpt-4o-mini"))
    trends = PyTrendsAdapter(geo=os.getenv("PYTRENDS_GEO", "US"), tz=0)
    news = NewsAPIAdapter(api_key=os.getenv("NEWSAPI_KEY"), language=os.getenv("NEWSAPI_LANG", "en"))
    image = DalleAdapter(model=os.getenv("OPENAI_IMAGE_MODEL", "gpt-image-1"))
    logger = StructLogger()
    return GenerateBrief(llm, trends, news, image, logger)



def build_generate_post_usecase() -> GeneratePostFromSources:
    llm = OpenAIAdapter(api_key=os.getenv("OPENAI_API_KEY"))
    generator = PostGenerationAdapter(llm=llm)
    agent = PostAgent(generator=generator)
    return GeneratePostFromSources(agent)