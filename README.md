# AutoUEmail - Classificador de Emails com IA

Este projeto é uma aplicação full-stack que utiliza Inteligência Artificial para classificar o conteúdo de emails como "Produtivo" ou "Improdutivo" e sugerir uma resposta apropriada para cada caso.

A interface permite que o usuário cole o texto de um ou mais emails, ou faça o upload de um arquivo (`.txt` ou `.pdf`) contendo os emails para análise em lote.

## 🚀 Links do Projeto

* **Frontend (Aplicação Web):** `https://autoumail-cl0k.onrender.com`
* **Backend (API):** `https://autouback.onrender.com`

---

## ✨ Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

**Frontend:**
* **Next.js:** Framework React para construção de interfaces web.
* **React:** Biblioteca para criação de UIs.
* **TypeScript:** Superset do JavaScript com tipagem estática.
* **Tailwind CSS:** Framework de estilização CSS utility-first.
* **shadcn/ui:** Coleção de componentes de UI reutilizáveis.
* **pdf.js:** Biblioteca para leitura e extração de texto de arquivos PDF no cliente.
* **react-dropzone:** Hook para funcionalidade de upload de arquivos com drag-and-drop.
* **sonner:** Biblioteca para notificações (toasts).

**Backend:**
* **Python 3:** Linguagem de programação.
* **FastAPI:** Framework web de alta performance para criação de APIs.
* **Uvicorn:** Servidor ASGI para rodar a aplicação FastAPI.
* **Asyncio:** Para processamento concorrente das requisições à IA.
* **Pydantic:** Para validação de dados e gerenciamento de configurações.

**Inteligência Artificial & Serviços:**
* **Google Gemini API:** Para as tarefas de classificação de texto e geração de resposta.
* **Render:** Plataforma de nuvem para hospedagem dos serviços de frontend e backend.
* **GitHub:** Para versionamento de código.

---

## 📂 Estrutura do Projeto

O projeto está organizado em um monorepo com duas pastas principais:

* `/backend`: Contém a API em Python/FastAPI.
* `/frontend`: Contém a aplicação web em Next.js/React.

---

## 🛠️ Como Executar Localmente

Siga os passos abaixo para rodar a aplicação completa na sua máquina.

### Pré-requisitos
* **Node.js** (versão 18 ou superior)
* **Python** (versão 3.9 ou superior)
* Uma chave de API do **Google AI Studio**.

### Passo 1: Clonar o Repositório
```bash
git clone [https://github.com/Riba12/Desafio_Email.git](https://github.com/Riba12/Desafio_Email.git)
cd Desafio_Email
```

### Passo 2: Configurar e Rodar o Backend

1.  **Navegue até a pasta do backend:**
    ```bash
    cd backend
    ```
2.  **Crie e ative um ambiente virtual:**
    ```bash
    # Criar o ambiente
    python -m venv venv
    
    # Ativar no Windows
    .\venv\Scripts\activate
    
    # Ativar no macOS/Linux
    source venv/bin/activate
    ```
3.  **Instale as dependências:**
    ```bash
    pip install -r requirements.txt
    ```
4.  **Configure as variáveis de ambiente:**
    * Renomeie o arquivo `.env.example` para `.env`.
    * Abra o arquivo `.env` e insira sua chave da API do Google:
        ```
        GEMINI_API_KEY=="SUA_CHAVE_API_DO_GOOGLE_AI_AQUI"
        ```
5.  **Inicie o servidor do backend:**
    ```bash
    uvicorn app.main:app --reload
    ```
    O backend estará rodando em `http://127.0.0.1:8000`. Deixe este terminal aberto.

### Passo 3: Configurar e Rodar o Frontend

1.  **Abra um NOVO terminal.**
2.  **Navegue até a pasta do frontend:**
    ```bash
    cd frontend
    ```
3.  **Instale as dependências:**
    ```bash
    npm install
    ```
4.  **Configure as variáveis de ambiente:**
    * Renomeie o arquivo `.env.local.example` para `.env.local`.
    * O conteúdo já deve estar configurado para o ambiente local:
        ```
        NEXT_PUBLIC_API_URL=[http://127.0.0.1:8000/processar/]
        ```
5.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

### Passo 4: Acessar a Aplicação
Abra seu navegador e acesse **`http://localhost:3000`**. A aplicação completa estará funcionando.