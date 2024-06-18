import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchNews as fetchNewsFromAPI } from './newsAPI';

// Fetch news thunk
export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async ({ category, page }) => {
    const data = await fetchNewsFromAPI(category, page);
    return data;
  }
);

// Utility function to load favorites from local storage
const loadFavorites = () => {
  try {
    const serializedFavorites = localStorage.getItem('favorites');
    return serializedFavorites ? JSON.parse(serializedFavorites) : [];
  } catch (err) {
    return [];
  }
};

// Utility function to save favorites to local storage
const saveFavorites = (favorites) => {
  try {
    const serializedFavorites = JSON.stringify(favorites);
    localStorage.setItem('favorites', serializedFavorites);
  } catch (err) {
    // Handle error
  }
};

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    articles: [],
    status: 'idle',
    error: null,
    category: 'general',
    page: 1,
    favorites: loadFavorites(), // Load favorites from local storage
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
      saveFavorites(state.favorites);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (article) => article.url !== action.payload.url
      );
      saveFavorites(state.favorites);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload.articles;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setCategory, setPage, addFavorite, removeFavorite } = newsSlice.actions;

export default newsSlice.reducer;
