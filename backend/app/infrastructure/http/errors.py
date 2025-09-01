from fastapi import Request
from fastapi.responses import JSONResponse
from app.adapters.logger_structlog import logger


async def unhandled_exception_handler(request: Request, exc: Exception):
    logger.error("error.unhandled", err=str(exc))
    return JSONResponse(status_code=500, content={"error": "Internal Server Error"})