import { createSlice } from '@reduxjs/toolkit';

import { Car } from '@types';

import { getCars } from './operations';

export interface CarsState {
  items: Car[];
  isLoading: boolean;
  error: null | string;
}

const carsInitialState: CarsState = {
  items: [],
  isLoading: false,
  error: null,
};

const carsSlice = createSlice({
  name: 'cars',
  initialState: carsInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCars.pending, state => {
      return { ...state, isLoading: true };
    });
    builder.addCase(getCars.fulfilled, (state, { payload }) => {
      return { ...state, error: null, items: [...payload], isLoading: false };
    });
    builder.addCase(getCars.rejected, (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        error: payload ? payload : 'An unknown error occured',
      };
    });
  },
});

export const carsReducer = carsSlice.reducer;
