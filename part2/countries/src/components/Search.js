import React from 'react'

const Search = ({searchTerm, e, setSearchTerm}) => {
    return (
        <>
        <p>Find countries <input
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        />
      </p>
      </>
    )
}

export default Search
