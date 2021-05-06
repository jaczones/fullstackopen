export function findCountry(countries, searchTerm) {
    return countries.filter(country => {
      return country.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }