const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
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

module.exports = router;