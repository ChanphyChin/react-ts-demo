const express = require('express');
const router = express.Router();
const settoken = require('../token-vertify');

router.post('/', function (req, res, next) {
    const { username, password } = req.body;
    settoken.setToken(username, password).then((data)=>{
		return res.json({ token: data });
	})
	return next();
})

module.exports = router;