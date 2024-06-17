const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define schemas using mongoose.Schema
const createSlidesSchema = new Schema({
  thumbNailImg: {
    type: String,
    required: true
  },
  dishId: {
    type: Number,
    required: true
  },
  offer: {
    type: Number,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

const blogSchema = new Schema({
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

const helpSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const staffUserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  kitchen: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  place: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const orderSchema = new Schema({
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

const mealSchema = new Schema({
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

const cookMealSchema = new Schema({
  mealType: { type: String, required: true },
  mainIngredients: { type: [String], required: true },
  dietaryPreferences: { type: String },
  servingSize: { type: Number, required: true },
  cookingMethod: { type: String, required: true },
  allergens: { type: [String] },
  prepTime: { type: Number, required: true },
  process: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const SlidesData = mongoose.model('SlidesData', createSlidesSchema);
const BlogsData = mongoose.model('BlogsData', blogSchema);
const Help = mongoose.model('Help', helpSchema);
const StaffUser = mongoose.model('StaffUser', staffUserSchema);
const Order = mongoose.model('Order', orderSchema);
const Meal = mongoose.model('Meal', mealSchema);
const CookMeal = mongoose.model('CookMeal', cookMealSchema);

module.exports = {
  SlidesData,
  BlogsData,
  Help,
  StaffUser,
  Order,
  Meal,
  CookMeal
};
