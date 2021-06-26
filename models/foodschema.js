const mongoose = require('mongoose')


// make collections
// 1- make schema (or structure for the data)
// 2- make models from the schema 
// 3- seeding data to be able to see the database inside the treminal 
const foodSchema = new mongoose.Schema({
    id: Number,
    title: String,
    image: String,
});

const user = new mongoose.Schema({
  email: String,
  food:[foodSchema]
});


const foodModel= mongoose.model('dale3karshak', user);



module.exports = foodModel;


