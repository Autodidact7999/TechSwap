const { Configuration, OpenAIApi } = require("openai");
const { saveLogInfo } = require("../middlewares/logger/logInfo");
const Config = require("../models/config.model");

// Function to use OpenAI's Content Moderation API
const analyzeTextWithOpenAI = async (content, OPENAI_API_KEY) => {
  console.log("Setting up OpenAI Configuration...");
  const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  try {
    console.log("Sending content for moderation...");
    const response = await openai.createModeration({
      input: content
    });

    const results = response.data.results;
    const flaggedItems = results.filter(item => item.flagged);

    console.log("Moderation results received:", flaggedItems);
    return flaggedItems.length ? flaggedItems : null;
  } catch (error) {
    console.error("Error analyzing text with OpenAI:", error.message);
    throw new Error(`Error analyzing text with OpenAI: ${error.message}`);
  }
};

// Function to handle content analysis and response
const analyzeContent = async (req, res, next) => {
  console.log("Retrieving environment variables for OpenAI API...");
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  let useOpenAI;
  try {
    console.log("Fetching configuration from the database...");
    const config = await Config.findOne({}, { _id: 0, __v: 0 });
    useOpenAI = config.useOpenAI;
    console.log("Use OpenAI setting:", useOpenAI);
  } catch (error) {
    console.error("Error fetching configuration:", error.message);
    useOpenAI = false;
  }

  if (!useOpenAI || !OPENAI_API_KEY) {
    console.log("Skipping moderation due to configuration or missing API key.");
    return next();
  }

  const { content } = req.body;
  try {
    let flaggedContent = null;
    if (useOpenAI && OPENAI_API_KEY) {
      console.log("Analyzing content...");
      flaggedContent = await analyzeTextWithOpenAI(content, OPENAI_API_KEY);
    }

    if (flaggedContent) {
      console.log("Inappropriate content found. Blocking response.");
      const type = "inappropriateContent";
      return res.status(403).json({ type, details: flaggedContent });
    } else {
      console.log("No inappropriate content detected. Proceeding...");
      next();
    }
  } catch (error) {
    const errorMessage = `Error processing content moderation response: ${error.message}`;
    console.error(errorMessage);
    await saveLogInfo(null, errorMessage, "OpenAI Content Moderation API", "error");
    next();
  }
};

module.exports = analyzeContent;
