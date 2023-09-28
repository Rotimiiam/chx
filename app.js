const express = require('express'); 
const app = express();
const port = process.env.PORT || 3000; // Use the provided port or default to 8000

// Middleware to parse JSON requests
app.use(express.json());

const videoRoutes = require('./routes/video');

// Use the video route
app.use('/api', videoRoutes);



// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
