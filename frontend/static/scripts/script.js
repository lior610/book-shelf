window.addEventListener('load', function() {
    adjustBookImageSize();
});

window.addEventListener('resize', function() {
  adjustBookImageSize();
});

function adjustBookImageSize() {
  var bookImage = document.querySelector('.book-image-list');
  var viewportWidth = window.innerWidth;
  
  if (viewportWidth < 768) {
    bookImage.style.maxWidth = '200px';
    bookImage.style.maxHeight = '300px';
  } else {
    bookImage.style.maxWidth = '300px';
    bookImage.style.maxHeight = '400px';
  }
}
