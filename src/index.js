import fetchPhotos from './fetchPhotos.js';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');
const options = {
  root: null,
  rootMargin: '300px',
  threshold: 1
}
// const observer = new IntersectionObserver(onUpdate, options);
let page = 1;
let query = '';
let perPage = 40;
let totalHits = 0;

form.addEventListener('submit', onSubmit);
gallery.addEventListener('click', onClickImg);

function onSubmit(e) {
  e.preventDefault();
  gallery.innerHTML = '';
  loadMore.classList.add('is-hidden');
  query = e.currentTarget.elements.searchQuery.value.trim();
  fetchPhotos(query).then((respData) => {
    // console.log(respData)
    page = 1
    if(!query || !respData.data.hits.length){
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      return
    }
    if(respData.data.totalHits > perPage) {
      loadMore.classList.remove('is-hidden')
    }
    Notiflix.Notify.success(`Hooray! We found ${respData.data.totalHits} images.`)
    gallery.innerHTML = createMarkup(respData.data.hits)})
    // observer.observe(loadMore)
    // .catch(err => console.log(err))
    // .finally(gallery.innerHTML = '');
}

function createMarkup(obj) {
  // console.log(obj)
  return obj.reduce((acc,{webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
   return acc += `<div class="photo-card">
    <a href="${largeImageURL}">
    <img src="${webformatURL}" loading="lazy" alt="${tags}"/>
    </a>
    <div class="info">
      <p class="info-item">
        <b>Likes ${likes}</b>
      </p>
      <p class="info-item">
        <b>Views ${views}</b>
      </p>
      <p class="info-item">
        <b>Comments ${comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads ${downloads}</b>
      </p>
    </div>
  </div>`
 }, '')
//  .join('')
  // gallery.insertAdjacentHTML('beforeend', markup)
}

loadMore.addEventListener('click', onLoadMore)

function onLoadMore(e){
  page += 1
  // console.log(totalHits)
  fetchPhotos(query, page).then(res => {
    // console.log(res.hits)
    totalHits = res.data.hits.length
    // console.log(totalHits)
    if (totalHits < 40){
      loadMore.classList.add('is-hidden');
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
      return
    }
    gallery.insertAdjacentHTML('beforeend', createMarkup(res.data.hits))
  })
}

function onClickImg(e) {
  e.preventDefault();
  // console.log(e)
  let lightbox = new SimpleLightbox(".gallery a", {captionDelay: 250, captionsData: 'alt' });
  lightbox.refresh();
}

// function onUpdate(entries) {
//   entries.forEach(entry => {
//     if(entry.isIntersecting){
//       fetchPhotos(page += 1).then((data) => {
//         if(totalHits === 0 || totalHits < 0) {
//           loadMore.classList.add('is-hidden');
//           Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
//           return
//         }
//         totalHits = data.data.hits.length
//         console.log(totalHits)
//         if (totalHits < 40){
//           loadMore.classList.add('is-hidden');
//           Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
//           return
//         }
//         console.log(data.data.totalHits)
//         gallery.insertAdjacentHTML('beforeend', createMarkup(data.data.hits))
//         console.log(page)
//     })
//   }});
// }