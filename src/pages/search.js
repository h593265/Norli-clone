import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { config } from '../util/config';
import ProductListSearch from '../list/product-list-search';
import ErrorPage from './page404';

function SearchResults({showpopup}) {
  const { searchValue } = useParams(); 
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);  
      try {
        const response = await fetch(`${config.API_URL}/products/search?query=${encodeURIComponent(searchValue)}`);
        if (!response.ok) {
          setSearchResults([]); 
          throw new Error('Failed to fetch search results');
        }
        const results = await response.json();
        setSearchResults(results);
        
      } catch (error) {
        setError(error.message);
        setSearchResults([]); 
      } finally {
        setLoading(false);
      }
    };

    if (searchValue) {
      fetchSearchResults();
    } else {
      setSearchResults([]); 
      setLoading(false);
    }
  }, [searchValue]); 

  

  return (
    <div className="">
      <h1>Search Results for "{searchValue}"</h1>
      {searchResults.length > 0 ? (
        <ProductListSearch products= {searchResults} allowinteractives={true} showpopup = {showpopup}/> 
      ) : (
        <ErrorPage 
        title ={"Vi fant dessverre ingen produkter på søket " + "\"" +searchValue + "\""}
        subtitle={"Er du sikker på at du har skrevet søket ditt riktig?"} 
        showpopup={showpopup}/>
      )}
    </div>
  );
}

export default SearchResults;
