import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { heroesSlice } from './heroes/heroesSlice';
import { heroesApi } from './heroes/heroesApi';

const rootReducer = combineReducers({
  filter: heroesSlice.reducer,
  [heroesApi.reducerPath]: heroesApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(heroesApi.middleware),
});
