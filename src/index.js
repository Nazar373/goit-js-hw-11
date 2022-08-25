import fetchPhotos from './fetchPhotos.js'

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const load = document.querySelector('.load')
let page = 1;

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const item = e.currentTarget.elements.searchQuery.value.trim();
  fetchPhotos(item).then((data) => {
    page = 1
    if(!item){
      console.log('Sorry, there are no images matching your search query. Please try again.')
      return
    }
    createMarkup(data.hits)})
}

function createMarkup(obj) {
  // console.log(JSON.stringify(obj))
  // console.log(Object.values(obj))
  const markup = obj.reduce((acc, {webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
   return acc += `<div class="photo-card">
    <img src="${largeImageURL}" alt="${tags}" loading="lazy" width="300" height="300" />
    <div class="info">
      <a href="${webformatURL}">clickMe</a>
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
 })
  gallery.innerHTML = markup
}

load.addEventListener('click', onLoadMore)

function onLoadMore(e){
  fetchPhotos(page += 1).then(res => {
    console.log(res.hits)
    // const markup = createMarkup(res.hits)
    // gallery.insertAdjacentElement('beforeend', markup)
  })
}