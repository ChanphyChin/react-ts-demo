const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.send([
        '/home/dasheboard',
        '/home/redux',
        '/home/template-management',
        '/home/template-edit/:id'
    ])
})

module.exports = router;