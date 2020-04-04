// const mongoose = require('mongoose')



// if(process.argv.length < 3) {
//     console.log('please enter a password')
//     process.exit(1)
// }

// const password = process.argv[2]
// const name = process.argv[3]
// const number = process.argv[4]

// const url = `mongodb+srv://mijuoska:${password}@cluster0-w2yyf.mongodb.net/phonebook?retryWrites=true`

// mongoose.connect(url, {useNewUrlParser: true, useUnifiedTypology: true})



// const personSchema = mongoose.Schema({
//     name: String,
//     number: String,
// })


// const Person = mongoose.model('Person', personSchema)

// if (!process.argv.length > 3) {


// const person = new Person({
//     name: name,
//     number: number
// })

// person.save().then(result => {
//     console.log(`Added ${result.name} ${result.number} to phonebook`)
//     mongoose.connection.close()
// })

// } else {
//     Person.find({}).then(persons => {
//         console.log("Phonebook")
//         persons.map(person => console.log(person.name, person.number))
//          mongoose.connection.close()

//     });
// }