import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const SavedItems = () => {
  const [savedItems, setSavedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userID = localStorage.getItem('userID');
    if (userID) {
      setIsLoading(true);
      fetch(`/api/getSavedItems?userID=${encodeURIComponent(userID)}`)
        .then(res => res.json())
        .then(data => {
          setSavedItems(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching saved items:', error);
          setIsLoading(false);
        });
    }
  }, []);

  const handleDeleteItem = async (sku) => {
    // ... handle delete logic
  };

  const navigateHome = () => {
    router.push('/');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      <h1>My Saved Items</h1>

      {deleteSuccess && <div>Item deleted successfully!</div>}
      {deleteError && <div>Error deleting item!</div>}

      <button onClick={navigateHome} style={{ marginBottom: '20px' }}>New Search</button>

      {isLoading ? (
        <p>Loading Saved Items...</p>
      ) : savedItems.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* TODO: Handle case when user has many saved items. Can use infinite scrolling or numerical pages */}
          {/* TODO: Implement sorting of saved items, like by date or price */}
          {savedItems.map(item => (
            <li key={item.sku} style={{ border: '1px solid #ddd', width: '80%', maxWidth: '500px', margin: '10px', padding: '10px', borderRadius: '8px', textAlign: 'left', wordWrap: 'break-word' }}>
              <div>Name: {item.name}</div>
              <div>Price: ${item.salePrice}</div>
              <button onClick={() => handleDeleteItem(item.sku)} style={{ marginTop: '10px' }}>Delete from Wishlist</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No saved items found</p>
      )}
    </div>
  );
};

export default SavedItems;
