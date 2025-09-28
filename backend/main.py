from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client()

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
# response = client.models.generate_content(
#     model="gemini-2.5-flash", contents="Me explique em IA em poucas palavras"
# )
# print(response.text)

teste1= "Prezados, bom dia.Segue em anexo a versão final da proposta comercial para o Projeto Ômega. Peço a gentileza de revisarem todos os pontos, especialmente as cláusulas 3.1 e 5.2, e me darem um retorno com o 'de acordo' até as 16h de hoje, 28/09. O cliente aguarda o nosso envio amanhã pela manhã. Atenciosamente, Ana Silva"
teste2="Pessoal, O que acham de fazermos um happy hour nesta sexta-feira, dia 03/10, para relaxar um pouco depois do fechamento do trimestre? Pensei no Bar da Esquina, por volta das 18h30. Quem tiver interesse, por favor, responda aqui até quinta para eu ter uma noção de quantas pessoas vão. Abraços, Camila"
teste3="Olá! Sabemos que o dia a dia pode ser corrido. Por isso, separamos 5 estratégias práticas que você pode aplicar hoje mesmo para melhorar sua produtividade: Técnica Pomodoro; Matriz de Eisenhower; .. (etc.) Gostou das dicas? Nossa ferramenta, o 'TaskMaster Pro', ajuda a implementar tudo isso de forma automática. Quer saber como? Responda a este email para agendar uma demonstração de 15 minutos! Equipe TaskMaster Pro"
teste4="Oi, Marcos. Tudo bem? Vi este artigo hoje de manhã e lembrei da nossa conversa sobre as tendências para 2026. A parte sobre a automação de processos via IA é especialmente relevante. https://www.examplereport.com/future-of-our-market-ai Sem pressa para ler, apenas pensei que você gostaria de ver. Abraço, Fernando"
resposta = classificar_email(teste4)
print(resposta)