// Local-only static server for testing the exact Pages artifact, including its base path.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';

const root = resolve('dist');
const home = await readFile(resolve(root, 'index.html'), 'utf8');
const canonical = home.match(/rel="canonical" href="([^"]+)"/)[1];
const base = new URL(canonical).pathname.replace(/\/$/, '');
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
};

createServer(async (req, res) => {
  try {
    let pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (pathname === '/' && base) {
      res.writeHead(302, { Location: `${base}/` });
      res.end();
      return;
    }
    if (base && pathname !== base && !pathname.startsWith(`${base}/`))
      throw new Error('Outside base');
    pathname = pathname.slice(base.length);
    let file = resolve(root, `.${pathname || '/'}`);
    if (file !== root && !file.startsWith(root + sep)) throw new Error('Outside root');
    if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
}).listen(4322, '127.0.0.1');
