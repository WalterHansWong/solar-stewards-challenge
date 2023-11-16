import React, { useState } from 'react';
import Router from 'next/router';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    Router.push(`/searchResults?query=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div>
      <h1>Enter the product you are looking for:</h1>
      <form onSubmit={handleSearchSubmit}>
        <input 
          type="text" 
          placeholder="Search products..." 
          value={searchTerm} 
          onChange={handleSearchChange} 
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Index;
