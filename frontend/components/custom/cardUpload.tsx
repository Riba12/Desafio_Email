"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Dropzone } from "@/components/ui/dropzone";
import { FileText, Loader2, MailPlus } from "lucide-react";

interface CardUploadProps {
    file: File | null;
    setFile: (file: File | null) => void;
    textContent: string;
    setTextContent: (text: string) => void;
    onAnalisar: () => void;
    isLoading: boolean;
}

export default function CardUpload({ file, setFile, textContent, setTextContent, onAnalisar, isLoading }: CardUploadProps) {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Entrada do Email</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex space-x-3">
          <MailPlus/>
          <label htmlFor="email-text" className="font-medium">Cole o texto do email</label>
          </div>
          <Textarea 
            id="email-text"
            placeholder="Cole o conteúdo completo do seu email aqui..."
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            disabled={!!file || isLoading}
            rows={8}
          />
        </div>
        <div className="text-center text-sm text-gray-500">OU</div>
        <div className="space-y-2">
          <div className="flex space-x-3">
          <FileText/>
          <label className="font-medium">Faça upload de um arquivo</label>
          </div>
          <Dropzone onFileAccepted={setFile} />
        </div>
        <Button onClick={onAnalisar} disabled={isLoading} className="w-full text-lg py-6">
          {isLoading ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analisando...</>
          ) : (
            'Analisar Email'
          )}
        </Button>
      </CardContent>
    </Card>
  );
}