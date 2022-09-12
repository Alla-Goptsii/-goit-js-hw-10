function countriesList(countries) {
  return countries.map(country => {
    return `<li class="country-item">
     <img src="${country.flags.svg}" alt="${country.name.official}" width="50"></img>
     <p class="country-title">${country.name.official}</p>
   </li>`;
  });
}

export { countriesList };
