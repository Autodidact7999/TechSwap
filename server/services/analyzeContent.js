

const { google } = require("googleapis");
const { saveLogInfo } = require("../middlewares/logger/logInfo");
const Config = require("../models/config.model");

const analyzeTextWithPerspectiveAPI = async (
  content,
  API_KEY,
  DISCOVERY_URL,
  timeout
) => {
  const SCORE_THRESHOLD = 0.5;
  console.log("Starting text analysis with Perspective API");

  if (!API_KEY || !DISCOVERY_URL) {
    console.error("API Key or Discovery URL not provided");
    throw new Error("Perspective API URL or API Key not set");
  }

  try {
    const client = await google.discoverAPI(DISCOVERY_URL);
    console.log("API client discovered");

    const analyzeRequest = {
      comment: {
        text: content,
      },
      requestedAttributes: {
        INSULT: {},
        PROFANITY: {},
        THREAT: {},
        SEXUALLY_EXPLICIT: {},
        IDENTITY_ATTACK: {},
        TOXICITY: {},
      },
    };

    console.log("Sending analysis request:", analyzeRequest);
    const responsePromise = client.comments.analyze({
      key: API_KEY,
      resource: analyzeRequest,
    });

    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.error("Analysis request timed out");
        reject(new Error("Request timed out"));
      }, timeout);
    });

    const response = await Promise.race([responsePromise, timeoutPromise]);
    console.log("Received response from Perspective API");

    const summaryScores = {};
    for (const attribute in response.data.attributeScores) {
      const summaryScore = response.data.attributeScores[attribute].summaryScore.value;
      console.log(`Score for ${attribute}:`, summaryScore);
      if (summaryScore >= SCORE_THRESHOLD) {
        summaryScores[attribute] = summaryScore;
      }
    }

    return summaryScores;
  } catch (error) {
    console.error(`Error analyzing text: ${error.message}`);
    throw new Error(`Error analyzing text: ${error.message}`);
  }
};


const analyzeContent = async (req, res, next) => {
  console.log("Entering analyzeContent middleware");
  const timeout = 5000; // 5 seconds
  const API_KEY = process.env.PERSPECTIVE_API_KEY;
  const DISCOVERY_URL = process.env.PERSPECTIVE_API_DISCOVERY_URL;

  let usePerspectiveAPI;
  try {
    const config = await Config.findOne({}, { _id: 0, __v: 0 });
    usePerspectiveAPI = config.usePerspectiveAPI;
    console.log("Configuration loaded:", config);
  } catch (error) {
    console.error("Failed to load configuration:", error);
    usePerspectiveAPI = false;
  }

  if (!usePerspectiveAPI || !API_KEY || !DISCOVERY_URL) {
    console.log("Skipping Perspective API due to config or missing API details");
    return next();
  }

  try {
    const { content } = req.body;
    console.log("Analyzing content:", content);
    const summaryScores = await analyzeTextWithPerspectiveAPI(
      content,
      API_KEY,
      DISCOVERY_URL,
      timeout
    );

    console.log("Analysis results:", summaryScores);
    if (Object.keys(summaryScores).length > 0) {
      const type = "inappropriateContent";
      console.log("Blocking content due to inappropriate content");
      return res.status(403).json({ type });
    } else {
      console.log("Content appropriate, proceeding with next middleware");
      next();
    }
  } catch (error) {
    console.error(`Error processing Perspective API response: ${error.message}`);
    await saveLogInfo(null, errorMessage, "Perspective API", "error");
    next();
  }
};

module.exports = analyzeContent;
