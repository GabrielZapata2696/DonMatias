import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Configure PDF.js worker
if (typeof window !== 'undefined') {
  // Use CDN worker for better compatibility
  (window as any).pdfWorkerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.js';
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
