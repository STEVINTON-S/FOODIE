// Home component
import React, { useState } from 'react';
import Corousals from './Corousals';
import Items from './Items';
import SearchBar from './SearchBar';

const Home = () => {
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');

  const handleCategory = (item) => {
    setCategory(item);
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
        handleSearch={handleSearch}
        handleSortBy={handleSortBy}
      />
      <Items category={category} searchTerm={searchTerm} sortCriteria={sortCriteria}/>
    </div>
  );
};

export default Home;
