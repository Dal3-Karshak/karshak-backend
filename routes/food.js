const express = require('express');

// use router from express
const router = express.Router();


// import functions from food controller 
const foodFunctions = require('../controllers/foodcontrole/food.js')



// 🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤 USERS ROUTES 🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤

router.get('/handleUsers' , foodFunctions.handleUsers)

// 🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤 API ROUTES 🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤
// send req to the api 
router.get('/getFood', foodFunctions.getFood);
router.get('/getFoodInfo', foodFunctions.getFoodInfo);


// 🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤 CRUD METHODS ROUTES 🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤

//get all dishes for user by email to render them inside the favirate dishes
router.get('/getFoodDishes' , foodFunctions.getFoodDishes);


// To added new dishe to the food array then send the food array with the new items
router.post('/addFoodDishes' , foodFunctions.addFoodDishes);

// To delete item which you are selected.
router.delete('/deleteFoodDishes' , foodFunctions.deleteFoodDishes);

// To update the information for specified dish 
router.put('/updateFoodDishes' , foodFunctions.updateFoodDishes);



module.exports = router;