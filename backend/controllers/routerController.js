const mongoose = require('mongoose');
<<<<<<< HEAD
const { slidesData, BlogsData, Help, StaffUser } = require('../models/dataModels');

const mainPage = async (req, res) => {
  res.send({ msg: 'Welcome to the MealDB API' });
};

const showFoods = async (req, res) => {
  try {
    const connection = mongoose.connection.db.collection('Meals');
    const meals = await connection.find().toArray();
    res.json(meals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const showSpecifiedFood = async (req, res) => {
    try {
        const connection = mongoose.connection.db.collection('Meals');
        const id = req.params.id;
        const meal = await connection.findOne({ _id: id }); // Use the string ID directly
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
    const connection = mongoose.connection.db.collection('slidesdatas');
    const slides = await connection.find().toArray();
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
    const connection = mongoose.connection.db.collection('blogsdatas');
    const blogs = await connection.find().toArray();
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
    const connection = mongoose.connection.db.collection('helps');
    const helps = await connection.find().toArray();
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
  createStaffUser
};
=======
const { slidesData, BlogsData, Help  } = require('../models/dataModels');

const mainPage = async (req, res) =>{
    res.send({ msg: 'Welcome to the MealDB API' });
}

const showFoods = async (req, res) => {
    try {
        const connection = mongoose.connection.db.collection('Meals');
        const meals = await connection.find().toArray();
        res.json(meals);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const showSpecifiedFood = async (req, res) => {
    try {
      const connection = mongoose.connection.db.collection('Meals');
      const meal = await connection.findOne({ _id: req.params.id });
      res.json(meal);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
}

const getSlides = async (req, res) =>{
    try{
        const connection = mongoose.connection.db.collection('slidesdatas');
        const slides = await connection.find().toArray();
        res.json(slides);
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

const createSlides = async (req, res) =>{
    try{
        const {thumbNailImg, dishId, offer} = req.body;

        const newSlide = new slidesData({
            thumbNailImg: thumbNailImg,
            dishId: dishId,
            offer: offer
        });

        const savedSlide = await newSlide.save()
            .then(() =>{
                res.json({msg: 'data is insered...'});
            })
            .catch((err) =>{
                res.json({msg: err.message});
            })
        
        res.status(201).json(savedSlide);
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// for blog creation
const createBlogs = async (req, res) =>{
    try{
        const {name, dish, description, rating, recipe} = req.body;

        const newBlog = new BlogsData({
            name: name,
            dish: dish,
            description: description,
            rating: rating,
            recipe: recipe
        })

        const saveBlog = await newBlog.save()
            .then(() =>{
                res.json({msg: 'data is insered...'});
            })
            .catch((err) =>{
                res.json({msg: err.message});
            })
        
        res.status(201).json(saveBlog);
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// for showing the blog
const showBlog = async (req, res) =>{
    try{
        const connection = mongoose.connection.db.collection('blogsdatas');
        const blogs = await connection.find().toArray();
        res.json(blogs);
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

// for the Help support
const getHelp = async (req, res) => {
    try {
      const { name, description } = req.body;
  
      const newHelp = new Help({
        name,
        description,
      });
  
      const savedHelp = await newHelp.save();
      res.status(201).json({ msg: 'Data is inserted...', data: savedHelp });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
};

// for showing help message to the administrator
const showHelp = async (req, res) =>{
    try{
        const connection = mongoose.connection.db.collection('helps');
        const helps = await connection.find().toArray();
        res.json(helps);
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

module.exports = {
    mainPage,
    showFoods,
    showSpecifiedFood, 
    getSlides,
    createSlides,
    createBlogs,
    showBlog,
    getHelp,
    showHelp
}
>>>>>>> 8ba84e33e6264d90c231a394e4e23d4c5755e399
