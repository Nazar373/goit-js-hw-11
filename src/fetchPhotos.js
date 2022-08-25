const base = 'https://pixabay.com/api/';
const key = '29429683-7d5809707a43a8cff1be91c83';
// const options = {
//   headers: {
//     authorization: key
//   }
// }
// https://pixabay.com/api/?key=29429683-7d5809707a43a8cff1be91c83&q=yellow+flowers&image_type=photo
export default function fetchPhotos(value, page = 1) {
  return fetch(`${base}?key=${key}&q=${value}&image_type=photo&orientation=horisontal&safesearch=true&page=${page}&per_page=5`)
  .then(res => res.json())
}
