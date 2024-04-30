const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://www.googleapis.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/books/v1', // Redireciona /api para /books/v1 na URL
      },
      headers: {
        'Access-Control-Allow-Origin': '*', // Adiciona cabeçalho CORS
      },
    })
  );
};
