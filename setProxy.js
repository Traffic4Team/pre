const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
    app.use(
        ["/user/register", "/travelplan/restaurant", "/user/signIn", "/travelplan"],
      createProxyMiddleware( {
        target: 'http://ec2-43-203-192-225.ap-northeast-2.compute.amazonaws.com:8080',
        changeOrigin: true,
      })
    )
  };
