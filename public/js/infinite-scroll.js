document.addEventListener('DOMContentLoaded', () => {
  const imageGallery = document.getElementById('image-gallery');
  const loadMoreButton = document.getElementById('load-more');
  let currentImageCount = imageGallery.getElementsByTagName('img').length;
  let totalImageCount;

  // Function to check if we should show the Load More button
  function checkLoadMoreVisibility() {
    if (currentImageCount >= totalImageCount) {
      loadMoreButton.style.display = 'none';
    } else {
      loadMoreButton.style.display = 'block';
    }
  }

  // Get the total image count from the server
  fetch('/api/image-count.json')
    .then(response => response.json())
    .then(data => {
      totalImageCount = data.count;
      checkLoadMoreVisibility();
    });

  loadMoreButton.addEventListener('click', loadMoreImages);

  function loadMoreImages() {
    const imagesPerPage = 12;
    const start = currentImageCount;
    const end = start + imagesPerPage;

    fetch(`/api/images.json?start=${start}&end=${end}`)
      .then(response => response.json())
      .then(images => {
        images.forEach(image => {
          const img = document.createElement('img');
          img.src = image.url;
          img.alt = image.alt;
          imageGallery.appendChild(img);
        });

        currentImageCount += images.length;
        checkLoadMoreVisibility();
      });
  }

  // Infinite scroll (if you want to keep this feature)
  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
      loadMoreImages();
    }
  });
});
