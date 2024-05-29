const mongoose = require('mongoose');
const { slidesData } = require('../models/dataModels');

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

module.exports = {
    mainPage,
    showFoods,
    showSpecifiedFood, 
    getSlides,
    createSlides
}