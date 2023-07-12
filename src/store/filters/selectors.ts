import { RootState } from '@store';

export const selectPage = (state: RootState) => state.filters.page;

export const selectLimit = (state: RootState) => state.filters.limit;

export const selectSortStatus = (state: RootState) => state.filters.sortStatus;

export const selectColors = (state: RootState) => state.filters.colors;
