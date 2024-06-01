import React, { useEffect, useState } from 'react';
import useFetch from '../FetchData/useFetch';
import Loading from './loadCintent/Loading';
import { FaStar, FaRegStar } from 'react-icons/fa';

const RecentBlog = () => {
  const { data, error, isLoading } = useFetch('http://localhost:8080/blog');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 2) % data.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [data]);

  const renderStars = (rating) => {
    const stars = [];
    const filledStars = Math.floor(rating);
    const emptyStars = 5 - filledStars;
    for (let i = 0; i < filledStars; i++) {
      stars.push(<FaStar key={i} className="text-warning" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={filledStars + i} className="text-secondary" />);
    }
    return stars;
  };

  return (
    <div>
      <h1 className='m-5'>Recent Blog</h1>
      {error && <div>{error.message}</div>}
      {isLoading && 
        <div>
          <div className="d-flex justify-content-center align-items-center vh-100">
            <Loading />
          </div>
        </div>
      }
      {data &&
        <div className="blog-container m-5">
          <div className="blog-content" style={{ transform: `translateX(-${currentIndex * 50}%)` }}>
            {data.map((item, index) => (
              <div key={item._id} className="position-relative mb-4 blog-item">
                <h3>{item.dish}</h3>
                <p>{item.description}</p>
                <div className="position-absolute top-0 end-0 m-3">
                  <div className="d-flex align-items-center">
                    {renderStars(item.rating)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    </div>
  );
};

export default RecentBlog;
