from __future__ import annotations
from typing import List
from datetime import datetime, timedelta
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type
from pytrends.request import TrendReq
from app.domain.models import FactCard
from app.application.ports.trends import TrendsPort
from .cache import cache
import os


class PyTrendsAdapter(TrendsPort):
    def __init__(self, geo: str | None = None, tz: int = 0):
        # tz in minutes offset; 0 ~ UTC. For America/La_Paz use -240.
        self.tr = TrendReq(hl='en-US', tz=tz)
        self.geo = geo or os.getenv('PYTRENDS_GEO', 'US')


    @retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=0.5, min=1, max=6),
        retry=retry_if_exception_type(Exception))
    async def top_queries(self, query: str) -> List[FactCard]:

        key = f"trends:{self.geo}:{query}"
        cached = cache.get(key)
        if cached is not None:
            return cached

        # Build payload around key terms (split); fall back to whole query if too long
        kw_list = [w for w in query.split() if len(w) > 2][:3] or [query[:30]]
        self.tr.build_payload(kw_list=kw_list, geo=self.geo, timeframe='now 7-d')


        # Interest over time (7d delta %)
        iot = self.tr.interest_over_time()
        facts: List[FactCard] = []
        if iot is not None and not iot.empty:
            last = iot.tail(1).mean().mean()
            first = iot.head(1).mean().mean()
            if first and last is not None:
                delta = ((last - first) / max(first, 1)) * 100
                facts.append(FactCard(
                    source=f"Google Trends ({self.geo})",
                    claim=f"Interest change ~{delta:.1f}% last 7d"
                ))


        # Related queries (top)
        related = self.tr.related_queries()
        if related:
            # Take first kw and its 'top' queries
            first_kw = list(related.keys())[0]
            top_df = related[first_kw].get('top') if related.get(first_kw) else None
            if top_df is not None and not top_df.empty:
                top_terms = ", ".join(top_df['query'].head(3).tolist())
                facts.append(FactCard(
                source=f"Google Trends ({self.geo})",
                claim=f"Top related: {top_terms}"
                ))
        print(f"Fetched {len(facts)} facts from PyTrends for query '{query}'")
        cache.set(key, facts)
        return facts