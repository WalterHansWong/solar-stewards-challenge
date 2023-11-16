import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { query } = router.query;

  useEffect(() => {
    if (query) {
      setIsLoading(true);
      fetch(`/api/search?term=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => {
          setResults(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setIsLoading(false);
        });
    }
  }, [query]);

  const handleSaveItem = (product) => {
    // Implement logic to save the item to MongoDB
    // Use an API request to server to handle this
    console.log('Saving item:', product);
  };

  const navigateHome = () => {
    router.push('/'); // Navigate to the home page
  };

  const navigateToSavedItems = () => {
    router.push('/savedItems'); // TODO: Navigate to the saved items page
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      <h1>Search Results</h1>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => router.push('/')} style={{ marginRight: '10px' }}>New Search</button>
        <button onClick={() => router.push('/savedItems')}>See Saved Items</button>
      </div>
      {isLoading ? (
        <p>Fetching Results from BestBuy...</p>
      ) : results.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {results.map(product => (
            <li key={product.sku} style={{ border: '1px solid #ddd', width: '80%', maxWidth: '500px', margin: '10px', padding: '10px', borderRadius: '8px', textAlign: 'left', wordWrap: 'break-word' }}>
              <div>Name: {product.name}</div>
              <div>Price: ${product.salePrice}</div>
              <button onClick={() => handleSaveItem(product)} style={{ marginTop: '10px' }}>Save to Wishlist</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default SearchResults;

