export function findPerson(persons, searchTerm) {
  return persons.filter(person => {
    return person.name.toLowerCase().includes(searchTerm.toLowerCase());
  });
}
