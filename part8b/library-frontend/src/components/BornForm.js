import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import Select from 'react-select'
import { EDIT_BORN_YEAR, ALL_AUTHORS } from '../queries'


const BornForm = ({notify, allAuthors}) => {
  const [nameOptions, setNameOptions] = useState(null)
  const [setBornTo, setBornYear] = useState('')

  const [ changeBornYear, result ] = useMutation(EDIT_BORN_YEAR, {
    refetchQueries: [ 
        { query: ALL_AUTHORS } 
      ]
  })

  const options = []
  allAuthors.forEach(author => options.push(
      {
        value: author.name,
        label: author.name
    }))

  const submit = async (event) => {
    event.preventDefault()

    const name = nameOptions.value

    changeBornYear({ variables: { name, setBornTo } })
    setNameOptions('')
    setBornYear('')
  }

  useEffect(() => {    
      if (result.data && result.data.editAuthor === null) {      
          notify('Author not found')    
        }  
    }, [result.data])  // eslint-disable-line 

  return (
    <div>
      <h2>Set Birth Year</h2>

      <form onSubmit={submit}>
        <div style={{width: '200px'}}>
          <Select
            value={nameOptions}
            onChange={setNameOptions}
            options={allAuthors.map((a) => ({
              value: a.name,
              label: a.name,
            }))}
          />
        </div>
        <div>
          <br></br>
          Birth Year <input
            value={setBornTo}
            onChange={({ target }) => setBornYear(parseInt(target.value))}
          />
        </div>
        <br></br>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default BornForm