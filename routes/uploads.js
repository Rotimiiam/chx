const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Directory to save uploaded files

app.post('/upload', upload.single('video'), (req, res) => {
  // Handle the uploaded video here
});
