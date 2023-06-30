import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { Car } from '@types';

axios.defaults.baseURL = 'https://myfakeapi.com/api/';

export const getCars = createAsyncThunk<Car[], undefined, { rejectValue: string }>(
  'cars/get',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get<{ cars: Car[] }>('/cars');
      return data.cars;
    } catch (e: unknown) {
      if (e instanceof Error) {
        return thunkAPI.rejectWithValue(e.message);
      }
      return thunkAPI.rejectWithValue('An unknown error occurred.');
    }
  }
);
