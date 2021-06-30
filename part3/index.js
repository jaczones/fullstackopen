const express = require('express')
const app = express()

app.use(express.json())

let date = new Date().toLocaleString('en-US')
let persons =  [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Zac Jones",
      "number": "8888888",
      "id": 2
    },
    {
      "name": "Zac",
      "number": "4574574",
      "id": 3
    }
  ]
let count = persons.length

const info = {
  message: `Phonebook has info for ${count} people.`,
  date : date
}

  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  app.get('/info', (request, response) => {
    response.send(`
    <div>
    <p>${info.message}</p>
    <p>${info.date}</p>
    </div>`)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(note => note.id === id)  
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

/*   app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)  
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
  }
  
  app.post('/api/notes', (request, response) => {
    const body = request.body
  
    if (!body.content) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const note = {
      content: body.content,
      important: body.important || false,
      date: new Date(),
      id: generateId(),
    }
  
    notes = notes.concat(note)
  
    response.json(note)
  })

app.delete('api/notes/:id', (request, resopnse) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
}) */

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})