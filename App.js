
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchNews } from './features/newsSlice';
import ArticleList from './components/ArticleList';
import ArticleDetail from './components/ArticleDetail';
import CategoryFilter from './components/CategoryFilter';
import Pagination from './components/Pagination';
import Favorites from './components/Favorites';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNews({ category: 'general', page: 1 }));
  }, [dispatch]);

  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-4">News App</h1>
        <CategoryFilter />
        <Routes>
          <Route path="/" element={<><ArticleList /><Pagination /></>} />
          <Route path="/article/:articleUrl" element={<ArticleDetail />} />
          <Route path="/favorites" element={<Favorites />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;
