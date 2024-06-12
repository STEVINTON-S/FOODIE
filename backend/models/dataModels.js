const { Timestamp } = require('mongodb');
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
}, {
  timestamps: true
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

  const staffUser = new schema({
    username:{
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true
    },
    kitchen:{
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    place:{
      type: String,
      required: true
    },
    phone:{
      type: Number,
      required: true
    }
  }, {Timestamp: true});

  const orderSchema = new schema({
    orderId: {
      type: Number,
      default: () => Math.floor(Math.random() * 900000000300000000000) + 1000000000000000
    },
    items: [
      {
        itemId: String,
        name: String,
        count: Number,
        price: Number
      }
    ],
    totalPrice: Number,
    orderDate: { type: Date, default: Date.now },
    deliveryAddress: { type: String, default: '123, 4th street, echanari, coimbatore' },
    status: { type: String, default: 'Delivered' },
    paymentMethod: { type: String, default: 'Cash on Delivery' },
    contactInfo: {
      Phone: { type: Number, default: 9876543210 },
      email: { type: String, default: 'abc123@gmail.com' }
    }
  });

  const mealSchema = new mongoose.Schema({
    idMeal: { type: String, required: true },
    strMeal: { type: String, required: true },
    strCategory: { type: String, required: true },
    strArea: { type: String, required: true },
    strMealThumb: { type: String, required: true },
    strTags: { type: String },
    strYoutube: { type: String },
    ingredients: { type: String, required: true },
    price: { type: String, required: true },
    kitchen: { type: String, required: true },
    available: { type: Boolean, default: true },
    kitchenId: { type: mongoose.Schema.Types.ObjectId, ref: 'Kitchen', required: true }
  });
  
const slidesData = mongoose.model('slidesData', createSlides);
const BlogsData = mongoose.model('BlogsData', blogSchema);
const Help = mongoose.model('Help', helpSchema);
const StaffUser = mongoose.model('StaffUser', staffUser);
const Order = mongoose.model('Order', orderSchema);
const Meal = mongoose.model('Meal', mealSchema);

module.exports = {
    slidesData,
    BlogsData,
    Help,
    StaffUser,
    Order,
    Meal
}