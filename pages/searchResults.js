import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const router = useRouter();
  const { query } = router.query;

  useEffect(() => {
    console.log("Search query received:", query);
    if (query) {
      fetch(`/api/search?term=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => setResults(data))
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [query]);

  return (
    <div>
      <h1>Search Results</h1>
      <ul>
        {results.map(product => (
          <li key={product.sku}>
            {product.name} - ${product.salePrice}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
