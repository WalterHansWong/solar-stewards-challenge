import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { v4 as uuidv4 } from 'uuid';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // this is a simple working solution to have user specific wishlists
  // users must start workflow from home page
  // localStorage ensures persistence over sessions
  // TODO: replace this with a secure user authentication workflow
  // TODO: check for userid collisions
  // Note that the probability of a uuidv4 collision is almost zero
  // Source: https://jhall.io/archive/2021/05/19/what-are-the-odds/#:~:text=So%20what%20are%20the%20odds,chance%20of%20a%20single%20collision.
  const [userID, setUserID] = useState('');

  useEffect(() => {
    // Check if a userID already exists in localStorage
    let existingUserID = localStorage.getItem('userID');

    if (!existingUserID) {
      // If not, generate a new userID and store it
      existingUserID = uuidv4();
      localStorage.setItem('userID', existingUserID);
    }

    // Set the userID in the state for React component
    setUserID(existingUserID);
  }, []);

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
            minWidth: '300px',
            padding: '10px',
            marginRight: '10px'
          }} 
        />
        <button type="submit" style={{ padding: '10px 20px' }}>Search</button>
      </form>
    </div>
  );
};

export default Index;
