const { generateEmbedding } = require("./embeddingService");
const documents = require("./documents");
const { cosineSimilarity } = require("./vectorUtils");

async function retrieveDocuments(question, topK = 2) {
  // Generate embedding for the question
  const questionEmbedding = await generateEmbedding(question);

  // Compare question with every document
  const results = documents.map((document) => {
    
    const similarity = cosineSimilarity(
      questionEmbedding,
      document.embedding
    );

    return {
      ...document,
      similarity
    };
  });

  // Highest similarity first
  results.sort((a, b) => b.similarity - a.similarity);

  // Return only the most relevant documents
  return results.slice(0, topK);
}

module.exports = {
  retrieveDocuments
};