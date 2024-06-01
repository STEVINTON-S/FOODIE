import React, { useEffect } from 'react';
import img from '../logo/map.png';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TrackOrder = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div style={{backgroundColor: '#b7fbc0'}}>
      <section id="cook-your-meal" className="cook-your-meal container section-py">
        <div className="cook-your-meal-content" data-aos="fade-left">
        <div className="title">
            <h2>Track your Order</h2>
          </div>
          <p className="para-text">
            The customer can track their order and doorstep delivery. Keep an eye on your order's progress from preparation to delivery right to your doorstep. With our real-time tracking feature, you'll always know where your meal is and when it's expected to arrive.
          </p>
        </div>
        <div className="cook-your-meal-image mx-2" data-aos="fade-right">
          <img src={img} alt="chef image" />
        </div>
      </section>
    </div>
  );
}

export default TrackOrder;
