import { ReceiptText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";

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
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Categoria:</h4>
            <Badge variant={result.categoria.toLowerCase() === 'produtivo' ? 'default' : 'destructive'}>
              {result.categoria}
            </Badge>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Sugestão de Resposta:</h4>
            <p className="text-sm text-muted-foreground p-3 bg-slate-50 rounded-md whitespace-pre-wrap">
              {result.resposta}
            </p>
          </div>
        </div>
      );
    }
    
    // Estado inicial ou vazio
    return <p className="text-sm text-muted-foreground">O resultado da sua análise aparecerá aqui.</p>;
  };

  return (
    <Card className="w-full max-w-2xl min-h-[460px]">
      <CardHeader className="flex flex-row items-center gap-2">
        <ReceiptText />
        <CardTitle>Resultado da Classificação</CardTitle>
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  );
}