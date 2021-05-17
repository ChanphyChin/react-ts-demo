const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.send([
        '/home/redux',
        '/home/template-management',
        '/home/template-edit'
    ])
})

module.exports = router;