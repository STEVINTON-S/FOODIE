import React, { useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import useFetch from '../FetchData/useFetch';
<<<<<<< HEAD
import Loading from './loadCintent/Loading';
=======
import Spinner from 'react-bootstrap/Spinner';
>>>>>>> 8ba84e33e6264d90c231a394e4e23d4c5755e399

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
<<<<<<< HEAD
          <Loading />
=======
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
>>>>>>> 8ba84e33e6264d90c231a394e4e23d4c5755e399
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
                <Carousel.Caption className='parent-container'>
<<<<<<< HEAD
                  <h1 style={{color:'#35de8d'}}>Get {discount.offer} by</h1> 
                  <h3 style={{color:'#35de8d'}}>{discount.content}</h3>
                  <button onClick={() => handleDiscount(discount.dishId, discount.offer)} className="btn-60">
                    <span style={{backgroundColor:'#1fc877'}}>Get Offer</span>
                  </button>
=======
                <h1 style={{color:'#35de8d'}}>Get {discount.offer} by</h1> 
                <h3 style={{color:'#35de8d'}}>{discount.content}</h3>
                <button onClick={() => handleDiscount(discount.dishId, discount.offer)} class="btn-60"><span style={{backgroundColor:'#1fc877'}}>Get Offer</span></button>
>>>>>>> 8ba84e33e6264d90c231a394e4e23d4c5755e399
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
