const mongoose = require('mongoose');
const { slidesData, BlogsData, Help, StaffUser, Order, Meal } = require('../models/dataModels');
const { ObjectId } = require('mongoose').Types;

const mainPage = async (req, res) => {
  res.send({ msg: 'Welcome to the MealDB API' });
};

const showFoods = async (req, res) => {
  try {
    const meals = await mongoose.connection.db.collection('Meals').find().toArray();
    res.json(meals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const showSpecifiedFood = async (req, res) => {
  try {
    const meal = await mongoose.connection.db.collection('Meals').findOne({ _id: mongoose.Types.ObjectId(req.params.id) });
    if (!meal) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(meal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSlides = async (req, res) => {
  try {
    const slides = await mongoose.connection.db.collection('slidesdatas').find().toArray();
    res.json(slides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createSlides = async (req, res) => {
  try {
    const { thumbNailImg, dishId, offer, content } = req.body;
    const newSlide = new slidesData({ thumbNailImg, dishId, offer, content });
    const savedSlide = await newSlide.save();
    res.status(201).json({ msg: 'Data inserted', data: savedSlide });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createBlogs = async (req, res) => {
  try {
    const { name, dish, description, rating, recipe } = req.body;
    const newBlog = new BlogsData({ name, dish, description, rating, recipe });
    const savedBlog = await newBlog.save();
    res.status(201).json({ msg: 'Data inserted', data: savedBlog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const showBlog = async (req, res) => {
  try {
    const blogs = await mongoose.connection.db.collection('blogsdatas').find().toArray();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getHelp = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newHelp = new Help({ name, description });
    const savedHelp = await newHelp.save();
    res.status(201).json({ msg: 'Data inserted', data: savedHelp });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const showHelp = async (req, res) => {
  try {
    const helps = await mongoose.connection.db.collection('helps').find().toArray();
    res.json(helps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createStaffUser = async (req, res) => {
  try {
    const { name, email, kitchen, password, place, phone } = req.body;
    const newStaffUser = new StaffUser({ name, email, kitchen, password, place, phone });
    const savedStaffUser = await newStaffUser.save();
    res.status(201).json({ msg: 'Data inserted', data: savedStaffUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const orderPlaced = async (req, res) => {
  try {
    const data = req.body;
    const newOrder = new Order(data);
    const savedOrder = await newOrder.save();
    res.status(201).json({ msg: 'Order placed', data: savedOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const staffLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await mongoose.connection.db.collection('kitchens').findOne({ name: username });
    if (!user || user.password !== password) {
      return res.status(401).json({ msg: 'Invalid username or password' });
    }
    res.status(200).json({ kitchenId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const fetchStaffItems = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid kitchen ID format' });
    }

    const objectId = new mongoose.Types.ObjectId(id); // Use 'new' here
    const meals = await mongoose.connection.db.collection('Meals').find({ kitchenId: objectId }).toArray();

    if (!meals || meals.length === 0) {
      return res.status(404).json({ error: 'No items found for the specified kitchen' });
    }

    res.json(meals);
  } catch (err) {
    console.error(`Error fetching items for kitchen ID ${id}:`, err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// food Availability
const updateAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const { available } = req.body;

    // Update the item using findOneAndUpdate method with PUT
    const updatedItem = await mongoose.connection.db.collection('Meals').findOneAndUpdate(
      { _id: id }, // Using the provided _id as a string directly
      { $set: { available } }, // Use $set to update the 'available' field
      { returnOriginal: false } // Use returnOriginal: false to return the updated document
    );

    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    console.log("the value", updatedItem)
    res.status(200).json({ message: 'Availability updated successfully', updatedItem: updatedItem.value });
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ error: err.message });
  }
};

// CoutomerOrders
const coustomerOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// create the meal
const createMeal = async (req, res) => {
  const { idMeal, strMeal, strCategory, strArea, strMealThumb, strTags, strYoutube, ingredients, price, kitchen, available } = req.body;

  try {
    // Fetch the existing database connection
    const existingDatabaseConnection = await mongoose.connection;

    // Ensure the existing database connection is successful
    if (!existingDatabaseConnection) {
      return res.status(500).json({ error: 'Failed to connect to the existing database' });
    }

    // Access the existing Meals collection
    const existingMealsCollection = existingDatabaseConnection.collection('Meals');

    // Find the kitchen based on the provided kitchen name
    const existingKitchen = await existingDatabaseConnection.collection('kitchens').findOne({ name: kitchen });

    // Ensure the kitchen exists
    if (!existingKitchen) {
      return res.status(404).json({ error: 'Kitchen not found' });
    }

    // Create a new meal object
    const newMeal = {
      idMeal,
      strMeal,
      strCategory,
      strArea,
      strMealThumb,
      strTags,
      strYoutube,
      ingredients,
      price,
      kitchen,
      available,
      kitchenId: existingKitchen._id
    };

    // Save the new meal to the Meals collection
    await existingMealsCollection.insertOne(newMeal);

    return res.status(201).json({ msg: 'Meal created successfully' });
  } catch (err) {
    console.error('Error creating meal:', err);
    return res.status(500).json({ error: err.message });
  }
};

// admin Login
const adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await mongoose.connection.db.collection('admin').findOne({ username: username });
    console.log(user);
    if (!user || user.password !== password) {
      return res.status(401).json({ msg: 'Invalid username or password' });
    }
    res.status(200).json({ kitchenId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




module.exports = {
  mainPage,
  showFoods,
  showSpecifiedFood,
  getSlides,
  createSlides,
  createBlogs,
  showBlog,
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
};
