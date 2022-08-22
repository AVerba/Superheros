import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filter: '',
};

export const heroesSlice = createSlice({
  name: 'heroes',
  initialState,

  reducers: {
    setFilter: (state, { payload }) => {
      return { filter: payload };
    },
  },
});

export const { setFilter } = heroesSlice.actions;
export const getFilter = state => state.filter;
