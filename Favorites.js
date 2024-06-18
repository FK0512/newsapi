import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../features/newsSlice';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const favorites = useSelector((state) => state.news.favorites);
  const dispatch = useDispatch();

  const handleRemoveFavorite = (article) => {
    dispatch(removeFavorite(article));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Favorite Articles</h1>
      {favorites.length === 0 ? (
        <p>No favorite articles yet.</p>
      ) : (
        favorites.map((article) => (
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
            <button onClick={() => handleRemoveFavorite(article)} className="ml-2 text-red-500">
              Remove from Favorites
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Favorites;
