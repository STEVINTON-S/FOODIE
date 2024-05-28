import React from 'react';
import Corousals from './Corousals';
import Items from './Items';

const Home = () => {
  return (
    <div>
      <Corousals/>
      <h1 className='m-5'>Foods</h1>
      <Items/>
    </div>
  )
}

export default Home;
