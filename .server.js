// Servidor estático mínimo, só para pré-visualizar a página localmente.
const http = require('http');
const fs = require('fs');
const path = require('path');
const root = __dirname;
const PORT = process.env.PORT || 8931;
const TYPES = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript',
  '.svg':'image/svg+xml', '.jpg':'image/jpeg', '.png':'image/png',
  '.mp3':'audio/mpeg', '.zip':'application/zip' };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const file = path.join(root, p);
  if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404); return res.end('not found');
  }
  const type = TYPES[path.extname(file)] || 'application/octet-stream';
  const size = fs.statSync(file).size;

  // Sem Content-Length e sem Range o navegador não descobre a duração
  // do mp3 (duration vira Infinity) e não deixa arrastar a barra do
  // player. Vale o punhado de linhas.
  const range = req.headers.range && /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
  if (range) {
    const start = range[1] ? parseInt(range[1], 10) : 0;
    const end = range[2] ? parseInt(range[2], 10) : size - 1;
    if (start >= size || end >= size || start > end) {
      res.writeHead(416, { 'Content-Range': 'bytes */' + size });
      return res.end();
    }
    res.writeHead(206, {
      'Content-Type': type,
      'Content-Length': end - start + 1,
      'Content-Range': 'bytes ' + start + '-' + end + '/' + size,
      'Accept-Ranges': 'bytes'
    });
    return fs.createReadStream(file, { start, end }).pipe(res);
  }

  res.writeHead(200, { 'Content-Type': type, 'Content-Length': size, 'Accept-Ranges': 'bytes' });
  fs.createReadStream(file).pipe(res);
}).listen(PORT, () => console.log('ocn9 preview on http://localhost:' + PORT));
