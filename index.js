const express = require('express')
const app = express()
const morgan = require('morgan')
const PORT = process.env.PORT || 3000

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },

    {
        name: "Dan Abramov",
        number: "12-43-2343234",
        id: 2
    },

    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 3
    },

    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
    },
]

morgan.token('body', (req, res) => {return JSON.stringify(req.body)})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/', (req, res) => {
    res.send('<h1>Phonebook app</h1> <p><a href="/info">See info</a></p><p><a href="/api/persons">See persons</a></p>')
});

app.get('/info', (req, res) => {
    const message = `<p>This phonebook has info about ${persons.length} people</p> 
<p>${new Date()}</p>`
    res.send(message)
});


app.get('/api/persons', (req, res) => {
    res.json(persons)
});


app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }

});

app.post('/api/persons', (req, res) => {
    const body = req.body
    const id = Math.floor(Math.random() * 1000)
    const person = {
        name: body.name,
        number: body.number,
        id: id,
    }

    if (!body.name || !body.number) {
        res.status(403).send({error: 'Name or number cannot be missing'})

    } else if (persons.find(person => person.name === body.name)) {
        res.status(403).send({error: `${body.name} already exists in phonebook`})

    } else {
        persons = persons.concat(person);
        res.status(201).send(person)
    }
});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
});

app.listen(PORT, () => {
    console.log('Phonebook is running')
})