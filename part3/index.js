const express = require('express')
const app = express()
const cors = require('cors')
var morgan = require('morgan')
app.use(cors())
app.use(express.json())
app.use(express.static('build'))

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

  morgan.token('body', function (req, res) {
     return JSON.stringify(req.body) 
    })

  app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

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


const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(p => p.id))
    : 0
  const personId = Math.ceil(Math.random() + 1 * maxId)
  return personId
}

  app.post('/api/persons', (request, response) => {
    const body = request.body
    const personMatch = persons.find((p) => p.name === body.name)
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
    if (personMatch){
      return response.status(400).json({
        error: 'name already exists in phonebook'
      })
    }

    const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
    }
    persons = persons.concat(person)
    response.json(person)
  })


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})