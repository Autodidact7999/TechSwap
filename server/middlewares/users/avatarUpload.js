const multer = require("multer");
const { BlobServiceClient } = require('@azure/storage-blob');
require('dotenv').config(); // Ensure your .env file variables are loaded

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
;
const AZURE_CONTAINER_NAME = "avatars";

const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(AZURE_CONTAINER_NAME);

// Setup multer memory storage
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 20 * 1024 * 1024, // Limit file size to 20MB
    },
    fileFilter: (req, file, cb) => {
        console.log("Checking file type for:", file.originalname);
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
            cb(null, true);
        } else {
            console.log("Unsupported file type:", file.mimetype);
            cb(new Error("Unsupported file type"), false);
        }
    },
});

function avatarUpload(req, res, next) {
    upload.single('avatar')(req, res, async (err) => { // Assuming 'avatar' is the name of your file input field
        if (err) {
            console.error("Error during file upload:", err.message);
            return res.status(500).json({
                success: false,
                message: "Error uploading file. " + err.message,
            });
        }

        if (!req.file) {
          console.warn("No file uploaded, using default avatar.");
          req.fileUrl = "https://i.ibb.co/ZX94JDP/dp.jpg"; // Default avatar URL
          return next();
     `` }


        console.log("File received, uploading to Azure Blob Storage...");

        // Upload file to Azure Blob Storage
        try {
            const blobName = `avatars/${Date.now()}-${req.file.originalname}`;
            const blobUrl = await uploadToBlob(req.file.buffer, blobName, req.file.mimetype);

            console.log("File uploaded successfully to Azure Blob Storage:", blobUrl);

            req.fileUrl = blobUrl; // Save URL to request for further processing
            next();
        } catch (uploadError) {
            console.error("Failed to upload to Azure Blob Storage:", uploadError.message);
            return res.status(500).json({
                success: false,
                message: "Failed to upload to Azure Blob Storage."
            });
        }
    });

}

// Function to upload data to Azure Blob Storage
async function uploadToBlob(buffer, blobName, mimetype) {
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    console.log('\nUploading to Azure storage as blob:\n\t', blobName);

    await blockBlobClient.uploadData(buffer, {
        blobHTTPHeaders: { blobContentType: mimetype }
    });

    return blockBlobClient.url;
}

module.exports = avatarUpload;


