import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import useFetch from '../FetchData/useFetch';

const SearchBar = ({ handleCategory, handleSearch, handleSortBy }) => {
  const { data, error, isLoading } = useFetch('http://localhost:8080/foods');
  const [item, setItem] = useState('');

  const handleInputChange = (e) => {
    setItem(e.target.value);
    handleSearch(e.target.value);
  };

  const handleSelectCategory = (category) => {
    setItem('');
    handleCategory(category);
  };

  return (
    <div className='searchBar m-5'>
      <Dropdown className='mx-5'>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Sort By
        </Dropdown.Toggle>
        <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleSortBy('all')}>
            All
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleSortBy('delivery_time')}>
            Delivery Time
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleSortBy('rating')}>
            Rating
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleSortBy('cost_low_to_high')}>
            Cost: Low to High
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleSortBy('cost_high_to_low')}>
            Cost: High to Low
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown className='mx-5'>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Category
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleSelectCategory('All')}>
            All
          </Dropdown.Item>
          {data &&
            data.map((item) => (
              <Dropdown.Item
                onClick={() => handleSelectCategory(item.category)}
                key={item.id}
              >
                {item.category}
              </Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </Dropdown>
      <form className="d-flex w-50 searchBar mx-5">
        <input
          className="form-control me-2 w-50"
          type="search"
          placeholder="Search Bar"
          aria-label="Search"
          value={item}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
};

export default SearchBar;
