const fs = require("fs");

// Initialize the file path constants
const inputFilePath = "privacy.html";
const outputFilePath = "countora.json";

// Function to safely read JSON file
function readJsonFileSync(filePath) {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    // Return an empty object if file doesn't exist or is invalid
    return {};
  }
}

// Read the current content of privacy.html
fs.readFile(inputFilePath, "utf8", (err, htmlContent) => {
  if (err) {
    console.error("Error reading privacy.html:", err);
    return;
  }

  // Read and parse countora.json (if it exists)
  const existingData = readJsonFileSync(outputFilePath);

  // Increment version or initialize it
  const newVersion = (existingData.version || 0) + 1;

  // Create the updated data object
  const newData = {
    version: newVersion,
    content: htmlContent,
  };

  // Write the updated data to countora.json
  fs.writeFile(outputFilePath, JSON.stringify(newData, null, 2), (err) => {
    if (err) {
      console.error("Error writing to countora.json:", err);
      return;
    }

    console.log(
      `Content successfully copied to countora.json with version ${newVersion}`
    );
  });
});
