const { retrieveDocuments } = require("./ragService");
const { generateAnswer } = require("./llmService");

async function askQuestion(question) {
  const results = await retrieveDocuments(question, 3);
  const MAX_DISTANCE = 1.5
  const relevantDocuments = results.filter(
    (result) => result.distance <= MAX_DISTANCE
  );
  if (relevantDocuments.length === 0) {
    return {
      answer: "I don't have enough information to answer that question."
    };
  }
  const context = results
    .map((result, index) => {
      return `Chunk ${index + 1}:\n${result.content}`;
    })
    .join("\n\n");

  const answer = await generateAnswer(question, context);

  return {
    answer,
    retrievedDocuments: results
  };
}

module.exports = { askQuestion };