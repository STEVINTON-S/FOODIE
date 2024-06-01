import React from 'react';

const Footer = () => {
  return (
    <div className="footer-wrapper" >
      <footer className="footer section-py my-5 p-4" style={{backgroundColor: '#2e3330', color: 'white'}}>
        <div className="container">
          <div className="footer-items d-flex justify-content-between">
            <div className="footer-item">
              <h3>Find us</h3>
              <p className="para-text text-light">Rathinam Technical Campus,<br /> Pollachi Main Road,<br /> Echanari<br />Coimbatore - 641 021</p>
            </div>

            <div className="footer-item">
              <h3>Reservation</h3>
              <p className="para-text text-light">990-080-86893 | 953-652-3842</p>
              <p className="para-text text-light">gluttonousgluten8080@gmail.com</p>
            </div>

            <div className="footer-item">
              <div className="footer-icons d-flex">
                <a href="https://www.facebook.com" target="_blank">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="https://www.instagram.com" target="_blank">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://www.twitter.com" target="_blank">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://www.linkedin.com" target="_blank">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
              <p className="para-text text-light">Copyright 2024 &copy; Gluttonous Gluten</p>
              <p className="para-text text-light">All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
