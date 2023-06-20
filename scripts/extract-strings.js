#!/usr/bin/env node

const fg = require('fast-glob');
const fs = require('fs-extra');
const matter = require('gray-matter');

// Define the pattern to match Markdown files
const filesPattern = 'src/**/*.{en.md,tsx}';

// Extract strings from files
const extractStrings = async () => {
  const regex =  /"(?!(?:class|id|src|slot|variant)\b)(?!import\s)(?!.*,.*")(?!.\b)(?!".*")(?!\s)(.*?)"/g;
  const extractedStrings = new Set();

  // Find files matching the pattern
  const files = await fg(filesPattern);

  // Extract strings from each file
  files.forEach((file) => {
    const fileContent = fs.readFileSync(file, 'utf8');
    const { content } = matter(fileContent); // Extract the content of the Markdown file using gray-matter
    const matches = content.match(regex);
    if (matches) {
      matches.forEach((match) => {
        const extractedString = match.slice(1, -1); // Remove the surrounding double quotes
        if (extractedString.trim().length > 0) { // Exclude empty strings
          extractedStrings.add(extractedString);
        }
      });
    }
  });

  return extractedStrings;
};

// Generate the default English JSON file
const generateDefaultEnglishJSON = (strings) => {
  const translations = {};
  strings.forEach((string) => {
    translations[string] = string; // Default translation is the same as the string itself
  });

  // Write the translations to the file
  fs.outputFileSync('src/locales/en.json', JSON.stringify(translations, null, 2));

  console.log('Default English JSON file generated successfully.');
};

// Execute the extraction and generation
(async () => {
  const strings = await extractStrings();
  generateDefaultEnglishJSON(strings);
})();
