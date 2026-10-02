const fs = require("fs/promises");
// Destructure the PDFParse class from the library
const { chunkText } = require("../src/chunker.js") 
const { PDFParse } = require("pdf-parse"); 

async function loadPdf(filePath) {
  const buffer = await fs.readFile(filePath);

  // Instantiate the new PDFParse constructor instance
  const parser = new PDFParse({ data: buffer });
  const data = await parser.getText();

  // Grab just the first 100 characters using substring
  return data.text;
}

// Await the response inside an async block so it doesn't log pending Promises
// (async () => {
//   try {
//     let pdfTest = await loadPdf('data/PDF-Guide-Node-Andrew-Mead-v3.pdf');
//     let chunkDetails = chunkText(pdfTest)

//     // console.log(pdfTest.substring(40000, 60000));
//     console.log(chunkDetails, 'chunk')
//   } catch (error) {
//     console.error("Error reading PDF:", error);
//   }
// })();

module.exports = {
  loadPdf
};
