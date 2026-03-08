const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const SYSTEM_PROMPT = `
You are an AI financial assistant inside a micro-loan eligibility platform designed for gig workers.

Your goal is to determine loan eligibility, explain financial readiness, and guide users on improving eligibility.

Only answer questions related to:
- gig worker income
- loan eligibility
- micro-loans
- bank recommendations
- credit score improvement
- expense analysis
- financial readiness

If the user asks unrelated questions, politely redirect them back to loan eligibility or financial readiness.

You must detect the user's language and respond in the same language.

Supported languages:
English, Hindi, Tamil, Spanish, French.

Always explain financial topics in simple language.
`;

export async function askAI(messages) {

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages
      ],
      temperature: 0.3
    })
  });

  const data = await response.json();

  return data.choices[0].message.content;
}