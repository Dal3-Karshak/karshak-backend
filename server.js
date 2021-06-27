require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// foodModule call
const foodModel = require('./models/foodschema.js')

// call routes foodRoutes
const foodRoutes = require('./routes/food.js')

// config
const app = express();
const PORT = process.env.PORT;

// middle wares 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));



// routes 
// http://localhost:5000/books/
app.use('/food',foodRoutes)

// general routes 
app.get("/", (req, res) => res.send("Welcome to the Food API Server!"));
app.all("*", (req, res) =>res.status(400).send("You've tried reaching a route that doesn't exist."));


// 🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆 CODE 🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆🎆
// seed data 
function seed() {
  const ali = new foodModel ({
        email: 'alinnnnnn@gmail.com',
        food:[
            {   
              id: 12345,
              title: "mansaf",
              image: "https://books.google.jo/books/content?id=Sm5AKLXKxHgC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE71M3zrn0BNLYYWOYJ1rwmkKcezZC6W7ewco9UlgC9QwEG6wJ0zfvBwEnJiuvcc3dHL73x1tdbXJ7XyVCgnGvNwFVpvClo66YZ6CXm-wHoyuTYx7IO2EzO_a3B-55jm-3VW76G7m",
            },

            {
              id: 12345,
              title: "mansaf",
              image: "https://books.google.jo/books/content?id=Sm5AKLXKxHgC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE71M3zrn0BNLYYWOYJ1rwmkKcezZC6W7ewco9UlgC9QwEG6wJ0zfvBwEnJiuvcc3dHL73x1tdbXJ7XyVCgnGvNwFVpvClo66YZ6CXm-wHoyuTYx7IO2EzO_a3B-55jm-3VW76G7m",
            },

            {
              id: 12345,
              title: "mansaf",
              image: "https://books.google.jo/books/content?id=Sm5AKLXKxHgC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE71M3zrn0BNLYYWOYJ1rwmkKcezZC6W7ewco9UlgC9QwEG6wJ0zfvBwEnJiuvcc3dHL73x1tdbXJ7XyVCgnGvNwFVpvClo66YZ6CXm-wHoyuTYx7IO2EzO_a3B-55jm-3VW76G7m",
            },
            {
              id: 12345,
              title: "mansaf",
              image: "https://books.google.jo/books/content?id=Sm5AKLXKxHgC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE71M3zrn0BNLYYWOYJ1rwmkKcezZC6W7ewco9UlgC9QwEG6wJ0zfvBwEnJiuvcc3dHL73x1tdbXJ7XyVCgnGvNwFVpvClo66YZ6CXm-wHoyuTYx7IO2EzO_a3B-55jm-3VW76G7m",
            }
        ]

  });
   ali.save();
}

// seed();



//connections

mongoose.connect(`${process.env.MONGO_DB}`, {useNewUrlParser: true, useUnifiedTopology: true});

app.listen(PORT, ()=>{
    console.log(`Server Up And Runs On PORT:http://localhost:${PORT}`)
})