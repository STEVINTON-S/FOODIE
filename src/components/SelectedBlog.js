import React from 'react'
import useFetch from '../FetchData/useFetch'
import { useParams } from 'react-router-dom';

const SelectedBlog = () => {

    const { id } = useParams();
    const { data, error, isLoading } = useFetch(`http://localhost:8080/blog/${id}`); 

  return (
    <div>
        {error && <div>{error.message}</div> }
        {isLoading && <div>Loading...</div> }
        {data && 
            <div className="card shadow-lg m-5 ">
            <div className="card-body">
              <h1 className="card-title display-4">{data.name}</h1>
              <h3 className="card-subtitle mb-3 text-muted">Published By, {data.blogger}</h3>
              <p className="card-text">{data.content}</p>
              <h5 className="mt-4">Popular Recipes:</h5>
              <ol className="list-group list-group-numbered">
                {data.popular_recipes.map((recipe, index) => (
                  <li className="list-group-item" key={index}>{recipe}</li>
                ))}
              </ol>
            </div>
          </div>
        }
    </div>
  )
}

export default SelectedBlog
