const pdfParse = require("pdf-parse");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const chunks = [];

    for await (const chunk of req) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);

    if (!buffer.length) {
      return res.status(400).json({
        error: "No PDF data was received."
      });
    }

    const pdfData = await pdfParse(buffer);
    const text = pdfData.text || "";

    if (!text.trim()) {
      return res.status(400).json({
        error:
          "We couldn't find readable text in that PDF. Scanned-image OCR will be added later."
      });
    }

    return res.status(200).json({
      success: true,
      message: "PDF text extracted successfully.",
      characterCount: text.length,
      textPreview: text.slice(0, 1500)
    });
  } catch (error) {
    console.error("PDF analysis error:", error);

    return res.status(500).json({
      error: "Something went wrong while reading the PDF."
    });
  }
};
