const { loadPdf } = require("./pdfLoader");
const { chunkText } = require("./chunker");
const { generateEmbedding } = require("./embeddingService");

async function ingestPdf(filePath) {
  console.log("Loading PDF...");

  const text = await loadPdf(filePath);

  console.log("Creating chunks...");

  const chunks = chunkText(text, 1000, 200);

  console.log(`Created ${chunks.length} chunks`);

  const documents = [];

  for (let i = 0; i < chunks.length; i++) {
    console.log(`Embedding chunk ${i + 1}/${chunks.length}`);

    const embedding = await generateEmbedding(chunks[i]);

    documents.push({
      id: i + 1,
      content: chunks[i],
      embedding
    });
  }

  return documents;
}

module.exports = {
  ingestPdf
};