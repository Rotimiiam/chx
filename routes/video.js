const express = require('express');
const multer = require('multer'); // For handling file uploads

const router = express.Router();

// Define a route for rendering the video playback page
router.get('/video', (req, res) => {
  // Here, you can render an HTML page with a video player or serve a static HTML file
  // You may use a templating engine like EJS, or serve a static HTML file using `res.sendFile`
  // In this example, we'll serve a simple HTML file named "video.html"

  res.sendFile('video.html', { root: __dirname });
});

// Middleware for handling file uploads
const storage = multer.memoryStorage(); // Store the uploaded file in memory
const upload = multer({ storage: storage });

// Define a route for handling video uploads
router.post('/upload', upload.single('video'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Get the uploaded file as a buffer
    const videoBuffer = req.file.buffer;

    // You can now do whatever you want with the videoBuffer
    // For example, you can send it back to the client for them to save
    res.setHeader('Content-Disposition', 'attachment; filename="screen_rec.mp4"');
    res.setHeader('Content-Type', 'video/mp4');
    res.send(videoBuffer);
  } catch (error) {
    console.error('Error handling video upload:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
