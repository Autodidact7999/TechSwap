const { check, validationResult } = require("express-validator");
const User = require("../../models/user.model");
const path = require("path");
const fs = require("fs");

const addUserValidator = [
  check("name")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabets, spaces, or dashes")
    .trim(),
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("Email already in use");
      }
    }),
  check(
    "password",
    "Password must be at least 6 characters long"
  ).isLength({ min: 6 }),
  check("role").default("general"),
];

const addUserValidatorHandler = (req, res, next) => {
  console.log("Request body:", req.body); // Log the request body to see incoming data
  if (req.files) {
    console.log("Uploaded files:", req.files); // Log file data if any files were uploaded
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // If files were uploaded and there are errors, remove the files
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        const filePath = path.join(__dirname, `../../assets/userAvatars/${file.filename}`);
        fs.unlink(filePath, err => {
          if (err) console.error("Failed to delete uploaded file after validation error:", err);
          else console.log("Deleted uploaded file due to validation error:", filePath);
        });
      });
    }
    // Format and send the errors
    const extractedErrors = errors.array().map(err => ({ [err.param]: err.msg }));
    return res.status(400).json({
      success: false,
      errors: extractedErrors,
    });
  }
  next();
};

module.exports = {
  addUserValidator,
  addUserValidatorHandler,
};
