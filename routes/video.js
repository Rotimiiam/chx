const express = require('express');
const multer = require('multer'); // For handling file uploads
const fs = require('fs'); // For working with the file system

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


    const currentDate = new Date().toISOString().replace(/:/g, '-').replace('T', '_').slice(0, -5);
    // Generate a unique file name using a timestamp and random string
    const uniqueFileName = currentDate + '-' + 'screen_rec' + '.mp4';

    // Get the uploaded file as a buffer
    const videoBuffer = req.file.buffer;

    // Define the path to save the video file to the "uploads" folder
    const filePath = `./uploads/${uniqueFileName}`;

    // Write the video buffer to the file system
    fs.writeFile(filePath, videoBuffer, (err) => {
      if (err) {
        console.error('Error saving video to disk:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      // Set the response headers for video playback
      res.setHeader('Content-Disposition', `attachment; filename="${uniqueFileName}"`);
      res.setHeader('Content-Type', 'video/mp4');

      // Send the video buffer as the response
      res.send(videoBuffer);
    });
  } catch (error) {
    console.error('Error handling video upload:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
