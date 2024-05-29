import React, { useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import useFetch from '../FetchData/useFetch';
import Spinner from 'react-bootstrap/Spinner';

const Corousals = () => {
  const { data, error, isLoading } = useFetch('http://localhost:8080/slide');

  useEffect(() => {
    if (data) {
      data.map((res) => {
        console.log(res);
      });
    }
  }, [data]);

  const handleDiscount = (food, discount) =>{
    console.log(food, discount);
  }

  return (
    <div className='corousal'>
      {error && <div>{error}</div>}
      {isLoading && 
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      }
      {data && (
        <Carousel data-bs-theme="light">
          {data.map((discount) => (
            <Carousel.Item key={discount._id}>
              <div className="carousel-item-custom">
                <img
                  className="d-block w-100 carousel-img"
                  src={discount.thumbNailImg}
                  alt={`Slide ${discount._id}`}
                />
                <Carousel.Caption>
                  <button onClick={() => handleDiscount(discount.dishId, discount.offer)} className='btn btn-primary zoom-effect'>Get Offer</button>
                </Carousel.Caption>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </div>
  );
}

export default Corousals;
