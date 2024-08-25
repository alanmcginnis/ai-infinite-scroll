document.addEventListener('DOMContentLoaded', () => {
  const imageContainer = document.getElementById('image-container');
  const loadingElement = document.getElementById('loading');
  let currentPage = 1;
  const imagesPerPage = 12;
  let isLoading = false;

  function loadMoreImages() {
    if (isLoading) return;
    if (imageContainer.children.length >= window.totalImages) {
      loadingElement.style.display = 'none';
      return;
    }

    isLoading = true;
    loadingElement.style.display = 'block';

    const start = imageContainer.children.length;
    const end = start + imagesPerPage;

    fetch(`/api/images.json?start=${start}&end=${end}`)
      .then(response => response.json())
      .then(images => {
        images.forEach(image => {
          const img = document.createElement('img');
          img.src = image.url;
          img.alt = image.alt;
          imageContainer.appendChild(img);
        });

        isLoading = false;
        loadingElement.style.display = 'none';
      });
  }

  // Infinite scroll
  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
      loadMoreImages();
    }
  });
});
