const express = require('express');
const router = express.Router();

// Define a route for rendering the video playback page
router.get('/video', (req, res) => {
  // Here, you can render an HTML page with a video player or serve a static HTML file
  // You may use a templating engine like EJS, or serve a static HTML file using `res.sendFile`
  // In this example, we'll serve a simple HTML file named "video.html"

  res.sendFile('video.html', { root: __dirname });
});

// You can also define other routes related to video handling if needed

module.exports = router;
