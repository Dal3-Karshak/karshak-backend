const express = require('express');

// use router from express
const router = express.Router();


// import functions from food controller 
const foodFunctions=require('../controllers/foodcontrole/food.js')


router.get('/getFood', foodFunctions.getFood);
router.get('/getFoodInfo', foodFunctions.getFoodInfo);
// router.post('/' , fun);
// router.delete('/' , fun);
// router.put('/' , fun);
// router.patch('/' , fun';

module.exports = router;