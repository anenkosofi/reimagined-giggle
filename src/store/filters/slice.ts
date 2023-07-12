import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { SortStatus } from '@types';

const LIMIT = 20;
const START_PAGE = 1;

export interface FiltersState {
  page: number;
  limit: number;
  sortStatus: SortStatus | null;
  colors: string[];
}

const filtersInitialState: FiltersState = {
  page: START_PAGE,
  limit: LIMIT,
  sortStatus: null,
  colors: [],
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState: filtersInitialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      return { ...state, page: action.payload };
    },
    setSortStatus(state, { payload }: PayloadAction<SortStatus | null>) {
      return { ...state, sortStatus: payload };
    },
    setColor(state, { payload }: PayloadAction<string>) {
      return {
        ...state,
        colors: state.colors.includes(payload)
          ? state.colors.filter(color => color !== payload)
          : [...state.colors, payload],
      };
    },
  },
});

export const { setPage, setSortStatus, setColor } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
