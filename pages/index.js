import React, { useState } from 'react';
import Router from 'next/router';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    Router.push(`/searchResults?query=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <h1>Enter Keywords to Search for Products on BestBuy:</h1>
      <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center' }}>
        <input 
          type="text" 
          placeholder="Search products..." 
          value={searchTerm} 
          onChange={handleSearchChange} 
          style={{ 
            flex: 1, 
            minWidth: '300px', // Adjust the size as needed
            padding: '10px', // Makes the input taller
            marginRight: '10px' // Adds spacing between input and button
          }} 
        />
        <button type="submit" style={{ padding: '10px 20px' }}>Search</button>
      </form>
    </div>
  );
};

export default Index;
