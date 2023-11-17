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
    const userID = localStorage.getItem('userID');
    if (!userID) {
      console.error('User ID not found');
      return;
    }
  
    try {
      const response = await fetch('/api/deleteItem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID, sku }),
      });
  
      if (!response.ok) throw new Error('Error deleting item');
  
      // Update the local state to reflect the deletion
      setSavedItems(prevItems => prevItems.filter(item => item.sku !== sku));
      setDeleteSuccess(true); // Set deleteSuccess to true when item is deleted successfully
      setTimeout(() => setDeleteSuccess(false), 3000); // Reset the deleteSuccess state after a few seconds
    } catch (error) {
      console.error('Error deleting item:', error);
      setDeleteError(true); // Set deleteError to true when there is an error in deletion
      setTimeout(() => setDeleteError(false), 3000); // Reset the deleteError state after a few seconds
    }
  };

  const navigateHome = () => {
    router.push('/');
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
      
      <h1>My Saved Items</h1>

      {deleteSuccess && (
        <div style={{ position: 'fixed', top: '10px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'lightgreen', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', animation: 'fadein 0.5s, fadeout 0.5s 2.5s' }}>
          Item deleted successfully!
        </div>
      )}

      {deleteError && (
        <div style={{ position: 'fixed', top: '10px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'pink', color: 'darkred', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', animation: 'fadein 0.5s, fadeout 0.5s 2.5s' }}>
          Error deleting item!
        </div>
      )}

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
