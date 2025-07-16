import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PdfDocumentService, ContractDocument } from '../services/pdf-document.service';

@Component({
  selector: 'app-contratacion',
  templateUrl: './contratacion.component.html',
  styleUrls: ['./contratacion.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class ContratacionComponent {
  documents: ContractDocument[] = [];

  constructor(
    private pdfDocumentService: PdfDocumentService,
    private sanitizer: DomSanitizer
  ) {
    this.documents = this.pdfDocumentService.getContractDocuments();
  }

  onPanelOpened(document: ContractDocument): void {
    if (!document.opened) {
      document.opened = true;
      document.loading = true;
      document.error = false;
      console.log('Loading PDF:', document.url);
      
      // Set a timeout to prevent infinite loading
      setTimeout(() => {
        if (document.loading) {
          console.error('PDF loading timeout for:', document.url);
          document.loading = false;
          document.error = true;
        }
      }, 10000); // 10 seconds timeout
    }
  }

  onPdfLoadComplete(document: ContractDocument): void {
    console.log('PDF loaded successfully:', document.url);
    document.loading = false;
    document.error = false;
  }

  onPdfError(document: ContractDocument, error?: any): void {
    console.error('PDF loading error:', error, 'URL:', document.url);
    document.loading = false;
    document.error = true;
  }

  onPdfViewerError(document: ContractDocument, error?: any): void {
    console.error('PDF viewer error, falling back to iframe:', error, 'URL:', document.url);
    // Fallback to iframe
    document.useIframe = true;
    document.loading = true;
    document.error = false;
  }

  onIframeLoad(document: ContractDocument): void {
    console.log('PDF loaded successfully via iframe:', document.url);
    // Give it a moment to actually load content
    setTimeout(() => {
      document.loading = false;
      document.error = false;
    }, 1000);
  }

  onIframeError(document: ContractDocument): void {
    console.error('Iframe loading error:', document.url);
    document.loading = false;
    document.error = true;
  }

  getPdfViewerUrl(url: string): string {
    // Try direct PDF display first
    return url;
  }

  getGoogleDocsUrl(url: string): string {
    // Google Docs viewer as fallback
    return `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;
  }

  getMozillaUrl(url: string): string {
    // Mozilla PDF.js viewer as another fallback
    return `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(url)}`;
  }

  openPdfInNewTab(url: string): void {
    window.open(url, '_blank');
  }

  retryPdfLoad(document: ContractDocument): void {
    document.error = false;
    document.loading = true;
    document.useIframe = false; // Reset iframe fallback
    // Force re-render by temporarily setting opened to false and back to true
    document.opened = false;
    setTimeout(() => {
      document.opened = true;
    }, 100);
  }

  trackByDocument(index: number, document: ContractDocument): string {
    return document.title;
  }
}
