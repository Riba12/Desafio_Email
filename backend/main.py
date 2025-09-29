from dotenv import load_dotenv
from google import genai
import re

load_dotenv()

client = genai.Client()

def pre_processar_email(texto: str) -> str:
    """
    Limpa o texto de um email para ser enviado a um LLM.
    Foca em remover ruídos (HTML, URLs).
    """

    texto_limpo = re.sub(r'<[^>]+>', '', texto)
    
    texto_limpo = re.sub(r'http\S+|www\S+', '', texto_limpo)

    texto_limpo = re.sub(r'\s+', ' ', texto_limpo).strip()

    return texto_limpo


def classificar_email(email:str) -> dict:
    prompt_email = f"""
    Analise o conteúdo do email abaixo e classifique-o estritamente como "Produtivo" ou "Improdutivo".
    - "Produtivo": Emails que requerem uma ação ou resposta específica (ex.: solicitações de suporte técnico, atualização sobre casos em aberto, dúvidas sobre o sistema).
    - "Improdutivo": Emails que não necessitam de uma ação imediata (ex.: mensagens de felicitações, agradecimentos, newsletter, marketing, venda de produtos).

    Responda apenas com a palavra "Produtivo" ou "Improdutivo", sem nenhuma outra explicação.

    Email:
    ---
    {email}
    ---
    """
    try:
        classificacao = client.models.generate_content(
            model="gemini-2.5-flash", contents={prompt_email}
        )

        prompt_resposta = f"""
        O email abaixo foi classificado como "{classificacao.text}".
        Com base nisso, escreva uma sugestão de resposta curta, profissional e em português.

        - Se for "Produtivo", a resposta deve ser para acusar o recebimento e indicar que será tratado.
        - Se for "Improdutivo", a resposta pode ser para agradecer e informar que será arquivado.

        Email:
        ---
        {email}
        ---
        Sugestão de resposta:
        """
        resposta = client.models.generate_content(
            model="gemini-2.5-flash", contents={prompt_resposta}
        )

        return{
            "Categoria":{classificacao.text},
            "Sugestão":{resposta.text}
        }
    except Exception as e:
        print(f"Ocorreu um erro ao chamar a API do Gemini: {e}")
        return {
            "Categoria": "Erro",
            "Sugestão": "Não foi possível processar o email."
        }