require("dotenv").config();

const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

async function generateAnswer(question, context) {
  const prompt = `
Answer the user's question using the provided context.

If the answer cannot be found in the context, say:
"I don't have enough information in the provided documents."

Context:
${context}

Question:
${question}
`;

  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
      {
        role: "system",
        content: "You are a helpful technical documentation assistant."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.1,
    max_completion_tokens: 500
  });

  return completion.choices[0].message.content;
}

module.exports = {
  generateAnswer
};