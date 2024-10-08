const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Load environment variables
dotenv.config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: "dzmcvxoah",
  api_key: "687945774492289",
  api_secret: "S_4vTeRwTf5RncuUoc7k6FGft7A"
});

// Initialize Express
const app = express();

// Middleware

app.use(cors({
  origin: 'http://localhost:5173',  // Your React frontend origin
  credentials: true,  // Allow credentials to be sent
}));



app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(cookieParser());

// Multer setup for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
const upload = multer({ storage });

// Cloudinary upload API
// Cloudinary upload API
app.post('/api/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
  }
  try {
      const filePath = req.file.path; // Get the path of the uploaded file
      const fileStream = fs.createReadStream(filePath); // Create a read stream from the file

      // Upload file to Cloudinary
      const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: 'auto' }, // Automatically determine resource type (image, video, etc.)
          (error, result) => {
              // Handle Cloudinary response
              if (error) {
                  return res.status(500).json({ error: error.message });
              }
              res.json({ url: result.secure_url }); // Respond with the uploaded file URL
          }
      );

      // Pipe the file stream to Cloudinary
      fileStream.pipe(uploadStream);

      // Clean up: Delete the file after upload
      fileStream.on('end', () => {
          fs.unlink(filePath, (err) => {
              if (err) console.error('Error deleting temp file:', err);
          });
      });

      fileStream.on('error', (error) => {
          console.error('Stream error:', error);
          return res.status(500).json({ error: 'Failed to upload file stream' });
      });

  } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'Failed to upload file' });
  }
});



// Import routes
const userRoutes = require("./routes/User.routes");
const whatsappRoutes = require("./routes/Whatsapp.route");
app.use("/api/v1/user", userRoutes);
app.use('/api/v1/qr-scans', whatsappRoutes);

// Export app for use in server.js
module.exports = { app };
