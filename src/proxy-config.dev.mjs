export default {
  "/api": {
    "target": "https://api.play.ht",
    "secure": true,
    "logLevel": "debug",
    "changeOrigin": true,
    "bypass": function (req, res, proxyOptions) {
      req.headers['Origin'] = 'https://play.ht';
      req.headers['Referer'] = 'https://play.ht';
      console.log('bypass', req.headers);
    }
  }
};