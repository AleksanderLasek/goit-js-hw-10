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
    fetchCountries($search.value);
  }),
  300,
);

export function renderCountryList(countries) {
  if (countries.length === 1) {
    const markup = countries
      .map(countries => {
        return `<li>
          <img src="${countries.flags.svg}"/>
          <p><b>Name</b>: ${countries.name.official}</p>
          </li>`;
      })
      .join('');
    $countryList.innerHTML = markup;

    const SpecMarkup = countries
      .map(countries => {
        return `<p><b>Capital:</b> ${countries.capital}</p>
           <p><b>Population:</b> ${countries.population}</p>
           <p><b>Languages:</b> ${Object.values(countries.languages)
             .toString()
             .replace(',', ', ')}</p>
          `;
      })
      .join('');
    $countryInfo.innerHTML = SpecMarkup;

    console.log('Jest tylko 1 kraj');
    Notiflix.Notify.success('Jest tylko 1 kraj');
  } else {
    const markup = countries
      .map(countries => {
        return `<li>
          <img src="${countries.flags.svg}"/>
          <p><b>Name</b>: ${countries.name.official}</p>
          </li>`;
      })
      .join('');
    $countryList.innerHTML = markup;
  }
}
