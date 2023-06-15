
exports.uploadImage = (req, res) => {
  console.log('req.file', req.file);
  const file = req.file;
  res.status(200).json(file.filename);
};


