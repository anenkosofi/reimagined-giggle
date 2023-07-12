import { RootState } from '@store';

export const selectPage = (state: RootState) => state.filters.page;

export const selectLimit = (state: RootState) => state.filters.limit;

export const selectSortStatus = (state: RootState) => state.filters.sortStatus;

export const selectColors = (state: RootState) => state.filters.colors;

export const selectCompany = (state: RootState) => state.filters.company;

export const selectModel = (state: RootState) => state.filters.model;

export const selectAvailable = (state: RootState) => state.filters.available;
