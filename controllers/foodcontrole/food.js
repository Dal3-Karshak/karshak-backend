const axios = require("axios");

const foodFunctions = {};
const foodModel = require('../../models/foodschema.js')
// console.log(foodModel);

// 🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤 HANDLE USERS 🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤
//http://localhost:8000/food/handleUsers?email=< any email >
foodFunctions.handleUsers = (req,res) => {
    // console.log("kkkkkkkkkkkkkkk",foodModel)
    const email = req.query.email;
    foodModel.find({email:email} , (error,userData) =>{
        if (error){
            res.status(400).send('Bad Request TRY AGAIN');
        }
        else{
            // console.log(userData)
            if(userData.length === 0){
                const newUser = new foodModel ({
                    email: `${email}`,
                    food:[]
              });
              newUser.save();
              res.status(200).send(newUser)
            }else{
               
              res.status(200).send(userData[0]) 
            }
        }
    })
}




// 🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤 SEND REQ TO API 🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤
// http://localhost:8000/food/getfood?foodName=<name>&cuision=<cuision>
foodFunctions.getFood = (req,res) => {
    const KEY = process.env.FOOD_KEY;
     let foodName = req.query.foodName;
     let cuisine = req.query.cuisine;
     let Url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${KEY}&query=${foodName}&number=${12}&cuisine=${cuisine}`;
    axios.get(Url)
    .then(result =>{
        console.log(result.data)
        res.status(200).send(result.data)
    }).catch(err =>{
        res.status(404).send("Bad Request" , err)
    })
}


//https://api.spoonacular.com/recipes/654857/ingredientWidget.json?apiKey=a81fe7f6865f4b5c9cd7b656b37d12f1
foodFunctions.getFoodInfo = (req,res) => {
    const KEY = process.env.FOOD_KEY;
     let id = req.query.id;
     let Url = `https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${KEY}`;

    axios.get(Url)
    .then(result =>{
        console.log(result.data)
        res.status(200).send(result.data)
    }).catch(err =>{
        res.status(400).send('Bad Request TRY AGAIN')
    })
}


// 🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤 CRUD METHODS 🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤


//http://localhost:8000/food/getFoodDishes?email=saadoundhirat93@gmail.com
//get all dishes for user by email to render them inside the favirate dishes
foodFunctions.getFoodDishes = (req,res) => {
    let email = req.query.email;
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



//http://localhost:8000/food/addFoodDishes?email=saadoundhirat93@gmail.com ,object
// HERE THE OBJECT HAS ALL THE DISHE INFO (TITLE , IMAGE, ID)
//To added new dishe to the food array then send the food array with the new items

foodFunctions.addFoodDishes = (req,res) => {
    let email = req.query.email;
    let {title , image , id , feedback , tried} =req.body;
    foodModel.find({email:email} , (error,userData) =>{
        if (error){
            res.status(400).send('Bad Request TRY AGAIN');
        }
        else{
            userData[0].food.push({
                id:id,
                title:title,
                image:image,
                feedback:feedback,
                tride:tried,
            });
            userData[0].save();
            res.status(200).send(userData[0].food);
        }
    })
}
//http://localhost:8000/food/deleteFoodDishes?email=saadoundhirat93@gmail.com&index=<num>
// To delete item which you are selected.
foodFunctions.deleteFoodDishes = (req,res) =>{
    let email = req.query.email;
    const index = Number(req.query.index);
      foodModel.find({email:email} , (error,userData) =>{
        if (error){
            res.status(400).send('Bad Request TRY AGAIN');
        }
        let newFoodDishesFilter =  userData[0].food.filter((item,idx)=>{
            if (index !== idx){
                console.log(index , idx)
                return item;
            }
        });
        userData[0].food = newFoodDishesFilter;
        userData[0].save();
        res.status(200).send(userData[0]);
    })
}


module.exports = foodFunctions;

