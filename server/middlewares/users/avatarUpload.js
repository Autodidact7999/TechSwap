const fs = require("fs");
const multer = require("multer");
const path = require("path");

function avatarUpload(req, res, next) {
  const up_folder = path.join(__dirname, "../../assets/userAvatars");

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      if (!fs.existsSync(up_folder)) {
        console.log("Creating upload folder at:", up_folder);
        fs.mkdirSync(up_folder, { recursive: true });
      }
      cb(null, up_folder);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      const newFilename = file.fieldname + "-" + uniqueSuffix + ext;
      console.log("Uploading file as:", newFilename);
      cb(null, newFilename);
    },
  });

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 20 * 1024 * 1024, // Limit file size to 20MB
    },
    fileFilter: (req, file, cb) => {
      console.log("Checking file type for:", file.originalname);
      if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png"
      ) {
        cb(null, true);
      } else {
        console.log("Unsupported file type:", file.mimetype);
        cb(new Error("Unsupported file type"), false);
      }
    },
  });

  // upload.any()(req, res, (err) => {
  //   if (err) {
  //     console.error("Error during file upload:", err.message);
  //     res.status(500).json({
  //       success: false,
  //       message: "Error uploading file. " + err.message,
  //     });
  //   } else {
  //     if (req.files.length === 0) {
  //       console.warn("No file uploaded");
  //       res.status(400).json({
  //         success: false,
  //         message: "No file uploaded. Please upload an image file.",
  //       });
  //     } else {
  //       console.log("File uploaded successfully");
  //       next();
  //     }
  //   }
  // });


  upload.any()(req, res, (err) => {
    if (err) {
      console.error("Error during file upload:", err.message);
      res.status(500).json({
        success: false,
        message: "Error uploading file. " + err.message,
      });
    } else {
      console.log("File upload handling complete, proceeding with request.");
      next();  // Always proceed to the next middleware, even if no files were uploaded
    }
  });
  
}

module.exports = avatarUpload;
