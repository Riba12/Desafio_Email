from fastapi import APIRouter, HTTPException
from app.api import schemas
from app.services import classificador
from app.utils import cleanup

# Cria um "roteador" que pode ser incluído na aplicação principal
router = APIRouter()

@router.post("/processar/", response_model=schemas.EmailResposta)
def processar_email_endpoint(request: schemas.EmailEnviado):
    """
    Recebe um texto de email, o processa e retorna a classificação e sugestão.
    """
    if not request.texto:
        raise HTTPException(status_code=400, detail="O campo 'texto' não pode estar vazio.")
    
    texto_limpo = cleanup.pre_processar_email(request.texto)
    
    resultado = classificador.classificar_email(texto_limpo)

    if resultado["categoria"] == "Erro":
        raise HTTPException(status_code=500, detail=resultado["sugestao_resposta"])
        
    return schemas.EmailResposta(**resultado)