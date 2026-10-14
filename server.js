const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Separar la ruta del archivo de los parámetros GET de la URL
  const cleanUrl = req.url.split('?')[0];
  let fileName = cleanUrl === '/' ? 'index.html' : cleanUrl;
  const filePath = path.join(__dirname, 'public', fileName);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1 style="font-family:sans-serif; text-align:center; margin-top:50px;">404 - Página no encontrada</h1>');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1 style="font-family:sans-serif; text-align:center; margin-top:50px;">500 - Error Interno del Servidor</h1>');
      }
    } else {
      const ext = path.extname(filePath);
      let contentType = 'text/html';
      switch (ext) {
        case '.js': contentType = 'text/javascript'; break;
        case '.css': contentType = 'text/css'; break;
        case '.json': contentType = 'application/json'; break;
        case '.png': contentType = 'image/png'; break;
        case '.jpg': contentType = 'image/jpeg'; break;
      }
      res.writeHead(200, { 'Content-Type': `${contentType}; charset=utf-8` });
      res.end(content);
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor de Portafolio activo en http://localhost:${PORT}`);
});