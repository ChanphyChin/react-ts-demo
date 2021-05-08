const express = require('express');
const router = express.Router();
const multer = require("multer");

const port = 4000

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'services/images/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})

const upload = multer({storage})

router.post('/', upload.single('image'), function (req, res) {
    const url = ` http://localhost:${port}/static/images/${req.file.filename}`;
    res.send(url);
})

module.exports = router;