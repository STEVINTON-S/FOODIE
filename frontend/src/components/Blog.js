import React from 'react';
import useFetch from '../FetchData/useFetch';
<<<<<<< HEAD
import { FaStar, FaRegStar } from 'react-icons/fa';
import Loading from './loadCintent/Loading';
=======
import Spinner from 'react-bootstrap/Spinner';
import { FaStar, FaRegStar } from 'react-icons/fa';
>>>>>>> 8ba84e33e6264d90c231a394e4e23d4c5755e399

const Blog = () => {
  const { data, error, isLoading } = useFetch('http://localhost:8080/blog');

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
      <h1 className='m-5 text-body-emphasis w-50'>Blog Page</h1>
      {error && <div className="alert alert-danger">{error.message}</div>}
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
      {data &&
        data.map((blog) => (
          <div key={blog._id} className="card m-5 position-relative">
            <div className="card-body">
              <h2 className='card-title'>{blog.name}</h2>
              <h5 className='card-subtitle mb-2 text-muted'>Dish Name, {blog.dish}</h5>
              <p className="card-text">{blog.description}</p>
              <p className="card-text">Recipe: {blog.recipe}</p>
            </div>
            <div className="position-absolute top-0 end-0 m-3">
              <div className="d-flex align-items-center">
                {renderStars(blog.rating)}
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default Blog;
