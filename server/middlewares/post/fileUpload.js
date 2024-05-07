const multer = require("multer");
const { BlobServiceClient } = require('@azure/storage-blob');
require('dotenv').config();

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const AZURE_CONTAINER_NAME = "avatars";


const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(AZURE_CONTAINER_NAME);

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 50 * 1024 * 1024, // 50MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
            cb(null, true);
        } else {
            cb(new Error("Unsupported file type"), false);
        }
    },
});

function fileUpload(req, res, next) {
    upload.any()(req, res, async (err) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Error uploading file",
                error: err.message,
            });
        }

        if (!req.files || req.files.length === 0) {
            return next();
        }

        try {
            const file = req.files[0];
            const blobName = `posts/${Date.now()}-${file.originalname}`;
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);
            await blockBlobClient.uploadData(file.buffer, {
                blobHTTPHeaders: { blobContentType: file.mimetype }
            });

            req.file = file;
            req.fileUrl = blockBlobClient.url;
            req.fileType = file.mimetype.split("/")[0];

            next();
        } catch (uploadError) {
            return res.status(500).json({
                success: false,
                message: "Failed to upload file to Azure Blob Storage",
                error: uploadError.message,
            });
        }
    });
}

module.exports = fileUpload;
