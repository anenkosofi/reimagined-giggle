import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const LIMIT = 50;
const START_PAGE = 1;

export interface FiltersState {
  page: number;
  limit: number;
}

const filtersInitialState: FiltersState = {
  page: START_PAGE,
  limit: LIMIT,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState: filtersInitialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      return { ...state, page: action.payload };
    },
  },
});

export const { setPage } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
