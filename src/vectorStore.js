const { getCollection } = require("./chromaService");

async function storeDocuments(documents) {
  const collection = await getCollection();

  await collection.upsert({
    ids: documents.map((doc) => String(doc.id)),

    documents: documents.map((doc) => doc.content),

    embeddings: documents.map((doc) => doc.embedding),

    metadatas: documents.map((doc) => ({
      source: "Node-Guide.pdf",
      chunkId: doc.id,
      topic: doc.topic || 'general'
    }))
  });

  console.log(`Stored ${documents.length} documents in Chroma`);
}

async function searchDocuments(queryEmbedding, topK = 3) {
    const collection = await getCollection();
  
    const results = await collection.query({
      queryEmbeddings: [queryEmbedding],
      nResults: topK,
      where: {
        source: "Node-Guide.pdf"
      }
    });
  
    return results;
}

module.exports = {
  storeDocuments,
  searchDocuments
};