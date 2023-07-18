import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { carsReducer } from './cars/slice';
import { CarsState } from './cars/slice';
import { filtersReducer } from './filters/slice';
import { FiltersState } from './filters/slice';

const carsPersistConfig = {
  key: 'cars',
  storage,
};

const filtersPersistConfig = {
  key: 'filters',
  storage,
};

export const store = configureStore({
  reducer: {
    cars: persistReducer<CarsState>(carsPersistConfig, carsReducer),
    filters: persistReducer<FiltersState>(filtersPersistConfig, filtersReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
