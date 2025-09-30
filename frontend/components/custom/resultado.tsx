'use client';
import { Check, Copy, Loader, ReceiptText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner";

// Define a estrutura do resultado que esperamos
interface ResultData {
  categoria: string;
  resposta: string;
}

// Define as propriedades que o componente espera receber do pai
export interface ResultadoProps {
  isLoading: boolean;
  result: ResultData | null;
}

export function Resultado({ isLoading, result }: ResultadoProps) {

  const [copiou, setCopiou] = useState(false);

    const copiar = async (text: string) => {
    if (!navigator.clipboard) {
      toast.error("Seu navegador não suporta a função de copiar.");
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      
      setCopiou(true);
      toast.success("Sugestão de resposta copiada!");
      setTimeout(() => {
        setCopiou(false);
      }, 2000);

    } catch (err) {
      console.error("Falha ao copiar: ", err);
      toast.error("Não foi possível copiar o texto.");
    }
  };

  const alinhamento =
    !isLoading && !result
      ? "justify-center items-center"
      : "justify-start items-start";

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          <h4 className="font-semibold mb-2">Categoria:</h4>
          <Skeleton className="h-6 w-1/4" />
          <h4 className="font-semibold mb-2">Sugestão de Resposta:</h4>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      );
    }

    if (result) {
      return (
        <div className="space-y-10">
          <div>
            <h4 className="font-semibold mb-2">Categoria:</h4>
            <Badge
              variant={
                result.categoria.toLowerCase() === "produtivo"
                  ? "sucesso"
                  : "destructive"
              }
            >
              {result.categoria}
            </Badge>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold mb-2">Sugestão de Resposta:</h4>
            <Button variant={'ghost'} onClick={() => copiar(result.resposta)} disabled={copiou}>
              {copiou ? (
                  <>
                    <Check className="mr-2 h-4 w-4 text-emerald-500" />
                    <span className="text-emerald-500">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    <span>Copiar</span>
                  </>
                )}
            </Button>
            </div>
            <p className="text-sm text-muted-foreground p-3 bg-slate-50 rounded-md whitespace-pre-wrap dark:font-bold dark:text-black">
              {result.resposta}
            </p>
          </div>
        </div>
      );
    }

    // Estado inicial ou vazio

    return (
      <div className="flex flex-col justify-center items-center space-y-4">
        <Loader />
        <p className="text-lg text-muted-foreground text-center">
          O resultado da sua análise aparecerá aqui.
        </p>
      </div>
    );
  };

  return (
    <Card className="w-full max-w-2xl min-h-[568px] shadow-2xl">
      <CardHeader className="flex flex-row items-center  gap-2">
        <ReceiptText />
        <CardTitle>Resultado da Classificação</CardTitle>
      </CardHeader>
      <CardContent className={`flex flex-col grow p-6 ${alinhamento}`}>
        {renderContent()}
      </CardContent>
    </Card>
  );
}
