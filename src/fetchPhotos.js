const axios = require('axios');

const base = 'https://pixabay.com/api/';
const key = '29429683-7d5809707a43a8cff1be91c83';

export default async function fetchPhotos(value, page = 1) {
  return await axios(`${base}?key=${key}&q=${value}&image_type=photo&orientation=horisontal&safesearch=true&page=${page}&per_page=40`)
  // .then(res => res.json())
  // return resp.json()
  
}
