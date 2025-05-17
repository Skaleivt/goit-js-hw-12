
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import '../css/styles.css';
import image from '../img/Group.svg'

const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('#gallery span')
export const buttonLoader = document.querySelector('#gallery button')

const lightbox = new SimpleLightbox('#gallery ul li a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
  disableScroll: true,
  enableKeyboard: true,
  nav: true,
  closeText:	'×',	
  swipeClose: true,
  enableKeyboard: true,                        
});
  
export function createGallery(images) {
  const markup = images
    .map(({ previewURL, largeImageURL, tags, comments, downloads, likes, views }) =>
      `<li class="gallery-link"><a class="gallery-item" href="${largeImageURL}">
    <img class="gallery-image" src="${previewURL}" alt="${tags}"/></a>
    <div class="info">
          <div class="info-list">
            <h4 class="info-title">Likes</h4>
            <p class="info-text">${likes}</p>
          </div>
          <div class="info-list">
            <h4 class="info-title">Views</h4>
            <p class="info-text">${views}</p>
          </div>
          <div class="info-list">
            <h4 class="info-title">Comments</h4>
            <p class="info-text">${comments}</p>
          </div>
          <div class="info-list">
            <h4 class="info-title">Downloads</h4>
            <p class="info-text">${downloads}</p>
          </div>
        </div></li> `)
    .join("");
    
  galleryContainer.insertAdjacentHTML("beforeend", markup)
  
    lightbox.refresh();
};

export function clearGallery() {
  galleryContainer.innerHTML = ' ';
};

export function showLoader() {
  loader.classList.remove('hidden');
};

export function hideLoader() {
    loader.classList.add('hidden');
}

export function showLoadMoreButton() {
    buttonLoader.classList.remove('hidden');
}
  
export function hideLoadMoreButton() {
    buttonLoader.classList.add('hidden');
}

export function scrollByCardHeight() {
    const card = document.querySelector('.gallery-link')
    const height = card.getBoundingClientRect().height;
    window.scrollBy({
    top: height * 2,
    left: 0,
    behavior: 'smooth'
  });
}

export const optionIzi = {
    position: "topRight",
    messageColor: '#fff',
    messageSize: '16px',
    iconUrl: image,
    backgroundColor: " #EF4040",
    iconColor: '#fff'
}
