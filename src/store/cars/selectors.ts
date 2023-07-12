import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@store';
import {
  selectSortStatus,
  selectColors,
  selectCompany,
  selectModel,
  selectAvailable,
} from '@store/filters/selectors';
import { SortStatus } from '@types';

export const selectCars = (state: RootState) => state.cars.items;

export const selectIsLoading = (state: RootState) => state.cars.isLoading;

export const selectError = (state: RootState) => state.cars.error;

export const selectVisibleCars = createSelector(
  [selectCars, selectColors, selectCompany, selectModel, selectAvailable, selectSortStatus],
  (cars, colors, company, model, available, status) => {
    const visibleCars = cars.filter(car => {
      const carColor = car.car_color.toLowerCase();
      const carCompany = car.car.trim().toLowerCase();
      const carModel = car.car_model.trim().toLowerCase();
      const isCarAvailable = car.availability;

      const matchesColor =
        !colors.length || (colors.length && colors.some(color => color.toLowerCase() === carColor));

      const matchesCompany = !company || (company.trim() && carCompany.includes(company.trim()));

      const matchesModel = !model || (model.trim() && carModel.includes(model.trim()));

      const matchesAvailability = !available || isCarAvailable;

      return matchesColor && matchesCompany && matchesModel && matchesAvailability;
    });
    switch (status) {
      case SortStatus.COMPANY_A_Z:
        visibleCars.sort((a, b) => a.car.localeCompare(b.car));
        break;

      case SortStatus.COMPANY_Z_A:
        visibleCars.sort((a, b) => b.car.localeCompare(a.car));
        break;

      case SortStatus.MODEL_A_Z:
        visibleCars.sort((a, b) => a.car_model.localeCompare(b.car_model));
        break;

      case SortStatus.MODEL_Z_A:
        visibleCars.sort((a, b) => b.car_model.localeCompare(a.car_model));
        break;

      case SortStatus.YEAR_A_Z:
        visibleCars.sort((a, b) => a.car_model_year - b.car_model_year);
        break;

      case SortStatus.YEAR_Z_A:
        visibleCars.sort((a, b) => b.car_model_year - a.car_model_year);
        break;

      case SortStatus.PRICE_A_Z:
        visibleCars.sort((a, b) => Number(a.price.slice(1)) - Number(b.price.slice(1)));
        break;

      case SortStatus.PRICE_Z_A:
        visibleCars.sort((a, b) => Number(b.price.slice(1)) - Number(a.price.slice(1)));
        break;

      default:
        visibleCars;
    }
    return visibleCars;
  }
);
