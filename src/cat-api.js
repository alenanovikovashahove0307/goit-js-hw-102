import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_3DU0HxAKeUWlSlfcOosTj6D8mQ6FrmyjxFlajYL9WXY62yk84N5zW0o7K39AfWf2';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching breeds:', error);
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  return axios
    .get(url)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching cat by breed:', error);
      throw error;
    });
}

export function displayCatInfo(catData) {
  const catInfoContainer = document.querySelector('div.cat-info');
  catInfoContainer.innerHTML = '';

  const image = document.createElement('img');
  image.src = catData[0].url;
  catInfoContainer.appendChild(image);

  const breedName = document.createElement('h3');
  breedName.textContent = catData[0].breeds[0].name;
  catInfoContainer.appendChild(breedName);

  const description = document.createElement('p');
  description.textContent = catData[0].breeds[0].description;
  catInfoContainer.appendChild(description);

  const temperament = document.createElement('p');
  temperament.textContent = `Temperament: ${catData[0].breeds[0].temperament}`;
  catInfoContainer.appendChild(temperament);
}
