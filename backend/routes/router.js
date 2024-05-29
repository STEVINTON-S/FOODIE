const express = require('express');
const router = express.Router();
const { mainPage, showFoods, showSpecifiedFood, getSlides, createSlides } = require('../controllers/routerController');


router.get('/', mainPage);
router.get('/foods', showFoods);
router.get('/foods/:id', showSpecifiedFood);
router.get('/slide', getSlides)
router.post('/createSlide', createSlides)

module.exports = router;
