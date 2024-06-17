import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import usePostData from '../usePut/usePutData';
import Confetti from 'react-confetti';

const MealCookPricing = () => {
  const location = useLocation();
  const { mealData } = location.state;
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const { postData, isLoading, error } = usePostData('http://localhost:8080/mealCook');

  const handleOrderPlace = async () => {
    try {
      const response = await postData(mealData);
      console.log('Order placed successfully:', response);
      setOrderPlaced(true);
      setConfetti(true);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className="pricing-container">
      <h1>Meal Pricing</h1>
      <div className="meal-details">
        <h2>{mealData.mealType.charAt(0).toUpperCase() + mealData.mealType.slice(1)} Meal</h2>
        <div className="details-section">
          <h3>Main Ingredients:</h3>
          <ul className="ingredient-list">
            {mealData.mainIngredients.map((ingredient, index) => (
              <li key={index} className="ingredient-item">{ingredient}</li>
            ))}
          </ul>
        </div>
        <div className="details-section">
          <h3>Dietary Preferences:</h3>
          <p>{mealData.dietaryPreferences}</p>
        </div>
        <div className="details-section">
          <h3>Serving Size:</h3>
          <p>{mealData.servingSize}</p>
        </div>
        <div className="details-section">
          <h3>Cooking Method:</h3>
          <p>{mealData.cookingMethod}</p>
        </div>
        <div className="details-section">
          <h3>Allergens:</h3>
          <ul className="allergen-list">
            {mealData.allergens.map((allergen, index) => (
              <li key={index} className="allergen-item">{allergen}</li>
            ))}
          </ul>
        </div>
        <div className="details-section">
          <h3>Preparation Time:</h3>
          <p>{mealData.prepTime} minutes</p>
        </div>
        <div className="details-section">
          <h3>Process:</h3>
          <p>{mealData.process}</p>
        </div>
        <div className="details-section total-price">
          <h3>Total Price:</h3>
          <p>${mealData.meal.totalPrice.toFixed(2)}</p>
          <button className="btn btn-success" onClick={handleOrderPlace} disabled={isLoading}>
            {isLoading ? 'Placing Order...' : 'Place Order'}
          </button>
          {error && <p className="error-message">{error}</p>}
          {orderPlaced && (
            <div>
              <h1>Order Placed</h1>
              <h4>Our Customer Care Will Support You</h4>
            </div>
          )}
          {confetti && <Confetti />}
        </div>
      </div>
    </div>
  );
};

export default MealCookPricing;
