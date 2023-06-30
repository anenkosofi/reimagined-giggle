import { RootState } from '../index';

export const selectCars = (state: RootState) => state.cars.items;

export const selectIsLoading = (state: RootState) => state.cars.isLoading;

export const selectError = (state: RootState) => state.cars.error;
