const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_URL.split("@")[1], // Extract cloud name
  api_key: process.env.CLOUDINARY_URL.split(":")[1].replace("//", ""), // Extract API key
  api_secret: process.env.CLOUDINARY_URL.split(":")[2].split("@")[0], // Extract API secret
});

module.exports = cloudinary;
