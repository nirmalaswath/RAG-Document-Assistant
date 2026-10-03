const {evaluationQuestions} = require("./evaluationQuestions")
const { ingestPdf } = require("./ingestionService");
const { generateEmbedding } = require("./embeddingService");
const { askQuestion } = require("./askQuestion")
const { retrieveDocuments } = require("./ragService");
const {
  storeDocuments,
  searchDocuments
} = require("./vectorStore");
function calculateHit(retrievedDocuments, expectedTopic) {
    if (!expectedTopic) {
      return retrievedDocuments.length === 0 ? 1 : 0;
    }
  console.log('Inns')
    return retrievedDocuments.some((doc) =>
      {
        console.log(doc, 'doc',expectedTopic)
        return doc.content.toLowerCase().includes(expectedTopic.toLowerCase())
    }
    )
      ? 1
      : 0;
  }

let RAGTest = async () => {
      // 1. Read PDF + create embeddings
    const documents = await ingestPdf("data/PDF-Guide-Node-Andrew-Mead-v3.pdf");

    // 2. Store embeddings in Chroma
    await storeDocuments(documents);

    evaluationQuestions.map(async (item, index) => {
        const results = await retrieveDocuments(item.question, 3);
        // console.log(results, 'result')
        const hitValue = calculateHit(results, item.expectedTopic)
        console.log(hitValue, 'hitvalue')
    })
    return 'DONE'
}
const finalOutput = RAGTest()
console.log(finalOutput, 'FInal Out')