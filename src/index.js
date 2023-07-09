import { fetchBreeds, fetchCatByBreed, displayCatInfo } from './cat-api.js';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
// Завантажувач
const loaderElement = document.querySelector('p.loader');

// Помилка
const errorElement = document.querySelector('p.error');
const breedSelect = document.querySelector('select.breed-select');
const catInfoContainer = document.querySelector('div.cat-info');
const errorNotification = Notiflix.Notify.failure(errorElement.textContent);
errorElement.style.display = 'none';
breedSelect.style.display = 'none';
new SlimSelect({
  select: '#breedSelect',
});
// Завантаження колекції порід та заповнення select.breed-select
fetchBreeds()
  .then(breeds => {
      breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
    
    breedSelect.style.display = 'block';
    // Прослуховування події зміни вибраної породи
    breedSelect.addEventListener('change', event => {
      const selectedBreedId = event.target.value;

      // Показати завантажувач, приховати select та div.cat-info
      loaderElement.style.display = 'block';
      breedSelect.style.display = 'none';
      catInfoContainer.style.display = 'none';

      fetchCatByBreed(selectedBreedId)
        .then(catData => {
          // Приховати завантажувач, показати div.cat-info
          loaderElement.style.display = 'none';
          catInfoContainer.style.display = 'block';

          displayCatInfo(catData);
        })
        .catch(error => {
          // Приховати завантажувач, показати помилку
          loaderElement.style.display = 'none';
          errorElement.style.display = 'block';

          console.error('Failed to fetch cat by breed:', error);
        });
    });
  })
  .catch(error => {
    // Приховати завантажувач, показати помилку
    loaderElement.style.display = 'none';
    errorElement.style.display = 'block';
    errorNotification.show();
    console.error('Failed to fetch breeds:', error);
  })
  .finally(() => {
    loaderElement.style.display = 'none';
  });

breedSelect.addEventListener('change', event => {
  const selectedBreedId = event.target.value;

  // Показати завантажувач, приховати select та div.cat-info
  loaderElement.style.display = 'block';
  breedSelect.style.display = 'none';
  catInfoContainer.style.display = 'none';

  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      // Приховати завантажувач, показати div.cat-info
      loaderElement.style.display = 'none';
      catInfoContainer.style.display = 'block';

      displayCatInfo(catData);
    })
    .catch(error => {
      // Приховати завантажувач, показати помилку
      
      errorElement.style.display = 'block';
      errorNotification.show();
      console.error('Failed to fetch cat by breed:', error);
    })
});