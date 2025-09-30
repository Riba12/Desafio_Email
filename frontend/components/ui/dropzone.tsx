"use client";

import { useCallback, useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { UploadCloud, File as FileIcon, X } from 'lucide-react';

interface DropzoneProps {
  onFileAccepted: (file: File | null) => void;
  className?: string;
}

export function Dropzone({ onFileAccepted, className }: DropzoneProps) {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (fileRejections.length > 0) {
      alert('Tipo de arquivo não suportado. Por favor, envie .txt ou .pdf');
      return;
    }
    const acceptedFile = acceptedFiles[0] || null;
    setFile(acceptedFile);
    onFileAccepted(acceptedFile);
  }, [onFileAccepted]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/plain': ['.txt'], 'application/pdf': ['.pdf'] },
    maxFiles: 1,
  });

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation(); // Impede que o clique acione a seleção de arquivo
    setFile(null);
    onFileAccepted(null);
  };

  return (
    <div>
      {!file ? (
        <div {...getRootProps()} className={`border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors ${isDragActive ? 'bg-blue-50 border-blue-600' : 'bg-gray-50 dark:bg-gray-900'} ${className}`}>
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-4">
            <UploadCloud className="h-12 w-12 text-gray-400" />
            {isDragActive ? <p className="font-semibold text-blue-600">Solte o arquivo aqui...</p> : <p className="text-gray-500">Arraste e solte o arquivo aqui, ou <span className="font-semibold text-blue-500">clique para selecionar</span></p>}
            <p className="text-xs text-gray-400">Suporta .txt e .pdf</p>
          </div>
        </div>
      ) : (
        <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileIcon className="h-8 w-8 text-gray-500" />
            <div>
              <p className="font-medium text-sm">{file.name}</p>
              <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
            </div>
          </div>
          <button onClick={handleRemoveFile} className="p-1 rounded-full hover:bg-gray-100">
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      )}
    </div>
  );
}