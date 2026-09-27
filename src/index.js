const { generateEmbedding } = require("./embeddingService");
const documents = require("./documents");
const { retrieveDocuments } = require("./ragService");
const { generateAnswer } = require("./llmService");

async function main() {
  // Create embeddings for our documents
  for (const document of documents) {
    document.embedding = await generateEmbedding(document.content);
  }

  const question = "What is the visibility timeout in SQS?";

  // Retrieve relevant documents
  const retrievedDocuments = await retrieveDocuments(question, 2);

  console.log("\nRetrieved documents:");

  retrievedDocuments.forEach((doc) => {
    console.log(
      `${doc.topic} - similarity: ${doc.similarity.toFixed(3)}`
    );
  });

  // Build context
  const context = retrievedDocuments
    .map((doc) => `${doc.topic}: ${doc.content}`)
    .join("\n\n");

  console.log(context, 'Content check')
  // Generate answer
  const answer = await generateAnswer(question, context);

  console.log("\nAnswer:");
  console.log(answer);
}

main();