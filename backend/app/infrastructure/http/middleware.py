import time
import uuid
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from app.adapters.logger_structlog import logger
import structlog

class RequestContextMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        req_id = request.headers.get("X-Request-ID", uuid.uuid4().hex)
        structlog.contextvars.bind_contextvars(request_id=req_id, path=request.url.path)

        start = time.perf_counter()
        status = 500  # default if call_next fails
        response = None

        try:
            response = await call_next(request)
            status = getattr(response, "status_code", 200)
            return response
        except Exception:
            dur_ms = int((time.perf_counter() - start) * 1000)
            logger.exception(
                "http.error",
                method=request.method,
                path=request.url.path,
                status=status,
                duration_ms=dur_ms,
                request_id=req_id,
            )
            raise
        finally:
            dur_ms = int((time.perf_counter() - start) * 1000)
            logger.info(
                "http.request",
                method=request.method,
                path=request.url.path,
                status=status,
                duration_ms=dur_ms,
                request_id=req_id,
                # avoid reading response if it doesn't exist
                content_length=(response.headers.get("content-length") if response else None),
            )
            structlog.contextvars.clear_contextvars()
