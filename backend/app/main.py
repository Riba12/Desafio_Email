from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import router as email_router

app = FastAPI(title="Analisador de Email com IA")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# rotas definidas em api/endpoints
app.include_router(email_router)

@app.get("/")
def read_root():
    return {"status": "API está no ar!"}