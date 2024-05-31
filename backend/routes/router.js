const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const {
  mainPage,
  showFoods,
  showSpecifiedFood,
  getSlides,
  createSlides,
  showBlog,
  createBlogs,
  getHelp,
  showHelp,
  createStaffUser
} = require('../controllers/routerController');

// Main page
router.get('/', mainPage);

// Meals endpoints
router.get('/foods', showFoods);
router.get('/foods/:id', showSpecifiedFood);

// Slides endpoints
router.get('/slide', getSlides);
router.post('/admin/discounts', createSlides);

// Blogs endpoints
router.get('/blog', showBlog);
router.post('/blog/create', createBlogs);

// Help endpoints
router.post('/help', getHelp);
router.get('/showHelp', showHelp);

// Staff user endpoint
router.post('/admin/createUser', createStaffUser);
=======
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
>>>>>>> 8ba84e33e6264d90c231a394e4e23d4c5755e399

module.exports = router;
