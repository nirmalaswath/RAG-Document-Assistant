let extractor;

async function getExtractor(){
    if (!extractor){
        const { pipeline } = await import("@huggingface/transformers")
        
        extractor = await pipeline(
            "feature-extraction",
            "onnx-community/all-MiniLM-L6-v2-ONNX"
        )
    }

    return extractor
}


async function generateEmbedding(text){
    const model = await getExtractor();

    const output = await model(text, {
        pooling: "mean",
        normalize: true
    })

    return Array.from(output.data)
}


module.exports = {
    generateEmbedding
  };