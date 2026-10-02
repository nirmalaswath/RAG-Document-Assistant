const { ChromaClient } = require("chromadb");

const client = new ChromaClient({
  path: "http://localhost:8000"
});

async function getCollection() {
  const collection = await client.getOrCreateCollection({
    name: "rag_documents",
    embeddingFunction: null // this is to say that we'll pass the embedding on our own
  });

  return collection;
}

module.exports = {
  getCollection
};