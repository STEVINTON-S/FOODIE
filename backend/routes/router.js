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
  orderPlaced,
  staffLogin,
  fetchStaffItems,
  updateAvailability,
  coustomerOrders,
  createMeal,
  adminLogin
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

// Order Placed
router.post('/orderPlaced', orderPlaced);

// Staff login
router.post('/staff/login', staffLogin);

// staff foods
router.get('/foods/staff/:id', fetchStaffItems);

// food availability
router.put('/staff/updateAvailability/:id', updateAvailability);

// orders
router.get('/orders', coustomerOrders);

// create Meals
router.post('/meals', createMeal);

// admin Login
router.post('/admin/login', adminLogin)


module.exports = router;
