const fs = require('fs');
const path = require('path');

function getGalleryImages() {
  const imgDir = './public/img';
  const images = [];

  fs.readdirSync(imgDir).forEach(file => {
    if (file.match(/\.(jpg|jpeg|png|gif)$/i)) {
      images.push({
        filename: `/img/${file}`,
        data: {
          alt: `Image ${file}`
        }
      });
    }
  });

  return images;
}

module.exports = getGalleryImages;
