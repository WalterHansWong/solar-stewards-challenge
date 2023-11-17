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
    <div>
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

      {/* Fixed header */}
      <div style={{ position: 'fixed', top: 0, width: '100%', backgroundColor: 'white', zIndex: 100, borderBottom: '1px solid #ddd', padding: '10px 0', textAlign: 'center', boxSizing: 'border-box' }}>
        <h1>Search Results</h1>
        <div style={{ marginBottom: '20px' }}>
          <button onClick={() => router.push('/')} style={{ marginRight: '10px' }}>New Search</button>
          <button onClick={() => router.push('/savedItems')}>See Saved Items</button>

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
        </div>
      </div>

      {/* Main content */}
      <div style={{ marginTop: '140px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 120px)' }}>
            <p>Fetching results from BestBuy...</p>
          </div>
        ) : results.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {results.map(product => (
              <li key={product.sku} style={{ border: '1px solid #ddd', width: '80%', maxWidth: '500px', margin: '10px', padding: '10px', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <img src={product.thumbnailImage} alt={product.name} style={{ width: '100px', height: '100px', marginBottom: '10px' }} />
                <div><strong>Name:</strong> {product.name}</div>
                <div><strong>Price:</strong> ${product.salePrice}</div>
                <a href={product.url} target="_blank" rel="noopener noreferrer" style={{ marginTop: '10px', marginBottom: '10px' }}>View on BestBuy</a>
                <button onClick={() => handleSaveItem(product)} style={{ padding: '10px 20px' }}>Save to Wishlist</button>
              </li>
            ))}
          </ul>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 120px)' }}>
            <p>No results found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;

