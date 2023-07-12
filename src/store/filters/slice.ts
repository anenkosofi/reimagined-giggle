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
  company: string;
  model: string;
  available: boolean;
}

const filtersInitialState: FiltersState = {
  page: START_PAGE,
  limit: LIMIT,
  sortStatus: null,
  colors: [],
  company: '',
  model: '',
  available: false,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState: filtersInitialState,
  reducers: {
    setPage(state, { payload }: PayloadAction<number>) {
      return { ...state, page: payload };
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
    setCompany(state, { payload }: PayloadAction<string>) {
      return { ...state, page: START_PAGE, company: payload };
    },
    setModel(state, { payload }: PayloadAction<string>) {
      return { ...state, page: START_PAGE, model: payload };
    },
    setAvailable(state) {
      return { ...state, available: !state.available };
    },
  },
});

export const { setPage, setSortStatus, setColor, setCompany, setModel, setAvailable } =
  filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
