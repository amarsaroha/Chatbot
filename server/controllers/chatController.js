const axios = require('axios');

exports.handleChat = async (req, res) => {
  const userMessage = req.body.message;
  console.log("User message:", userMessage);

  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      {
        contents: [
          {
            parts: [
              {
                text: userMessage
              }
            ]
          }
        ]
      },
      {
        headers: { 'Content-Type': 'application/json' },
        params: { key: process.env.GEMINI_API_KEY },
        timeout: 50000,
      }
    );

    
    const aiResponse =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response.";

    console.log("AI Response:", aiResponse);
    res.json({ message: aiResponse });
  } catch (error) {
    console.error("Gemini API error:", error.response?.data || error.message);
    res.status(500).json({
      error: error.response?.data?.error?.message || "Something went wrong",
    });
  }
};
