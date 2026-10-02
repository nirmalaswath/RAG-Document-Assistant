const { generateEmbedding } = require("./embeddingService");
const { searchDocuments } = require("./vectorStore");

async function retrieveDocuments(question, topK = 3) {
  const questionEmbedding = await generateEmbedding(question);

  const results = await searchDocuments(questionEmbedding, topK);

  const documents = results.documents?.[0] || [];
  const distances = results.distances?.[0] || [];

  return documents.map((document, index) => ({
    content: document,
    distance: distances[index]
  }));
}

module.exports = {
  retrieveDocuments
};