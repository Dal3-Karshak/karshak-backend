const { default: axios } = require("axios");

const foodFunctions = {};
const foodModel = require('../../models/foodschema.js')
console.log(foodModel);

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
//get all dishes for user by email
//http:localhost:8000/food/getFoodDishes?email=saadoundhirat93@gmail.com
foodFunctions.getFoodDishes = (req,res) => {
    let {email} = req.query;
    console.log(foodModel);

    foodModel.find({email:email} , (error,userData) =>{
        console.log(userData[0].food);
        if (error){
            res.status(400).send('Bad Request TRY AGAIN');
        }
        else{
            res.status(200).send(userData[0].food);
        }
    })
}


//get all dishes for user by email
//http:localhost:8000/food/addFoodDishes?email=saadoundhirat93@gmail.com , foodObject

//i will get email and food object
foodFunctions.addFoodDishes = (req,res) => {
    let {email} = req.query;
    let {title , image , id} =req.body;
    foodModel.find({email:email} , (error,userData) =>{
        if (error){
            res.status(400).send('Bad Request TRY AGAIN');
        }
        else{
            userData[0].food.push({
                id:id,
                title:title,
                image:image,
            });
            userData[0].save();
            res.status(200).send(userData[0].food);
        }
    })
}

foodFunctions.deleteFoodDishes = (req,res) =>{
    let {email} = req.query;
    const id = Number(req.params.id);
    console.log('ID : ' , id);
    foodModel.find({email:email} , (error,userData) =>{
        if (error){
            res.status(400).send("Bad Way ! ");
        }
        let newFoodDishesFilter = userData[0].food.filter((item,idx)=>{
            if (id !== idx){
                return item;
            }
        });
        userData[0].food = newFoodDishesFilter;
        userData[0].save();
        res.status(200).send(userData[0].food);
    })
}

module.exports = foodFunctions;