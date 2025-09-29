from pydantic import BaseModel

class EmailEnviado(BaseModel):
    texto: str

class EmailResposta(BaseModel):
    categoria: str
    resposta: str