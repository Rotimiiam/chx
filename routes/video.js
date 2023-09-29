require('dotenv').config();
const express = require('express');
const multer = require('multer'); // For handling file uploads
const AWS = require('aws-sdk'); // AWS SDK for Node.js

const router = express.Router();

// Initialize AWS SDK with your credentials from environment variables
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
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

    // Generate a unique file name using a timestamp and random string
    const currentDate = new Date().toISOString().replace(/:/g, '-').replace('T', '_').slice(0, -5);
    const uniqueFileName = currentDate + '-' + 'screen_rec' + '.mp4';

    // Get the uploaded video buffer
    const videoBuffer = req.file.buffer;

    // Define the parameters for uploading to AWS S3 using environment variables
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `uploads/${uniqueFileName}`, // Specify the folder and unique file name
      Body: videoBuffer,
    };

    // Upload the video to AWS S3
    s3.upload(params, (err, data) => {
      if (err) {
        console.error('Error uploading to S3:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      // Set the S3 URL as the response
      const s3Url = data.Location;

      // Redirect to the video route with the S3 URL
      res.redirect(`/video?s3Url=${encodeURIComponent(s3Url)}`);
    });
  } catch (error) {
    console.error('Error handling video upload:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
