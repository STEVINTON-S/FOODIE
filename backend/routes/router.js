const express = require('express');
const router = express.Router();
const { mainPage, showFoods, showSpecifiedFood, getSlides, createSlides, showBlog, createBlogs, getSpecificBlog } = require('../controllers/routerController');

// main page
router.get('/', mainPage);

// for the meals page
router.get('/foods', showFoods);
router.get('/foods/:id', showSpecifiedFood);

// for the slides for the discount slides and slideshow, for the both insert and creation
router.get('/slide', getSlides);
router.post('/createSlide', createSlides);

// for the blogs creation and view
router.post('/blog/create', createBlogs);
router.get('/blog', showBlog)

module.exports = router;
