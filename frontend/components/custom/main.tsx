"use client";

import { useState } from "react";
import { toast } from 'sonner';
import CardUpload from "./cardUpload";
import { Resultado, ResultadoProps } from "./resultado";
import { getTextFromFile } from "@/lib/file-reader";

// Define a URL da sua API. Lembre-se de colocar o prefixo que definimos.
const API_URL = 'http://127.0.0.1:8000/processar/';

export function Main() {
  // O estado e a lógica vivem aqui, no componente pai.
  const [file, setFile] = useState<File | null>(null);
  const [textContent, setTextContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiResult, setApiResult] = useState<ResultadoProps['result'] | null>(null);

  const handleAnalisar = async () => {
    setIsLoading(true);
    setApiResult(null);
    let emailContent = '';

    try {
      if (file) {
        // Limpa a área de texto se um arquivo for usado
        setTextContent(''); 
        emailContent = await getTextFromFile(file);
      } else if (textContent.trim()) {
        emailContent = textContent;
      } else {
        toast.error("Por favor, insira um texto ou envie um arquivo.");
        setIsLoading(false);
        return;
      }

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto: emailContent })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Erro na resposta da API.");
      }

      const result = await response.json();
      setApiResult(result);
      toast.success("Email analisado com sucesso!");

    } catch (error: any) {
      console.error("Falha ao analisar:", error);
      toast.error(error.message || "Não foi possível analisar o email. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col h-full container py-8">
      <div className="text-center py-5 space-y-2">
        <h1 className="text-4xl lg:text-5xl font-bold">Analisador de Email</h1>
        <h2 className="text-lg lg:text-xl text-muted-foreground">
          Use IA para classificar seus emails e gerar respostas
        </h2>
      </div>
      <div className="flex flex-col lg:flex-row justify-around items-start gap-8 grow p-4">
        <div className="w-full lg:w-1/2 flex justify-center">
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
            <Resultado isLoading={isLoading} result={apiResult} />
        </div>
      </div>
    </section>
  );
}