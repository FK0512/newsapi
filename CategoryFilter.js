
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, fetchNews } from '../features/newsSlice';

const CategoryFilter = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.news.category);

  const handleCategoryChange = (event) => {
    dispatch(setCategory(event.target.value));
    dispatch(fetchNews({ category: event.target.value, page: 1 }));
  };

  return (
    <select value={category} onChange={handleCategoryChange} className="p-2 border rounded">
      <option value="general">General</option>
      <option value="business">Business</option>
      <option value="technology">Technology</option>
      <option value="entertainment">Entertainment</option>
      <option value="health">Health</option>
      <option value="science">Science</option>
      <option value="sports">Sports</option>
    </select>
  );
};

export default CategoryFilter;
