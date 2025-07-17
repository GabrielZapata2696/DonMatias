import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

export interface ContractDocument {
  title: string;
  url: string;
  opened?: boolean;
  loading?: boolean;
  error?: boolean;
  useIframe?: boolean;
  showInline?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PdfDocumentService {
  private readonly PDF_BASE_URL = `${environment.imageBaseUrl}/contratacion_previa/`;
  
  private readonly PDF_DOCUMENTS = [
    {
      filename: 'CONTRATACIÓN EDTD.pdf',
      title: 'Contratación EDTD',
      description: 'Términos y condiciones para contratación EDTD'
    },
    {
      filename: 'CONTRATACIÓN FOVIS.pdf',
      title: 'Contratación FOVIS',
      description: 'Términos y condiciones para contratación FOVIS'
    }
  ];

  constructor() { }

  /**
   * Get all available contract documents
   * @returns Array of contract documents with full URLs
   */
  getContractDocuments(): ContractDocument[] {
    return this.PDF_DOCUMENTS.map(doc => ({
      title: doc.title,
      url: `${this.PDF_BASE_URL}${encodeURIComponent(doc.filename)}`,
      opened: false,
      loading: false,
      error: false,
      useIframe: false,
      showInline: false
    }));
  }

  /**
   * Get a specific document by filename
   * @param filename - The PDF filename
   * @returns Contract document or null if not found
   */
  getDocumentByFilename(filename: string): ContractDocument | null {
    const doc = this.PDF_DOCUMENTS.find(d => d.filename === filename);
    if (!doc) return null;

    return {
      title: doc.title,
      url: `${this.PDF_BASE_URL}${encodeURIComponent(doc.filename)}`,
      opened: false,
      loading: false,
      error: false
    };
  }

  /**
   * Check if PDF URL is accessible
   * @param url - PDF URL to check
   * @returns Promise that resolves if accessible
   */
  async checkPdfAccessibility(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Get the base URL for PDFs
   * @returns Base URL string
   */
  getPdfBaseUrl(): string {
    return this.PDF_BASE_URL;
  }
}
