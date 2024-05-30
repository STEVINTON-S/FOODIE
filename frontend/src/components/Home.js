import React, { useState } from 'react';
import Corousals from './Corousals';
import Items from './Items';
import SearchBar from './SearchBar';

const Home = () => {
  const [category, setCategory] = useState('');
  const [country, setCountry] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');

  const handleCategory = (item) => {
    setCategory(item);
  };

  const handleCountry = (item) => {
    setCountry(item);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSortBy = (criteria) => {
    setSortCriteria(criteria);
  };

  return (
    <div>
      <Corousals />
      <h1 className="m-5">Foods</h1>
      <SearchBar
        handleCategory={handleCategory}
        handleCountry={handleCountry}
        handleSearch={handleSearch}
        handleSortBy={handleSortBy}
      />
      <Items category={category} country={country} searchTerm={searchTerm} sortCriteria={sortCriteria} />
    </div>
  );
};

export default Home;
