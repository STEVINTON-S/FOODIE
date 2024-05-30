const mongoose = require('mongoose');
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
        const meal = await connection.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
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

const createStaffUser = async (req, res) =>{
    try{
        const {name, email, kitchen, password, place, phone} = req.body;
        const newStaffUser = new StaffUser({name, email, kitchen, password, place, phone});
        const savedStaffUser = await newStaffUser.save();
        res.status(201).json({msg: 'Data inserted', data: savedStaffUser});
    }catch(err){
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
    getHelp,
    showHelp,
    createStaffUser
};
