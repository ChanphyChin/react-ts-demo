const express = require('express')
const bodyParser = require('body-parser')
const json = require('body-parser/lib/types/json');
const app = express()
const port = 4000

const adminInterfaces = require('./admin');
const clientInterfaces = require('./client');

// 允许跨域
var allowCors = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'x-requested-with,Authorization,Content-Type');
    res.header('Access-Control-Allow-Credentials','true');
    next();
  };
app.use(allowCors);

// 请求参数json化
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// 静态文件
app.use('/admin/static', express.static('services'))

// 路由拦截
const openRoutes = ['/','/admin/login'];
app.use(function(req, res, next) {
    const token = global.token;
    const url = req.originalUrl;
　　if(token || openRoutes.includes(url)){
　　　　next();
　　}else{
　　　　res.status(401).send('access denied');
　　}
});

for(let config of adminInterfaces) {
    app.use(config.url, config.interface);
}

for(let config of clientInterfaces) {
    app.use(config.url, config.interface);
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})