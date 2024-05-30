const mongoose = require('mongoose');
const schema = mongoose.Schema;

const createSlides = new schema({
    thumbNailImg: {
        type: String,
        required: true
    },
    dishId:{
        type: Number,
        required: true
    },
    offer:{
        type: Number,
        required: true
    },
    content:{
      type: String,
      required: true
    }
});

const blogSchema = new schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    dish: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    recipe: {
      type: String,
      required: true
    }
  });

  const helpSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  });
  
const slidesData = mongoose.model('slidesData', createSlides);
const BlogsData = mongoose.model('BlogsData', blogSchema);
const Help = mongoose.model('Help', helpSchema);

module.exports = {
    slidesData,
    BlogsData,
    Help
}