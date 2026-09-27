const { loadPdf } = require("./pdfLoader");

async function main() {
  const text = await loadPdf("data/PDF-Guide-Node-Andrew-Mead-v3.pdf");

  console.log("Extracted characters:", text.length);
  console.log("\nFirst 2000 characters:\n");
  console.log(text.slice(0, 2000));
}

main();