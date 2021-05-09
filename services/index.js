const express = require('express')
const bodyParser = require('body-parser')
const json = require('body-parser/lib/types/json');
const expressJwt = require('express-jwt');

const vertoken = require('./token-vertify');

const adminInterfaces = require('./admin');
const clientInterfaces = require('./client');


const app = express()
const port = 4000

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

//验证token是否过期并规定哪些路由不用验证
app.use(expressJwt({
	secret: 'mes_qdhd_mobile_xhykjyxgs',
    // credentialsRequired: true,
    algorithms: ['HS256'],
    getToken: function fromHeaderOrQuerystring (req) {
        if (req.headers.authorization) {
            return req.headers.authorization;
        } else if (req.query && req.query.token) {
          return req.query.token;
        }
        return null;
    }
}).unless({
	path: ['/admin/login', '/client/config', '/admin/upload']//除了这些地址，其他的URL都需要验证
}));

// 解析token获取用户信息
app.use(function(req, res, next) {
	var token = req.headers['authorization'];
	if(token == undefined){
		return next();
	}else{
		vertoken.verToken(token).then((data)=> {
			// req.data = data;
			return next();
		}).catch((error)=>{
			return next();
		})
	}
});

//当token失效返回提示信息
app.use(function(err, req, res, next) {
	if (err.status == 401) {
		return res.status(401).send('token失效');
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