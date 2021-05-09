const express = require('express');
const router = express.Router();
const fs = require('fs');

router.post('/', function (req, res) {
    try{
        const pageType = req.body.pageType;
        const fileName = `${pageType}.txt`;
        const baseRoot = 'services/config/';
        const configFilePath = `${baseRoot}${fileName}`;
        if(!fs.existsSync(baseRoot)) {
            fs.mkdirSync(baseRoot);
        }
        if(fs.existsSync(configFilePath)) {
            fs.unlinkSync(configFilePath);
        }
        fs.writeFileSync(configFilePath, JSON.stringify(req.body));
        res.send({ success: '保存成功', data: JSON.parse(fs.readFileSync(configFilePath, 'utf-8')) });
    }catch(err) {
        res.status(500).send({ error: err })
    }
})

module.exports = router;