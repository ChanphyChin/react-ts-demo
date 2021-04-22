const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 4000

var allowCors = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials','true');
    next();
  };
app.use(allowCors);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})
let token;
app.post('/login', function (req, res) {
    const { username, password } = req.body;
    if(username && password) {
        token = username + password;
        res.send({ token})
    }
    let errMsg = 'password can not be empty';
    if(!username) {
        errMsg = 'user name can not be empty'
    }
    res.status(500).send({ error: errMsg })
})
app.post('/logout', function (req, res) {
    token = null;
    res.send({ success: 'logout success'})
})

app.get('/home', (req, res) => {
    if(!token) {
        res.status(401).send({ error: 'access denied' })
    }
    res.send([])
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})