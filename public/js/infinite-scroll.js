document.addEventListener('DOMContentLoaded', () => {
  const imageGallery = document.getElementById('image-gallery');
  const loadMoreButton = document.getElementById('load-more');
  let currentIndex = 12;
  const imagesPerLoad = 12;

  loadMoreButton.addEventListener('click', loadMoreImages);

  function loadMoreImages() {
    const nextImages = window.allImages.slice(currentIndex, currentIndex + imagesPerLoad);
    nextImages.forEach(image => {
      const img = document.createElement('img');
      img.src = image.url;
      img.alt = image.alt;
      imageGallery.appendChild(img);
    });

    currentIndex += imagesPerLoad;

    if (currentIndex >= window.allImages.length) {
      loadMoreButton.style.display = 'none';
    }
  }

  // Infinite scroll
  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
      loadMoreImages();
    }
  });
});