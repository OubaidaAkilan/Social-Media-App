const express = require('express');
const upload = require('./uploadImageModeljs');
const { uploadImage } = require('./uploadImageService');

const router = express.Router();

router.post('/', upload.single('file'), uploadImage);

module.exports = router;
