<<<<<<< HEAD
const { createProxyMiddleware } = require("http-proxy-middleware");
=======
const {createProxyMiddleware} = require('http-proxy-middleware');
//do destructure the createProxyMiddleware above this
>>>>>>> 627920561ba9a4afa690872010369181b0934a92

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
};
