const express = require('express');
const router = express.Router();
const fs = require('fs');

router.post('/', function (req, res) {
    try{
        const pageType = req.body.pageType;
        const fileName = `${pageType}.txt`;
        const configFilePath = `services/config/${fileName}`;
        const isConfigExists = fs.existsSync(configFilePath);
        if(isConfigExists) fs.unlinkSync(configFilePath);
        fs.writeFileSync(configFilePath, JSON.stringify(req.body));
        res.send({ success: '保存成功', data: JSON.parse(fs.readFileSync(configFilePath, 'utf-8')) });
    }catch(err) {
        res.status(500).send({ error: err })
    }
})

module.exports = router;