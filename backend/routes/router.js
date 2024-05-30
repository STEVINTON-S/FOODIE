const express = require('express');
const router = express.Router();
const { mainPage, showFoods, showSpecifiedFood, getSlides, createSlides, showBlog, createBlogs, getHelp, showHelp } = require('../controllers/routerController');

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

// for the help support
router.post('/help', getHelp);
// show the help content only for the administrator
router.get('/showHelp', showHelp)

module.exports = router;
