import { launch } from 'puppeteer';
import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BUILD_DIR = join(__dirname, '..', 'build');

const ROUTES = [
  '/',
  '/directory',
  '/about',
  '/about/roadmap',
  '/about/team',
  '/news',
  '/events',
  '/explore',
  '/community',
];

// Simple static file server for the build output
function startServer(port) {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let filePath = join(BUILD_DIR, req.url === '/' ? 'index.html' : req.url);

      // SPA fallback: serve index.html for routes without file extensions
      if (!filePath.includes('.') || !existsSync(filePath)) {
        filePath = join(BUILD_DIR, 'index.html');
      }

      try {
        const content = readFileSync(filePath);
        const ext = filePath.split('.').pop();
        const mimeTypes = {
          html: 'text/html', js: 'application/javascript', css: 'text/css',
          json: 'application/json', webp: 'image/webp', png: 'image/png',
          jpg: 'image/jpeg', svg: 'image/svg+xml', txt: 'text/plain',
        };
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
        res.end(content);
      } catch {
        res.writeHead(404);
        res.end('Not found');
      }
    });
    server.listen(port, () => resolve(server));
  });
}

async function prerender() {
  const PORT = 4173;
  const server = await startServer(PORT);
  console.log(`Pre-render server running on http://localhost:${PORT}`);

  const browser = await launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  let success = 0;

  for (const route of ROUTES) {
    const page = await browser.newPage();

    // Block external requests (Supabase, analytics, etc.)
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      const url = req.url();
      if (url.startsWith(`http://localhost:${PORT}`)) {
        req.continue();
      } else {
        req.abort();
      }
    });

    try {
      await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: 'networkidle0',
        timeout: 15000,
      });

      // Wait for React to render
      await page.waitForSelector('#root > *', { timeout: 10000 });

      // Get the full rendered HTML
      const html = await page.content();

      // Write to the correct path
      const outDir = join(BUILD_DIR, route === '/' ? '' : route);
      mkdirSync(outDir, { recursive: true });

      const outFile = route === '/'
        ? join(BUILD_DIR, 'index.html')
        : join(outDir, 'index.html');

      writeFileSync(outFile, html);
      success++;
      console.log(`  Pre-rendered: ${route} -> ${outFile.replace(BUILD_DIR, 'build')}`);
    } catch (err) {
      console.warn(`  Failed: ${route} - ${err.message}`);
    }

    await page.close();
  }

  await browser.close();
  server.close();
  console.log(`\nPre-rendered ${success}/${ROUTES.length} routes.`);

  if (success === 0) {
    process.exit(1);
  }
}

prerender();
