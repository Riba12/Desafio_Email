from google import genai
from app.core.config import settings

client = genai.Client(api_key=settings.GEMINI_API_KEY)

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
            "categoria":classificacao.text,
            "resposta":resposta.text
        }
    except Exception as e:
        print(f"Ocorreu um erro ao chamar a API do Gemini: {e}")
        return {
            "categoria": "Erro",
            "resposta": "Não foi possível processar o email."
        }