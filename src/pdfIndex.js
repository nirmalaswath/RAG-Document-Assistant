const { ingestPdf } = require("./ingestionService");
const { generateEmbedding } = require("./embeddingService");
const { askQuestion } = require("./askQuestion")
const {
  storeDocuments,
  searchDocuments
} = require("./vectorStore");

// sudo docker run -d --name chroma -p 8000:8000 chromadb/chroma

async function main() {
  // 1. Read PDF + create embeddings
  const documents = await ingestPdf("data/PDF-Guide-Node-Andrew-Mead-v3.pdf");

  // 2. Store embeddings in Chroma
  await storeDocuments(documents);

  // 3. User question
  const question = "How to import a file?";

  // 4. Convert question to embedding
  const results = await askQuestion(question);

  // 5. Search Chroma
  // const results = await searchDocuments(
  //   questionEmbedding,
  //   3
  // );

  console.log("\nRetrieved documents:");
  console.log(results, 'results')

  // console.dir(results, { depth: null });
}

main();