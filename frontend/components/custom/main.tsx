"use client";

import { useState } from "react";
import { toast } from "sonner";
import CardUpload from "./cardUpload";
import { Resultado, ResultData } from "./resultado";
import { getTextFromFile } from "@/lib/file-reader";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function Main() {
  const [file, setFile] = useState<File | null>(null);
  const [textContent, setTextContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiResult, setApiResult] = useState<ResultData[] | null>(null);

  const handleAnalisar = async () => {
    if (!API_URL) {
      toast.error("Erro de configuração: A URL da API não foi definida.");
      console.error(
        "A variável de ambiente NEXT_PUBLIC_API_URL não está definida."
      );
      return;
    }

    setIsLoading(true);
    setApiResult(null);
    let emailsParaEnviar: { id: string; texto: string }[] = [];
    let emailContent = "";

    try {
      if (file) {
        // Limpa a área de texto se um arquivo for usado
        setTextContent("");
        emailContent = await getTextFromFile(file);
        const emailsDoArquivo = emailContent
          .split("==================================================")
          .map((email) => email.trim()) // Limpa espaços em branco
          .filter((email) => email); // Remove entradas vazias

        if (emailsDoArquivo.length === 0)
          throw new Error("Arquivo vazio ou em formato inválido.");

        emailsParaEnviar = emailsDoArquivo.map((emailText, index) => ({
          id: `${file.name}-${index + 1}`, // Cria um ID único para cada email
          texto: emailText,
        }));
      } else if (textContent.trim()) {
        emailsParaEnviar = [{ id: "texto-direto-1", texto: textContent }];
      } else {
        toast.error("Por favor, insira um texto ou envie um arquivo.");
        setIsLoading(false);
        return;
      }

      const payload = { emails: emailsParaEnviar };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Erro na resposta da API.");
      }

      const apiResponse = await response.json();

      setApiResult(apiResponse.resultados);
      toast.success("Email analisado com sucesso!");
    } catch (error) {
      console.error("Falha ao analisar:", error);
      let errorMessage = "Não foi possível analisar o email. Tente novamente.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col h-full py-8 lg:min-w-[1200px] max-w-[1920px]">
      <div className="text-center py-5 space-y-2">
        <h1 className="text-4xl lg:text-5xl font-bold">
          <span className="text-cyan-700">AutoUEmail </span>Dashboard
        </h1>
        <h2 className="text-lg lg:text-xl text-muted-foreground">
          Use IA para classificar seus emails e gerar respostas
        </h2>
      </div>
      <div className="flex flex-col lg:flex-row justify-around items-center gap-8 grow p-4 place-items-center">
        <div className="w-full lg:w-1/2 flex justify-center ">
          <CardUpload
            file={file}
            setFile={setFile}
            textContent={textContent}
            setTextContent={setTextContent}
            onAnalisar={handleAnalisar}
            isLoading={isLoading}
          />
        </div>
        <div className="w-full lg:w-1/2 flex justify-center">
          <Resultado isLoading={isLoading} results={apiResult} />
        </div>
      </div>
    </section>
  );
}
