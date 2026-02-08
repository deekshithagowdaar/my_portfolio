import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/* ===============================
   HEALTH CHECK
================================ */
app.get("/", (req, res) => {
  res.send("Gemini AI backend is running 🚀");
});

/* ===============================
   CHAT ROUTE (Gemini API)
================================ */
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({
        reply: "⚠️ No message received"
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        reply: "❌ Gemini API key missing"
      });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `You are Deekshitha A R’s AI portfolio assistant.
Answer clearly about her skills, projects, education, and journey.

User question: ${message}`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();
    console.log("========== GEMINI RAW RESPONSE ==========");
console.log(JSON.stringify(data, null, 2));
console.log("=========================================");


    console.log("🔵 FULL Gemini response:", JSON.stringify(data, null, 2));

    // If Gemini returns error
    if (data.error) {
      return res.status(500).json({
        reply: `❌ Gemini Error: ${data.error.message}`
      });
    }

    // Extract text safely
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      return res.json({
        reply: "⚠️ Gemini returned no text."
      });
    }

    res.json({ reply });

  } catch (error) {
    console.error("❌ Backend error:", error);
    res.status(500).json({
      reply: "⚠️ Server error. Please try again."
    });
  }
});

/* ===============================
   START SERVER
================================ */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
