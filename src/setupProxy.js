/* eslint-disable import/no-anonymous-default-export */
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/blog', {
      target: 'http://localhost:8000',
      changeOrigin: true,
      pathRewrite: { '^/blog': '' }
    })
  )
}
