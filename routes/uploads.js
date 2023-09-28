const express = require('express');
const multer = require('multer'); // For handling file uploads
const fs = require('fs'); // For working with the file system
const router = require('./video');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

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

