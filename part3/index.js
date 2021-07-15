require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
var morgan = require('morgan')
app.use(cors())
app.use(express.json())
app.use(express.static('build'))
const Person = require('./models/person')
const mongoose = require('mongoose')

const date = new Date().toLocaleString('en-US')

morgan.token('body', function (req, res) {
    return JSON.stringify(req.body) 
  })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (request, response) => {
    Person.find({}).then((people) => {
    response.json(people)
  })
})

app.get('/info', async (request, response) => {
  const count = await Person.estimatedDocumentCount({})
  const info = `
  <p>Phonebook has info for ${count} people</p>
  <p>${new Date()}</p>
  `
  response.send(info)
})

app.get('/api/persons/:id', async (request, response) => {
  try {
    const person = await Person.findById(request.params.id)
    if (!person) {
      return response.status(404).end()
    }
    response.json(person)
  } catch (error) {
    return(error)
  }
})

app.delete('/api/persons/:id', async (request, response) => {
  try {
    const checkPerson = await Person.findById(request.params.id)
    if (!checkPerson) {
      return response.status.apply(400).json({
        error: "There is no person correlated with this ID"
      })
    }
    await Person.findByIdAndRemove(request.params.id)
    response.json({ success: true})
  } catch (error) {
    return (error)
  }
})


const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(p => p.id))
    : 0
  const personId = Math.ceil(Math.random() + 1 * maxId)
  return personId
}

app.post('/api/persons', async (request, response) => {
  const { name,number } = request.body
  if (!name || !number) {
    return response.status(400).json({ 
      error: 'Name or Number missing' 
    })
   }

const person = {
  name,
  number
}
const addPerson = await new Person(person)
try {
  await addPerson.save()
  response.json(addPerson)
} catch (error) {
  return (error)
}
})

app.put('/api/persons/:id', async (request, response) => {
  try {
    const { name, number } = request.body
    const person = {
      name,
      number
    }
    const updateEntry = await Person.findByIdAndUpdate(request.params.id, person, {
      new: true
    })
    response.json(updateEntry)
  } catch (error) {
    return(error)
  }
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})