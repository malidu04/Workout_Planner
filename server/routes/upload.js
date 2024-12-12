import express from "express";
import multer from "multer";
import cloudinary from "../cloudinary"; // Import configured Cloudinary

const router = express.Router();

// Set up Multer storage
const storage = multer.diskStorage({});
const upload = multer({ storage });

// Route for uploading files
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "uploads", // Optional: Specify folder in your Cloudinary account
    });

    res.status(200).json({ url: result.secure_url });
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;
