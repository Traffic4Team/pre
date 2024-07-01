const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
    app.use(
        ["/user", "/user/join", "/bbs"],
      createProxyMiddleware( {
        target: 'http://localhost:8081',
        changeOrigin: true
      })
    )
    
  };