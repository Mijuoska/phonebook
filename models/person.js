const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true);


const url = process.env.MONGODB_URI 
console.log('connecting to database at', url);

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(result => {
    console.log('Connected to MongoDB')
}).catch((error) => {
    console.log('Error connecting to MongoDB', error.message)
});


const personSchema = mongoose.Schema({
    name: { type: String, required: [true, "Name is required"], unique: true, minlength: [3, "Name must be at least 3 characters long"]},
    number: { type: String, required: [true, "Number is required"], minlength: [8, "Number must be at least 8 characters long"]}
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});




module.exports = mongoose.model('Person', personSchema)
