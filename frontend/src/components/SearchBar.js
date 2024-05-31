import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import useFetch from '../FetchData/useFetch';

const SearchBar = ({ handleCategory, handleCountry, handleSearch, handleSortBy }) => {
  const { data, error, isLoading } = useFetch('http://localhost:8080/foods');
  const [item, setItem] = useState('');
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if (data) {
      const uniqueCategories = [...new Set(data.map(item => item.strCategory))];
      const uniqueCountries = [...new Set(data.map(item => item.strArea))];
      setCategories(uniqueCategories);
      setCountries(uniqueCountries);
    }
  }, [data]);

  const handleInputChange = (e) => {
    setItem(e.target.value);
    handleSearch(e.target.value);
  };

  const handleSelectCategory = (category) => {
    setItem('');
    handleCategory(category);
  };

  const handleSelectCountry = (country) => {
    setItem('');
    handleCountry(country);
  };

  return (
    <div className='searchBar m-5'>
      <Dropdown className='mx-5'>
        <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ background: 'linear-gradient(to bottom, #1acd81, #0fa968)', borderRadius: '5px' }}>
          Sort By
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleSortBy('all')}>
            All
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
        <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ background: 'linear-gradient(to bottom, #1acd81, #0fa968)', borderRadius: '5px' }}>
          Category
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleSelectCategory('All')}>
            All
          </Dropdown.Item>
          {categories.map((category, index) => (
            <Dropdown.Item
              onClick={() => handleSelectCategory(category)}
              key={index}
            >
              {category}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown className='mx-5'>
        <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ background: 'linear-gradient(to bottom, #1acd81, #0fa968)', borderRadius: '5px' }}>
          Cuisine
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleSelectCountry('All')}>
            All
          </Dropdown.Item>
          {countries.map((country, index) => (
            <Dropdown.Item
              onClick={() => handleSelectCountry(country)}
              key={index}
            >
              {country}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <form class="d-flex w-25 mx-5 p-1 border border-primary rounded-pill shadow-sm" >
        <input
          class="form-control me-2 border-0"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={item}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
};

export default SearchBar;
