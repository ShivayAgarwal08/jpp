import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Configure worker using local file resolved by Vite
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export const getPdfPageCount = async (file) => {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        return pdf.numPages;
    } catch (error) {
        console.error("Error counting PDF pages:", error);
        return 1; // Fallback to 1 if detection fails
    }
};
