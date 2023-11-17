import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(false);
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

  const handleSaveItem = async (product) => {
    const userID = localStorage.getItem('userID');
    if (!userID) {
        console.error('User ID not found');
        return;
    }

    try {
        const response = await fetch('/api/saveItem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userID,
                product
            }),
        });
        if (!response.ok) throw new Error('Error saving item');

        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
        console.error('Error saving item:', error);
        setSaveError(true);
        setTimeout(() => setSaveError(false), 3000);
    }
  };

  const navigateHome = () => {
    router.push('/'); // Navigate to the home page
  };

  const navigateToSavedItems = () => {
    router.push('/savedItems');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      <style jsx>{`
      @keyframes fadein {
          from { opacity: 0; }
          to { opacity: 1; }
      }
      @keyframes fadeout {
          from { opacity: 1; }
          to { opacity: 0; }
      }
      /* Additional styles */
      `}</style>
      <h1>Search Results</h1>

      {saveSuccess && (
        <div style={{ position: 'fixed', top: '10px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'lightgreen', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', animation: 'fadein 0.5s, fadeout 0.5s 2.5s' }}>
          Item saved successfully!
        </div>
      )}

      {saveError && (
        <div style={{ position: 'fixed', top: '10px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'pink', color: 'darkred', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', animation: 'fadein 0.5s, fadeout 0.5s 2.5s' }}>
          Error saving item!
        </div>
      )}

      <div style={{ marginBottom: '20px' }}>
        <button onClick={navigateHome} style={{ marginRight: '10px' }}>New Search</button>
        <button onClick={navigateToSavedItems}>See Saved Items</button>
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

