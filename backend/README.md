## Requirements 
- Python 3.10+
- uvicorn
- fastapi
- pydantic
- httpx
- structlog
- sqlalchemy
- alembic
- psycopg2-binary

## How to run 

```bash
# Install deps (editable)
cd backend
pip install -e .[dev]

# Start server
uvicorn app.main:app --reload   
```

## Run tests

```bash
cd backend
pytest -q
```

Run a specific suite (use cases or adapters):

```bash
pytest -q tests/test_generate_post_usecase.py
pytest -q tests/test_post_generation_adapter.py
pytest -q tests/test_post_review_adapter.py
```

### Environment
- Coloca tus variables en `backend/.env` (o en cualquier `.env` en la ruta superior). Al iniciar, la app las carga automáticamente con `python-dotenv`.
- Alternativa: `uvicorn app.main:app --reload --env-file .env`.

check in browser at:

```
http://localhost:8000/health
http://localhost:8000/docs
```
