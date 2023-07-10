import axios from 'axios';
import Notiflix from 'notiflix';
axios.defaults.headers.common['x-api-key'] =
  'live_3DU0HxAKeUWlSlfcOosTj6D8mQ6FrmyjxFlajYL9WXY62yk84N5zW0o7K39AfWf2';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
      .catch(error => {
      Notiflix.Notify.info('Error fetching breeds:', error);
    });
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  return axios
    .get(url)
    .then(response => response.data)
    .catch(error => {
      Notiflix.Notify.info('Error fetching cat by breed:', error);
    });
}

