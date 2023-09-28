const express = require('express');
const multer = require('multer'); // For handling file uploads
const app = express();
const port = process.env.PORT || 3000; // Use the provided port or default to 8000

// Middleware to parse JSON requests
app.use(express.json());

// Middleware for handling file uploads
const storage = multer.diskStorage({
  destination: 'uploads/', // Specify the directory to save uploaded files
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original filename
  },
});
const upload = multer({ storage: storage });

// Define a route for handling video uploads
app.post('/upload', upload.single('video'), (req, res) => {
  // Handle the uploaded video here (e.g., save it to disk)
  res.status(200).json({ message: 'Video uploaded successfully' });
});

// Define a route for serving the video playback page
app.get('/video', (req, res) => {
  // Render and send the video playback page here (e.g., using a templating engine or serving a static HTML file)
  res.status(200).sendFile(__dirname + '/video.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
