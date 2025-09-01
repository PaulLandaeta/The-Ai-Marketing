import time
from typing import Any, Callable, Dict, Tuple


class TTLCache:
    def __init__(self, ttl_seconds: int = 300, maxsize: int = 128):
        self.ttl = ttl_seconds
        self.maxsize = maxsize
        self._store: Dict[str, Tuple[float, Any]] = {}


    def get(self, key: str):
        now = time.time()
        item = self._store.get(key)
        if not item: return None
        ts, val = item
        if now - ts > self.ttl:
            self._store.pop(key, None)
            return None
        return val


    def set(self, key: str, val: Any):
        if len(self._store) >= self.maxsize:
            self._store.pop(next(iter(self._store)))
            self._store[key] = (time.time(), val)


cache = TTLCache(ttl_seconds=300)