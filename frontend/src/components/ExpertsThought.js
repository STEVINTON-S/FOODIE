import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import img from '../logo/about-img.png'

const ExpertsThought = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])

  return (
    <div className="experts-thought my-5 border-1" style={{backgroundColor: '#b7fbc0'}}>
      <section id="about" className="about container section-py">
        <div className="about-content" data-aos="fade-right">
          <div className="title">
            <h4>ABOUT US</h4>
            <h2>“Popcorn for breakfast! Why not? It's a grain. It's like, like, grits, but with high self-esteem.”</h2>
          </div>
          <p className="para-text">
            Cloud kitchens, also known as ghost kitchens or virtual kitchens, are delivery-only restaurants that do not have a physical dining space for customers. These kitchens leverage technology to manage online orders efficiently and prepare a variety of cuisines from a single location.
          </p>
          <p className="para-text">
            This innovative approach allows for significant cost savings on overheads such as rent and front-of-house staff, making it an attractive option for new food entrepreneurs. By focusing solely on delivery, cloud kitchens can rapidly adapt to changing consumer preferences and optimize their operations for quick service and high-quality food.
          </p>
        </div>

        <div className="about-image" data-aos="fade-left">
          <img src={img} alt="chef image" />
        </div>
      </section>
    </div>
  )
}

export default ExpertsThought
