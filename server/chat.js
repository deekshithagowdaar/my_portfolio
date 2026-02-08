import OpenAI from "openai";
import { profileData } from "./data/profileData.js";

export async function chatWithAI(userMessage) {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: profileData },
      { role: "user", content: userMessage }
    ],
  });

  return response.choices[0].message.content;
}
