import './css/styles.css';
import Notiflix from 'notiflix';
// import API from './fetchCountries.js';
import { fetchCountries } from './fetchCountries.js';
import { countryCard } from './countryCard';
import { countryCardList } from './countryList';
import _debounce from 'lodash.debounce';
import getRefs from './get-refs.js';
const DEBOUNCE_DELAY = 300;

const refs = getRefs();

// const r = fetch(
//   'https://restcountries.com/v3.1/name/en?fields=name,capital,flags,population,languages'
// );
// console.log(r);
refs.inputEl.addEventListener(
  'input',
  _debounce(onInputCounry, DEBOUNCE_DELAY)
);

function onInputCounry(e) {
  e.preventDefault();
  const form = e.target;
  const searchEl = form.value.trim();
  console.log(searchEl);
  if (!searchEl) {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    return;
  }
  fetchCountries(searchEl)
    .then(onRenderCountry)
    .catch(error => {
      onError(error);
    });
  console.log(onRenderCountry);
}

function onError() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function onRenderCountry(countries) {
  console.log(countries.length);

  if (countries.length > 10) {
    return Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  if (countries.length < 10 || countries.length > 2) {
    const markup = countries
      .map(country => {
        return `<li class="country-item">
     <img src="${country.flags.svg}" alt="${country.name.official}" width="50"></img>
     <p class="country-title">${country.name.official}</p>
   </li>`;
      })
      .join('');
    refs.countryList.innerHTML = markup;
    console.log(markup);
  }
  if (countries.length === 1) {
    // countryCard
    const markupCard = countries.map(country => {
      return `
     <div class='country'>
        <div class ='country-flag'>

          <img src="${country.flags.svg}" alt="${
        country.name.official
      }" width="50"></img>
        <h1 class="card-title">${country.name.official}</h1>
        </div>
        <div class='country-deskr'>
      <p class='card-text'>Capital:${country.capital}</p>
      <p class='card-text'>Population:${country.population}</p>
      <p class='card-text'>Languages:${Object.values(country.languages)}</p>
      </div>
      </div>`;
    });
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = markupCard;
  }
}

function countryCard(country) {
  // console.log(Object.values(country.languages));
  // console.log(country.capital);
  // console.log(country.population);
  return `
  <div class='country'>
  <div class ='country-flag'>

    <img src="${country.flags.svg}" alt="${
    country.name.official
  }" width="50"></img>
  <h1 class="card-title">${country.name.official}</h1>
  </div>
  <div class='country-deskr'>
<p class='card-text'>Capital:${country.capital}</p>
<p class='card-text'>Population:${country.population}</p>
<p class='card-text'>Languages:${Object.values(country.languages)}</p>
</div>
</div>`;
}

// ('Too many matches found. Please enter a more specific name.'); // >10
