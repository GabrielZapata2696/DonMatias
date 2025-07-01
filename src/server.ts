import { createRequestHandler } from '@netlify/angular-runtime';
import { isMainModule } from '@angular/ssr/node';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

import bootstrap from './main.server';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(express.static(browserDistFolder, {
  maxAge: '1y',
  index: false,
}));

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('*', createRequestHandler({ bootstrap }));

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, function() {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

export default app;
