import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_OOv0uqabzU7ux8cTbHv1uReVyAhIWuLgImeHIZmTXXi6ckDtaK6ae2SMobP6d6qW';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

function fetchBreeds() {
  
  return axios.get(`/breeds`).then(response => {
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return response.data;
  });
}

function fetchCatByBreed(breedId) {
  const END_POINT = '/images/search';

  return axios
    .get(`/images/search?breed_ids=${breedId}`)
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response.data;
    })
    .then(data => {
      if (data.length === 0) {
        throw new Error('No cat found for the selected breed');
      }
      return data[0];
    });
}

export { fetchBreeds, fetchCatByBreed };