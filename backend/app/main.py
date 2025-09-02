from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.infrastructure.http.controllers import router
from app.infrastructure.http.middleware import RequestContextMiddleware
from fastapi.staticfiles import StaticFiles
from app.infrastructure.http.errors import unhandled_exception_handler
import os



app = FastAPI(title="AI Marketing Agent API")
os.makedirs("/tmp", exist_ok=True)

app.add_middleware(RequestContextMiddleware)
app.add_exception_handler(Exception, unhandled_exception_handler)
app.mount("/static", StaticFiles(directory="/tmp"), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health():
    return {"ok": True}


app.include_router(router)