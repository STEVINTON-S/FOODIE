import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ingredients = [
  { name: 'Chicken', image: 'https://th.bing.com/th/id/OIP.LpHEe_-dqTz84prf-fPEwwHaFi?rs=1&pid=ImgDetMain', price: 5.60 },
  { name: 'Beef', image: 'https://img.freepik.com/premium-photo/roast-beef-hd-8k-wallpaper-stock-photographic-image_890746-101542.jpg', price: 8.2 },
  { name: 'Tofu', image: 'https://th.bing.com/th/id/OIP.YLzoupcOVMjjuMOnPh_O4AHaEJ?rs=1&pid=ImgDetMain', price: 4.5 },
  { name: 'Vegetables', image: 'https://images7.alphacoders.com/127/thumb-1920-1274685.jpg', price: 5.9 }
];

const allergens = [
  { name: 'Nuts', image: 'https://th.bing.com/th/id/OIP.L2-KnI_v_mv7W9FFqHjJhwHaEJ?rs=1&pid=ImgDetMain' },
  { name: 'Dairy', image: 'https://img.freepik.com/premium-photo/generative-ai-milk-splash-dynamic-dairy-delight-highresolution-monochrome-8k-stock-photogra_934909-1048.jpg?w=2000' },
  { name: 'Shellfish', image: 'https://www.nutritionadvance.com/wp-content/uploads/2022/02/various-types-of-shellfish.jpg' }
];

const cookingMethods = [
  "Baking",
  "Boiling",
  "Frying",
  "Grilling",
  "Roasting",
  "Steaming",
  "Poaching",
  "Simmering",
  "Blanching",
  "Braising",
  "Stewing",
  "Broiling",
  "Sautéing",
  "Deep Frying",
  "Smoking",
  "Pressure Cooking",
  "Slow Cooking"
];

const MealCook = () => {
  const [mealType, setMealType] = useState('');
  const [mainIngredients, setMainIngredients] = useState([]);
  const [dietaryPreferences, setDietaryPreferences] = useState('');
  const [servingSize, setServingSize] = useState(1);
  const [cookingMethod, setCookingMethod] = useState('');
  const [selectedAllergens, setSelectedAllergens] = useState([]);
  const [prepTime, setPrepTime] = useState('');
  const [process, setProcess] = useState('');
  const [meal, setMeal] = useState({ items: [], totalPrice: 0 });
  const navigate = useNavigate();

  const handleIngredientClick = (ingredient) => {
    const selected = mainIngredients.includes(ingredient.name);
    const updatedIngredients = selected
      ? mainIngredients.filter(item => item !== ingredient.name)
      : [...mainIngredients, ingredient.name];

    const updatedItems = selected
      ? meal.items.filter(item => item.name !== ingredient.name)
      : [...meal.items, ingredient];

    const updatedPrice = selected
      ? meal.totalPrice - ingredient.price
      : meal.totalPrice + ingredient.price;

    setMainIngredients(updatedIngredients);
    setMeal({ items: updatedItems, totalPrice: updatedPrice });
  };

  const handleAllergenClick = (allergen) => {
    if (selectedAllergens.includes(allergen)) {
      setSelectedAllergens(selectedAllergens.filter(item => item !== allergen));
    } else {
      setSelectedAllergens([...selectedAllergens, allergen]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const mealData = {
      mealType,
      mainIngredients,
      dietaryPreferences,
      servingSize,
      cookingMethod,
      allergens: selectedAllergens,
      prepTime,
      process,
      meal
    };
    console.log(mealData);
    navigate('/pricing', {state: {mealData}})
  };

  return (
    <form onSubmit={handleSubmit} className="meal-form">
      <div className="form-group">
        <label>Meal Type</label>
        <select value={mealType} onChange={(e) => setMealType(e.target.value)} className="dropdown">
          <option value="">Select Meal Type</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>
      </div>

      <div className="form-group">
        <label>Main Ingredients</label>
        <div className="image-selector">
          {ingredients.map(ingredient => (
            <div
              key={ingredient.name}
              className={`image-item ${mainIngredients.includes(ingredient.name) ? 'selected' : ''}`}
              onClick={() => handleIngredientClick(ingredient)}
            >
              <img src={ingredient.image} alt={ingredient.name} />
              <span>{ingredient.name}</span>
              <span>${ingredient.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div>Total Price: ${meal.totalPrice.toFixed(2)}</div>
      </div>

      <div className="form-group">
        <label>Dietary Preferences</label>
        <input
          type="text"
          value={dietaryPreferences}
          onChange={(e) => setDietaryPreferences(e.target.value)}
          className="input-field"
        />
      </div>

      <div className="form-group">
        <label>Serving Size</label>
        <input
          type="number"
          value={servingSize}
          onChange={(e) => setServingSize(e.target.value)}
          className="input-field"
        />
      </div>

      <div className="form-group">
        <label>Cooking Method</label>
        <select value={cookingMethod} onChange={(e) => setCookingMethod(e.target.value)} className="dropdown">
          <option value="">Select Cooking Method</option>
          {cookingMethods.map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Allergens</label>
        <div className="image-selector">
          {allergens.map(allergen => (
            <div
              key={allergen.name}
              className={`image-item ${selectedAllergens.includes(allergen.name) ? 'selected' : ''}`}
              onClick={() => handleAllergenClick(allergen.name)}
            >
              <img src={allergen.image} alt={allergen.name} />
              <span>{allergen.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Preparation Time (minutes)</label>
        <input
          type="number"
          value={prepTime}
          onChange={(e) => setPrepTime(e.target.value)}
          className="input-field"
        />
      </div>

      <div className="form-group">
        <label>Process</label>
        <input
          type="text"
          value={process}
          onChange={(e) => setProcess(e.target.value)}
          className="input-field"
        />
      </div>

      <button type="submit" className="submit-button">Submit</button>
    </form>
  );
};

export default MealCook;
