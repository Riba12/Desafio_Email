from fastapi import APIRouter, HTTPException
from app.api import schemas
from app.services import classificador
from app.utils import cleanup

# Cria um "roteador" que pode ser incluído na aplicação principal
router = APIRouter()

@router.post("/processar/", response_model=schemas.EmailLoteResponse)
async def processar_email_endpoint(request: schemas.EmailLoteRequest):
    if not request.emails:
        raise HTTPException(status_code=400, detail="A lista de emails não pode estar vazia.")
    
    for email in request.emails:
        email.texto= cleanup.pre_processar_email(email.texto)
    
    resultado = await classificador.processar_lote_de_emails(request.emails)
        
    return schemas.EmailLoteResponse(resultados=resultado)