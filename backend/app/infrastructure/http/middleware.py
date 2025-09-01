import time, uuid
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from app.adapters.logger_structlog import logger


class RequestContextMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        req_id = request.headers.get("X-Request-ID", uuid.uuid4().hex)
        start = time.time()
        # push to context
        import structlog
        structlog.contextvars.bind_contextvars(request_id=req_id, path=request.url.path)
        try:
            response = await call_next(request)
            return response
        finally:
            dur_ms = int((time.time() - start) * 1000)
            logger.info("http.request", method=request.method, status=getattr(response, 'status_code', 0), duration_ms=dur_ms)
            structlog.contextvars.clear_contextvars()