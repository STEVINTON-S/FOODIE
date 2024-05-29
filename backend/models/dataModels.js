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
  
const slidesData = mongoose.model('slidesData', createSlides);
const BlogsData = mongoose.model('BlogsData', blogSchema);

module.exports = {
    slidesData,
    BlogsData
}