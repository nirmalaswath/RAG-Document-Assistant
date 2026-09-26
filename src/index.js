const { generateEmbedding } = require("./embeddingService");
const documents = require("./documents");
const { cosineSimilarity } = require("./vectorUtils");

async function main() {
  for (const document of documents) {
    document.embedding = await generateEmbedding(document.content);
  }

  const question = "What is a message queue?";

  const questionEmbedding = await generateEmbedding(question);

  const results = documents.map((document) => {
    const similarity = cosineSimilarity(
      questionEmbedding,
      document.embedding
    );

    return {
      topic: document.topic,
      similarity
    };
  });

  results.sort((a, b) => b.similarity - a.similarity);

  console.log("\nQuestion:", question);
  console.log("\nSearch results:");

  console.log(results);
}

main();