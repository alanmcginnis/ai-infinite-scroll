const path = require('path');

class ImageData {
  getImageCollection(collectionApi) {
    return collectionApi.getFilteredByGlob([
      "public/img/**/*.{jpg,png,gif}",
      "!public/img/thumbs/**"
    ]);
  }

  getGlobalImageData() {
    return function() {
      if (!this.collections || !this.collections.images) {
        console.warn("Images collection not available");
        return [];
      }
      return this.collections.images.map(image => ({
        url: `/img/${path.basename(image.inputPath)}`,
        alt: image.data.alt || ''
      }));
    };
  }
}

module.exports = ImageData;
