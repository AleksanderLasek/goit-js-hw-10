import './css/styles.css';
const _ = require('lodash');

const DEBOUNCE_DELAY = 300;

const $search = document.querySelector('input#search-box');
const $countryList = document.querySelector('.country-list');
const $countryInfo = document.querySelector('.country-info');

const inputEvent = $search.addEventListener(
  'input',
  _.debounce(event => {
    fetchCountries($search.value);
  }),
  3000,
);

function fetchCountries(name) {
  fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`,
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data.length > 10) {
        console.log('Too many matches found. Please enter a more specific name.');
      } else {
        renderCountryList(data);
      }
    })
    .catch(error => {
      console.log(error);
      console.log('Nie ma takiego kraju');
    });
}

function renderCountryList(countries) {
  console.log(countries);

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
        console.log(Object.values(countries.languages).toString().replace(',', ', '));
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
