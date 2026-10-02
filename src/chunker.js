function chunkText(text, chunkSize = 4000, overlap = 300) {
    const chunks = [];
  
    let start = 0;
  
    // while (start < text.length) {
      while (start < 30000) {
      console.log(text.length, 'length',start)
      const end = start + chunkSize;
  
      const chunk = text.slice(start, end).trim();
  
      if (chunk) {
        chunks.push(chunk);
      }
  
      start += chunkSize - overlap;
    }
  
    return chunks;
  }
  
  module.exports = {
    chunkText
  };