const { default: axios } = require("axios");

const foodFunctions = {};

// http://localhost:8000/food/getfood?foodName=<name>&cuision=<cuision>
foodFunctions.getFood = (req,res) => {

    const KEY = process.env.FOOD_KEY;
     let foodName = req.query.foodName;
     let cuisine = req.query.cuisine;
    console.log(req.query);
    console.log()
     let Url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${KEY}&query=${foodName}&number=${12}&cuisine=${cuisine}`;

    axios.get(Url)
    .then(result =>{
        console.log(result.data)
        res.status(200).send(result.data)
    }).catch(err =>{
        res.status(404).send("Bad Request" , err)
    })
}

// http://localhost:8000/food/getFoodInfo?id=665769
// https://api.spoonacular.com/recipes/716429/information?includeNutrition=false&apiKey=a81fe7f6865f4b5c9cd7b656b37d12f1
foodFunctions.getFoodInfo = (req,res) => {

    const KEY = process.env.FOOD_KEY;
     let id = req.query.id;
     let Url = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${KEY}`;

    axios.get(Url)
    .then(result =>{
        console.log(result.data)
        res.status(200).send(result.data)
    }).catch(err =>{
        res.status(400).send("Bad Request" , err)
    })
}



module.exports = foodFunctions;