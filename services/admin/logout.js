const express = require('express');
const router = express.Router();

router.post('/', function (req, res) {
    res.send({ success: 'logout success'})
})

module.exports = router;