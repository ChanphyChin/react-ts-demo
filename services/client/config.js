const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', function (req, res) {
    const pageType = req.query.pageType;
    const fileName = `${pageType}.txt`;
    const configFilePath = `services/config/${fileName}`;
    if(!fs.existsSync(configFilePath)) {
        res.send('');
    }else {
        res.send(JSON.parse(fs.readFileSync(configFilePath, 'utf-8')));
    }
})

module.exports = router;