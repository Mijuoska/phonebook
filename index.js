
require('dotenv').config()

// Express setup
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.static('build'))



// Fetching model
const Person = require('./models/person')

// Morgan setup
const morgan = require('morgan')
morgan.token('body', (req, res) => {return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


// Routes
app.get('/', (req, res) => {
    res.redirect('/info', 301)
});

app.get('/info', (req, res) => {
    const message = `<p>This phonebook has info about ${persons.length} people</p> 
<p>${new Date()}</p>`
    res.send(message)
});


// View route
app.get('/api/persons', (req, res) => {
   Person.find({}).then(people => {
     res.json(people.map(person => person.toJSON()))
   }).catch(error => {
       console.log("An error occurred: ", error.message)
   })
});


// View detail route
app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id).then(person => {
        if (person) {
        res.json(person.toJSON())
        } else {
            res.status(404).send({error: 'No such person found in the phonebook'})
        }
        }).catch(error => next(error))
           
        })
    


// Create route
app.post('/api/persons', (req, res, next) => {
    const body = req.body
            const person = new Person({
                name: body.name,
                number: body.number
              })

              person.save().then(createdPerson => createdPerson.toJSON())
              .then(formattedPerson => {
              res.status(201).send(formattedPerson)
              }).catch(error => next(error)) 

              
        });

// Update route
app.put('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndUpdate(req.params.id, { number : req.body.number },{ new: true, runValidators: true })
    .then(updatedPerson =>  updatedPerson.toJSON())
    .then(formattedPerson => {
        res.status(200).json(formattedPerson)
    }).catch(error => next(error))
})



   

// Delete route
app.delete('/api/persons/:id', (req, res) => {
   Person.findByIdAndRemove(req.params.id).then(removed => {
       res.status(204).end()
   }).catch(error => next(error))
    
})


const unknownEndpoint = (request, response) => {
    response.status(404).json({
        error: 'unknown endpoint'
    });
}


app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind == 'ObjectId') {
        return response.status(400).send({
            error: 'malformatted id'
        })
    } else if (error.name === "ValidationError") {
        return response.status(400).json({error: error.message})
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('Phonebook is running')
});