import React from 'react'

const Search = ({searchTerm, e, setSearchTerm}) => {
    return (
        <>
        <h2>Phonebook</h2>
        <p>Filtered Search <input
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        />
      </p>
      </>
    )
}

export default Search
