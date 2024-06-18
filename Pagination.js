
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage, fetchNews } from '../features/newsSlice';

const Pagination = () => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.news.page);
  const category = useSelector((state) => state.news.category);

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
    dispatch(fetchNews({ category, page: newPage }));
  };

  return (
    <div className="flex justify-center space-x-2">
      <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className="p-2 border rounded">Previous</button>
      <span className="p-2">{page}</span>
      <button onClick={() => handlePageChange(page + 1)} className="p-2 border rounded">Next</button>
    </div>
  );
};

export default Pagination;
