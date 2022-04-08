import './css/styles.css';
const _ = require('lodash');
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const $search = document.querySelector('input#search-box');
const $countryList = document.querySelector('.country-list');
const $countryInfo = document.querySelector('.country-info');

const inputEvent = $search.addEventListener(
  'input',
  _.debounce(event => {
    $search.value = $search.value.trim();
    if ($search.value !== '') fetchCountries($search.value);
  }),
  300,
);

const inputEventClear = $search.addEventListener(
  'input',
  _.debounce(event => {
    $search.value = $search.value.trim();
    if ($search.value === '') {
      clearElement($countryInfo);
      clearElement($countryList);
    }
  }),
  300,
);

export function clearElement(element) {
  element.innerHTML = '';
}

export function renderCountryList(countries) {
  if (countries.length === 1) {
    const markup = countries //class="one-country"
      .map(countries => {
        return `<li class="one-country">
          <img src="${countries.flags.svg}" class="one-country"/>
          <p class="one-country">${countries.name.official}</p>
          </li>`;
      })
      .join('');
    $countryList.innerHTML = markup;

    const SpecMarkup = countries
      .map(countries => {
        return `<p class="one-country"><b>Capital:</b> ${countries.capital}</p>
           <p class="one-country"><b>Population:</b> ${countries.population}</p>
           <p class="one-country"><b>Languages:</b> ${Object.values(countries.languages)
             .toString()
             .replace(',', ', ')}</p>
          `;
      })
      .join('');
    $countryInfo.innerHTML = SpecMarkup;
  } else {
    const markup = countries //class="many-countries"
      .map(countries => {
        return `<li class="many-countries">
          <img src="${countries.flags.svg}" class="many-countries"/>
          <p class="many-countries">${countries.name.official}</p>
          </li>`;
      })
      .join('');
    $countryList.innerHTML = markup;
  }
}
