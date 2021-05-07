const express = require('express')
const bodyParser = require('body-parser')
const multer = require("multer");
const app = express()
const port = 4000

var allowCors = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'x-requested-with,Authorization,Content-Type');
    res.header('Access-Control-Allow-Credentials','true');
    next();
  };
app.use(allowCors);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

let token;
let user = {};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'services/images/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})

const upload = multer({storage})

app.get('/user_info', (req, res) => {
  res.send(user);
})

app.post('/login', function (req, res) {
    const { username, password } = req.body;
    user = req.body;
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

app.post('/upload',upload.single('image'), function (req, res) {
    console.log(req);
    const url = ` http://localhost:${port}/${req.file.filename}`;
    res.send(url);
})

app.get('/home_routes', (req, res) => {
    if(!token) {
        res.status(401).send({ error: 'access denied' })
    }
    res.send([
        '/home/dasheboard',
        '/home/redux',
        '/home/template-management',
        '/home/template-edit/:id'
    ])
})

app.get('/dasheboard_table', (req, res) => {
    const { page, pageSize } = req.query;
    const totalSize = 45;
    if(pageSize) {
        let result = [];
        const total = (pageSize / 1 + (page - 1) * 10) < totalSize ? (pageSize / 1 + (page - 1) * 10) : totalSize; 
        for(let i = (page - 1) * 10; i < total; i++) {
            result.push({
                key: i + 1,
                name: `胡彦斌${i + 1}号`,
                age: i,
                address: `西湖区湖底公园${i + 1}号`,
            })
        }
        res.send({ total: Number(totalSize), page: Number(page), result, pageSize: Number(pageSize) })
    }else {
        res.send('page size can not be empty');
    }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})