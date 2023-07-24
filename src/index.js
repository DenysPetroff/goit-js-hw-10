import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select'
import Notiflix from 'notiflix';
import 'slim-select/dist/slimselect.css';

const selectors = {
  selectBreed: document.querySelector('.breed-select'),
  loaderText: document.querySelector('.loader'),
  errorText: document.querySelector('.error'),
  catContainerInfo: document.querySelector('.cat-info'),
};

hideError();
hideLoader();

fetchBreeds()
    .then(data => {
        const breedsCatsForSelect = data.map(breed => `<option value="${breed.id}">${breed.name}</option>`).join('');
        selectors.selectBreed.insertAdjacentHTML('beforeend', breedsCatsForSelect);
      
        
        
    new SlimSelect({
      select: '.breed-select',
    });
  })
  .catch(() => {
    showError();
    hideLoader();
  });


selectors.selectBreed.addEventListener('change', handlerCatSelect);

function handlerCatSelect() { 
     showLoader();
     const selectedBreedID = selectors.selectBreed.value;
    // console.log(selectedBreedID);
  fetchCatByBreed(selectedBreedID).then(cat => {
    hideLoader();
    // console.log(cat);
    catInfoMarkup(cat)
  }).catch(() => {
    selectors.catContainerInfo.innerHTML = '';
    hideLoader();
    showError(); }
    )
   
}

function catInfoMarkup(cat) { 
  const catMarkup = `<img src="${cat.url}" width="300" alt="Cat Image">
   <div class="cat-info-container">
    <h2 class="breed">${cat.breeds[0].name}</h2>
    <p class="descr">${cat.breeds[0].description}</p>
    <h3 class="temperament" >Temperament: ${cat.breeds[0].temperament}</h3>
    </div>`;

  selectors.catContainerInfo.innerHTML = catMarkup;
}




// console.dir(selectors.loaderText);
function hideLoader() {
  selectors.loaderText.style.display = 'none';
}

function showLoader() {
  selectors.loaderText.style.display = 'block';
  hideError();
}

function hideError() {
  selectors.errorText.style.display = 'none';
}

function showError() {
  Notiflix.Notify.failure(selectors.errorText.textContent);
}