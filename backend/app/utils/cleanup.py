import re

def pre_processar_email(texto: str) -> str:
    """
    Limpa o texto de um email para ser enviado a um LLM.
    Foca em remover ruídos (HTML, URLs).
    """

    texto_limpo = re.sub(r'<[^>]+>', '', texto)
    
    texto_limpo = re.sub(r'http\S+|www\S+', '', texto_limpo)

    texto_limpo = re.sub(r'\s+', ' ', texto_limpo).strip()

    return texto_limpo