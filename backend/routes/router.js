const express = require('express');
const router = express.Router();
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
  createStaffUser,
  orderPlaced
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

// Oreder Placed
router.post('/orderPlaced', orderPlaced);

module.exports = router;
