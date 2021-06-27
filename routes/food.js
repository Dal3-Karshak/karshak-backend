const express = require('express');

// use router from express
const router = express.Router();


// import functions from food controller 
const foodFunctions=require('../controllers/foodcontrole/food.js')



// 🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤 USERS ROUTES 🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤

router.get('/handleUsers' , foodFunctions.handleUsers)

// 🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤 API ROUTES 🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤
// send req to the api 
router.get('/getFood', foodFunctions.getFood);
router.get('/getFoodInfo', foodFunctions.getFoodInfo);


// 🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤 CRUD METHODS ROUTES 🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤
// send requiest to database
// Returned data for which item was selecting (GET)
router.get('/getFoodDishes' , foodFunctions.getFoodDishes);
// To added new data of list.
// add.
router.post('/addFoodDishes' , foodFunctions.addFoodDishes);

// To delete item which you are selected.
// delete
router.delete('/deleteFoodDishes' , foodFunctions.deleteFoodDishes);
// router.delete('/' , fun);
// router.put('/' , fun);
// router.patch('/' , fun);

module.exports = router;