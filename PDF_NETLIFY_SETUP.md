# PDF Setup for Netlify

## Current Configuration

The PDF viewer is now configured to use the Netlify external images URL:
- **Base URL**: `https://donmatias-external-images.netlify.app/contratacion_previa/`
- **Environment**: Configured in `src/environments/environment.ts` and `src/environments/environment.prod.ts`

## Required Files to Upload to Netlify

The following PDF files need to be uploaded to the `donmatias-external-images.netlify.app` site in a folder called `contratacion_previa`:

1. `CONTRATACIÓN EDTD.pdf`
2. `CONTRATACIÓN FOVIS.pdf`

## Upload Instructions

1. Access your Netlify dashboard for `donmatias-external-images.netlify.app`
2. Create a folder called `contratacion_previa` in the root directory
3. Upload both PDF files to this folder
4. The final URLs will be:
   - `https://donmatias-external-images.netlify.app/contratacion_previa/CONTRATACIÓN%20EDTD.pdf`
   - `https://donmatias-external-images.netlify.app/contratacion_previa/CONTRATACIÓN%20FOVIS.pdf`

## Local Files

The PDF files are available locally in the `contratacion_previa` folder of this project.

## How It Works

1. The PDF service (`pdf-document.service.ts`) constructs URLs using the Netlify base URL
2. URLs are properly encoded using `encodeURIComponent()` to handle special characters
3. The component uses `DomSanitizer` to safely embed the PDFs in iframes
4. Fallback options include Google Docs viewer and direct download

## Testing

Once uploaded to Netlify, the PDFs should be accessible at:
- Main app: Your Angular app URL + `/contratacion`
- Direct access: `https://donmatias-external-images.netlify.app/contratacion_previa/[filename]`
