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
# Install deps
cd backend
pip install -r requirements.txt # or: uv pip install -e .

# Start server
uvicorn app.main:app --reload   
```

check in browser at:

```
http://localhost:8000/health
http://localhost:8000/docs
```
