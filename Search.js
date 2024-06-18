
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchNews } from '../features/news/newsSlice';

const Search = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    event.preventDefault();
    dispatch(fetchNews({ category: 'general', page: 1, query }));
  };

  return (
    <form onSubmit={handleSearch} className="flex mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for articles..."
        className="p-2 border rounded w-full"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">Search</button>
    </form>
  );
};

export default Search;
