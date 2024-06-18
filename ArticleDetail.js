import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ArticleDetail = () => {
  const { articleUrl } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = '0cdd2afe4eb4667a84c0af16d4a75f9'; 

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=Apple&apiKey=${apiKey}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const foundArticle = data.articles.find((art) => encodeURIComponent(art.url) === articleUrl);
        setArticle(foundArticle);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleUrl, apiKey]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">{article.title}</h1>
      {article.urlToImage ? (
        <img src={article.urlToImage} alt={article.title} className="w-full h-96 object-cover" />
      ) : (
        <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
          <span>No image available</span>
        </div>
      )}
      <p>{article.content}</p>
    </div>
  );
};

export default ArticleDetail;
