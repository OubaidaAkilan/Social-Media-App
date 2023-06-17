const express = require('express');
const upload = require('./uploadImageModel.js');
const { uploadImage } = require('./uploadImageService');

const router = express.Router();

router.post('/', upload.single('file'), uploadImage);

module.exports = router;
