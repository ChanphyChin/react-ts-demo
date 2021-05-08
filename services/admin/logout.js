const express = require('express');
const router = express.Router();

router.post('/', function (req, res) {
    global.token = null;
    res.send({ success: 'logout success'})
})

module.exports = router;