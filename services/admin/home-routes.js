const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.send([
        '/home/redux',
        '/home/template-management',
        '/home/template-edit',
        '/home/template-management-web',
        '/home/template-edit-web',
    ])
})

module.exports = router;