import React from 'react';
import useFetch from '../FetchData/useFetch';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

const Blog = () => {
  const { data, error, isLoading } = useFetch('http://localhost:8080/blog');

  return (
    <div>
      <h1 className='m-5 text-body-emphasis w-50 '>Blog Page</h1>
      {error && <div>{error.message}</div>}
      {isLoading && 
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      }
      {data &&
        data.map((blog) => (
          <div className="content bg-light m-5 border border-primary d-flex flex-column position-relative" key={blog.id}>
            <h2 className='m-4'>{blog.name}</h2>
            <h5 className='m-4'>Blog Posted by, {blog.blogger}</h5>
            <Link to={`/blog/${blog.id}`}>
              <button className='btn btn-outline-primary position-absolute top-0 end-0 m-4'>
                More...
              </button>
            </Link>
          </div>
        ))
      }
    </div>
  );
}

export default Blog;
