from __future__ import annotations
from typing import List
from datetime import datetime, timedelta, timezone
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type
from newsapi import NewsApiClient
from app.domain.models import FactCard
from app.application.ports.news import NewsPort
from .cache import cache
import os


class NewsAPIAdapter(NewsPort):
    def __init__(self, api_key: str | None = None, language: str = 'en'):
        self.client = NewsApiClient(api_key=api_key or os.getenv('NEWSAPI_KEY'))
        self.language = language


    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=0.5, min=1, max=6),
        retry=retry_if_exception_type(Exception)
    )
    async def headlines(self, query: str, days: int = 7) -> List[FactCard]:

        key = f"news:{self.language}:{days}:{query}"
        cached = cache.get(key)
        if cached is not None:
            return cached

        # Compute date window in UTC
        to_dt = datetime.now(timezone.utc)
        from_dt = to_dt - timedelta(days=max(1, days))
        
        def newsapi_dt(dt: datetime) -> str:
            dt_naive = dt.astimezone(timezone.utc).replace(tzinfo=None, microsecond=0)
            return dt_naive.strftime("%Y-%m-%dT%H:%M:%S")
        
        res = self.client.get_everything(
            q=query,
            from_param=newsapi_dt(from_dt),
            to=newsapi_dt(to_dt),
            language=self.language,
            sort_by='relevancy',
            page_size=5,
        )
        facts: List[FactCard] = []
        for art in (res.get('articles') or [])[:3]:
            title = art.get('title') or 'Headline'
            url = art.get('url')
            source = (art.get('source') or {}).get('name') or 'NewsAPI'
            facts.append(FactCard(source=f"{source} via NewsAPI", claim=title, url=url))
        print(f"Fetched {len(facts)} articles from NewsAPI")
        cache.set(key, facts)
        return facts