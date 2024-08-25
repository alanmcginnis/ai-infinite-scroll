const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Directory containing the images
const inputDir = '.';
// Directory to save resized images (same as input directory)
const outputDir = '../';
// Directory to save thumbnails
const thumbsDir = path.join(outputDir, 'thumbs');

// Create thumbs directory if it doesn't exist
if (!fs.existsSync(thumbsDir)) {
    fs.mkdirSync(thumbsDir, { recursive: true });
}

// Function to resize image
async function resizeImage(inputPath, outputPath, width) {
    try {
        await sharp(inputPath)
            .resize({ width: width, withoutEnlargement: true })
            .toFile(outputPath);
        console.log(`Resized: ${outputPath}`);
    } catch (error) {
        console.error(`Error resizing ${inputPath}:`, error);
    }
}

// Read all files in the input directory
fs.readdir(inputDir, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    files.forEach(file => {
        if (file.match(/\.(jpg|jpeg|png|gif)$/i)) {
            const inputPath = path.join(inputDir, file);
            const outputPath = path.join(outputDir, `resized_${file}`);
            const thumbPath = path.join(thumbsDir, `thumb_${file}`);

            // Resize to 700px width
            resizeImage(inputPath, outputPath, 700);

            // Create thumbnail (400px width)
            resizeImage(inputPath, thumbPath, 400);
        }
    });
});
