import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import type { TextItem } from 'pdfjs-dist/types/src/display/api';

// Define o caminho para o "worker" do pdf.js, essencial para ele funcionar no navegador.
// Este é o caminho padrão se você instalar via npm/yarn.
GlobalWorkerOptions.workerSrc = `/node_modules/pdfjs-dist/build/pdf.worker.min.mjs`;

/**
 * Extrai o texto de um objeto File, suportando .txt e .pdf.
 * @param file O arquivo selecionado pelo usuário.
 * @returns Uma Promise que resolve para o conteúdo de texto do arquivo.
 */
export function getTextFromFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = (_e) => reject(new Error("Falha ao ler o arquivo de texto."));
      reader.readAsText(file);
    } 
    else if (file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          if (!e.target?.result) {
            return reject(new Error("Falha ao carregar o arquivo PDF."));
          }
          const pdfData = new Uint8Array(e.target.result as ArrayBuffer);
          const pdf = await getDocument({ data: pdfData }).promise;
          let fullText = '';

          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => (item as TextItem).str).join(' ');
            fullText += pageText + ' ';
          }
          resolve(fullText);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (e) => reject(e);
      reader.readAsArrayBuffer(file);
    } else {
      reject(new Error('Formato de arquivo não suportado.'));
    }
  });
}