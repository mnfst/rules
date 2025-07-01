const fs = require("fs");
const path = require("path");

// Source file
const sourceFile = "src/rules.md";

// Target files
const targetFiles = [
  "copilot/copilot-instructions.md",
  "cursor/manifest.mdc",
  "windsurf/manifest.md",
];

// Function to ensure directory exists
function ensureDirectoryExists(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Function to copy content
function copyRulesContent() {
  try {
    // Read source file
    if (!fs.existsSync(sourceFile)) {
      throw new Error(`Source file ${sourceFile} does not exist`);
    }

    const content = fs.readFileSync(sourceFile, "utf8");
    console.log(`✓ Read content from ${sourceFile}`);

    // Copy to each target file
    targetFiles.forEach((targetFile) => {
      try {
        ensureDirectoryExists(targetFile);
        fs.writeFileSync(targetFile, content);
        console.log(`✓ Copied to ${targetFile}`);
      } catch (error) {
        console.error(`✗ Failed to copy to ${targetFile}:`, error.message);
      }
    });

    console.log("\n🎉 Build completed successfully!");
  } catch (error) {
    console.error("✗ Build failed:", error.message);
    process.exit(1);
  }
}

// Run the script
copyRulesContent();
