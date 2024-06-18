import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNews, setCategory, setPage, addFavorite, removeFavorite } from '../features/newsSlice';
import '../index.css';


const ArticleList = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.news.articles);
  const favorites = useSelector((state) => state.news.favorites);
  const status = useSelector((state) => state.news.status);
  const category = useSelector((state) => state.news.category);
  const page = useSelector((state) => state.news.page);

  React.useEffect(() => {
    dispatch(fetchNews({ category, page }));
  }, [dispatch, category, page]);

  const isFavorite = (article) => favorites.some(fav => fav.url === article.url);

  const handleAddFavorite = (article) => {
    dispatch(addFavorite(article));
  };

  const handleRemoveFavorite = (article) => {
    dispatch(removeFavorite(article));
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading news</div>;
  }

  return (
    <div>
      {articles.map((article) => (
        <div key={article.url} className="mb-4">
          <h2 className="text-xl font-bold">{article.title}</h2>
          {article.urlToImage ? (
            <img src={article.urlToImage} alt={article.title} className="w-full h-48 object-cover" />
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
              <span>No image available</span>
            </div>
          )}
          <p>{article.description}</p>
          <Link to={`/article/${encodeURIComponent(article.url)}`} className="text-blue-500">
            Read more
          </Link>
          {isFavorite(article) ? (
            <button onClick={() => handleRemoveFavorite(article)} className="ml-2 text-red-500">
              Remove from Favorites
            </button>
          ) : (
            <button onClick={() => handleAddFavorite(article)} className="ml-2 text-green-500">
              Add to Favorites
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
