const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
    app.use(
        ["/user", "/user/join", "/bbs", "/comment"],
      createProxyMiddleware( {
        target: 'http://localhost:8081',
        changeOrigin: true
      })
    )
  //   app.use(
  //     ["/request"],
  //   createProxyMiddleware( {
  //     target: 'http://api.kcisa.kr/openapi/API_CNV_063',
  //     changeOrigin: true
  //   })
  // )
  };
