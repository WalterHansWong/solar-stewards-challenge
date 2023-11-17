import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import SearchResults from './searchResults';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';

// Mock useRouter
jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: { query: 'test' },
      push: jest.fn(),
    };
  },
}));

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
  localStorage.setItem('userID', 'test-user-id'); // Mock local storage
});

describe('SearchResults', () => {
  it('displays loading message during fetch', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: [] }), { delay: 500 }); // Delay the response
  
    const { getByText, queryByText } = render(<SearchResults />);
  
    // Assert the loading message is displayed
    expect(getByText('Fetching Results from BestBuy...')).toBeInTheDocument();
  
    // Wait for the fetch to complete
    await waitFor(() => expect(queryByText('Fetching Results from BestBuy...')).toBeNull());
  });

  it('displays success message on successful save', async () => {
    // Mock successful BestBuy API call 
    fetchMock.mockResponseOnce(JSON.stringify([{ sku: '123', name: 'Product 1', salePrice: '100' }]));
    // Mock successful save
    fetchMock.mockResponseOnce(JSON.stringify({}));
  
    const { getByText, findByText } = render(<SearchResults />);
    
    // Wait for the search results to load
    // Use a regular expression to offer flexibility of matching
    await waitFor(() => getByText(/Product 1/i));

    const saveButton = getByText('Save to Wishlist');
    fireEvent.click(saveButton);

    const successMessage = await findByText('Item saved successfully!');
    expect(successMessage).toBeInTheDocument();
  });
  
  it('displays error message on failed save', async () => {
    // Mock successful BestBuy API call 
    fetchMock.mockResponseOnce(JSON.stringify([{ sku: '123', name: 'Product 1', salePrice: '100' }]));
    // Mock failed save
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 500 });
  
    const { getByText, findByText } = render(<SearchResults />);

    // Wait for the search results to load
    // Use a regular expression to offer flexibility of matching
    await waitFor(() => getByText(/Product 1/i));

    const saveButton = getByText('Save to Wishlist');
    fireEvent.click(saveButton);

    const errorMessage = await findByText('Error saving item!');
    expect(errorMessage).toBeInTheDocument();
  });
});
