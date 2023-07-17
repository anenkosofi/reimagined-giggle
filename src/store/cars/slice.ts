import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Car } from '@types';

import { getCars } from './operations';

export interface CarsState {
  items: Car[];
  isLoading: boolean;
  error: null | string;
  addedCars: Car[];
}

const carsInitialState: CarsState = {
  items: [],
  isLoading: false,
  error: null,
  addedCars: [],
};

const carsSlice = createSlice({
  name: 'cars',
  initialState: carsInitialState,
  reducers: {
    addCar(state, { payload }: PayloadAction<Car>) {
      return { ...state, addedCars: [payload, ...state.addedCars] };
    },
    removeCar(state, { payload }: PayloadAction<number>) {
      return { ...state, items: state.items.filter(({ id }) => id !== payload) };
    },
  },
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

export const { addCar, removeCar } = carsSlice.actions;
export const carsReducer = carsSlice.reducer;
