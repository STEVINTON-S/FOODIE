const mongoose = require('mongoose');
const { slidesData, BlogsData } = require('../models/dataModels');

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

// for the Specific Blog
const getSpecificBlog = async (req, res) =>{
    try {
        const connection = mongoose.connection.db.collection('blogsdatas');
        const blog = await connection.findOne({ _id: req.params.id });
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(blog);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
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
    getSpecificBlog
}