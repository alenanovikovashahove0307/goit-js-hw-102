import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
// Завантажувач
const loaderElement = document.querySelector('p.loader');

// Помилка
const errorElement = document.querySelector('p.error');
const breedSelect = document.querySelector('select.breed-select');
const catInfoContainer = document.querySelector('div.cat-info');
errorElement.style.display = 'none';
breedSelect.style.display = 'none';

// Завантаження колекції порід та заповнення select.breed-select
fetchBreeds()
  .then(breeds => {
      breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    })
    
    breedSelect.style.display = 'block';
    new SlimSelect({
      select: '#breedSelect',
    });
    
  })
  .catch(error => {
    // Приховати завантажувач, показати помилку
    loaderElement.style.display = 'none';
    errorElement.style.display = 'block';
    Notiflix.Notify.info('Failed to fetch breeds:', error);
  })
  .finally(() => {
    loaderElement.style.display = 'none';
    errorElement.style.display = 'none';
    hideLoader();
  });
  function displayCatInfo(catData) {
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
};

breedSelect.addEventListener('change', event => {
  const selectedBreedId = event.target.value;

  // Показати завантажувач, приховати select та div.cat-info
  loaderElement.style.display = 'block';
  catInfoContainer.style.display = 'none';
  errorElement.style.display = 'none';
  showLoader();
  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      // Приховати завантажувач, показати div.cat-info
      loaderElement.style.display = 'none';
      catInfoContainer.style.display = 'block';
      breedSelect.style.display = 'block';
      errorElement.style.display = 'none';
      displayCatInfo(catData);
      hideLoader();
    })
    .catch(error => {
      // Приховати завантажувач, показати помилку
      errorElement.style.display = 'block';
      Notiflix.Notify.info('Failed to fetch breeds:', error);
    });
    
});
function showLoader() {
  Notiflix.Loading.standard('Searching images...');
};
function hideLoader() {
  Notiflix.Loading.remove();
}