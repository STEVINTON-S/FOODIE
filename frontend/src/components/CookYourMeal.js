import React, { useEffect } from 'react';
import img from '../logo/cook.png';
import AOS from 'aos';
import 'aos/dist/aos.css';

const CookYourMeal = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div>
      <section id="cook-your-meal" className="cook-your-meal container section-py">
        <div className="cook-your-meal-image" data-aos="fade-right">
          <img src={img} alt="chef image" />
        </div>
        <div className="cook-your-meal-content" data-aos="fade-left">
        <div className="title">
            <h2>Cook Your Meal</h2>
          </div>
          <p className="para-text">
            A customer can cook their meal by giving instructions to the staff as a description for their dish. This feature allows for a personalized cooking experience where customers can tailor their meals to their specific tastes and dietary requirements.
          </p>
          <p className="para-text">
            Stay tuned for updates on this exciting feature! We're working hard to make your ordering experience even more convenient and transparent.
          </p>
          <a className='btn btn-success' href='/mealCook'>Try now</a>
        </div>
      </section>
    </div>
  );
}

export default CookYourMeal;
