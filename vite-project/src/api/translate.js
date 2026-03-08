import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY
});

export default async function handler(req, res) {

  const { text, language } = req.body;

  try {

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Translate the following text accurately."
        },
        {
          role: "user",
          content: `Translate this into ${language}: ${text}`
        }
      ]
    });

    res.json({
      translation: completion.choices[0].message.content
    });

  } catch (error) {

    res.status(500).json({ error: "Translation failed" });

  }
}