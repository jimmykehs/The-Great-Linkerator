const {createProxyMiddleware} = require('http-proxy-middleware');
//do destructure the createProxyMiddleware above this

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};