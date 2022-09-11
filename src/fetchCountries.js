const BASE_URL = 'https://restcountries.com/v3.1/name/';

// fetch('https://restcountries.com/v3.1/name');
function fetchCountries(name) {
  if (!name) return;
  const queryParams = `/${name}?fields=name,capital,flags,population,languages`;
  const url = BASE_URL + queryParams;

  return fetch(url).then(response => {
    if (!response.ok) {
      return Promise.reject(new Error());
    }

    return response.json();
  });
}

export { fetchCountries };
