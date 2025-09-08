from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
try:
    from dotenv import load_dotenv, find_dotenv
    load_dotenv(find_dotenv(), override=False)
except Exception:
    pass
from app.infrastructure.http.controllers import router
from app.infrastructure.http.middleware import RequestContextMiddleware
from fastapi.staticfiles import StaticFiles
from app.infrastructure.http.errors import unhandled_exception_handler
from app.adapters.logger_structlog import logger



app = FastAPI(title="AI Marketing Agent API")
static_dir = os.getenv("STATIC_DIR", "app/static")
os.makedirs(static_dir, exist_ok=True)

app.add_middleware(RequestContextMiddleware)
app.add_exception_handler(Exception, unhandled_exception_handler)
app.mount("/static", StaticFiles(directory=static_dir), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health():
    logger.info("health.check")
    return {"ok": True}


app.include_router(router)
