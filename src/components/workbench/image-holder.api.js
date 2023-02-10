const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors()); // Add CORS middleware

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(
        new Error("Invalid file type. Only images are allowed."),
        false
      );
    }
    cb(null, true);
  },
});

app.post("/upload", upload.array("images", 10), (req, res) => {
  const images = req.files;
  images.forEach((image) => {
    const imagePath = path.resolve(__dirname, "images", image.originalname);
    require("fs").writeFileSync(imagePath, image.buffer);
  });
  res.status(200).json({ message: "Images uploaded successfully" });
});

app.listen(5000, () => {
  console.log("API running on http://localhost:3000");
});
