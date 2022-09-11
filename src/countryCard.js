export default function countryCard(country) {
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
