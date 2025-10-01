from pydantic import BaseModel

class EmailResposta(BaseModel):
    categoria: str
    resposta: str

class EmailLoteItem(BaseModel):
    id: str | int  # Um ID único que o frontend envia para identificar cada email
    texto: str

# estrutura da requisição em lote (uma lista de emails)
class EmailLoteRequest(BaseModel):
    emails: list[EmailLoteItem]

class EmailLoteResposta(EmailResposta):
    id: str | int  # A API devolve o mesmo ID para o frontend fazer a correspondência

class EmailLoteResponse(BaseModel):
    resultados: list[EmailLoteResposta]