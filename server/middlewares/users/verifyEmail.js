const nodemailer = require("nodemailer");
const UserPreference = require("../../models/preference.model");
const User = require("../../models/user.model");
const EmailVerification = require("../../models/email.model");
const { query, validationResult } = require("express-validator");
const { verifyEmailHTML } = require("../../utils/emailTemplates");

const CLIENT_URL = process.env.CLIENT_URL;
const EMAIL_SERVICE = process.env.EMAIL_SERVICE;
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

const transporter = require("../../utils/emailConfig");

const verifyEmailValidation = [
  query("email").isEmail().withMessage("Invalid email format").normalizeEmail(),
  query("code").isLength({ min: 5, max: 5 }).withMessage("Invalid code length"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array({ onlyFirstError: true }) });
    }
    next();
  },
];

const sendVerificationEmail = async (req, res) => {
  const { email, name } = req.body;
  const verificationCode = Math.floor(10000 + Math.random() * 90000);
  const verificationLink = `https://techswaphub.com/auth/verify?code=${verificationCode}&email=${email}`;
  console.log("Verification link:", verificationLink);
  try {
    let transporter = nodemailer.createTransport({
      service:'gmail',
      auth: { user: EMAIL, pass: PASSWORD },
    });

    let info = await transporter.sendMail({
      from: `"TechSwap" <${EMAIL}>`,
      to: email,
      subject: "Verify Your Email Address",
      html: verifyEmailHTML(name, verificationLink, verificationCode),
    });

    
    const newVerification = new EmailVerification({
        email,
        verificationCode,
        messageId: info.messageId,
        for: "signup",  // Explicitly setting the purpose of the email
    });
  
      await newVerification.save();
    res.status(200).json({ message: `Verification email successfully sent to ${email}.` });
 } catch (err) {
    console.error("Error sending verification email:", err);
    res.status(500).json({ message: "Failed to send verification email." });
  }
};

const verifyEmail = async (req, res, next) => {
  const { code, email } = req.query;

  console.log("Verify Email:", email, "Code", code);
  try {
    // Log the type of email and code to ensure they are what's expected
    console.log('Data Types:', typeof email, typeof code);

    const verification = await EmailVerification.findOne({
      email: email,
      verificationCode: code,
    });

    // Log the actual query result to check what is being returned
    console.log("Verification Result:", verification);

    if (!verification) {
      console.log("Verification incorrect or expired.", verification);
      return res.status(404).json({ message: "Invalid or expired verification code." });
    }

    const user = await User.findOneAndUpdate(
      { email: email, isEmailVerified: false },
      { isEmailVerified: true },
      { new: true }
    );

    // Log the user update result
    console.log("User Update Result:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found or already verified." });
    }

    await EmailVerification.deleteMany({ email: email });

    // Assuming you want to save a new user preference
    const newUserPreference = new UserPreference({
      user: user._id,
      enableContextBasedAuth: true,
    });

    await newUserPreference.save();
    console.log("New user preference saved:", newUserPreference);

    // Set the user ID and email to be used by the next middleware
    req.userId = user._id;
    req.email = user.email;

    // Call next to move to addContextData before sending the response
    next();

  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



module.exports = {
  sendVerificationEmail,
  verifyEmail,
  verifyEmailValidation,
};
