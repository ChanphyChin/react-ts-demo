const express = require('express');
const router = express.Router();

router.post('/', function (req, res) {
    const { username, password } = req.body;
    global.user = req.body;
    if(username && password) {
        const token = username + password;
        global.token = token;
        res.send({ token})
    }
    let errMsg = 'password can not be empty';
    if(!username) {
        errMsg = 'user name can not be empty'
    }
    res.status(500).send({ error: errMsg })
})

module.exports = router;