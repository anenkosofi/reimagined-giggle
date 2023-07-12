import { Car } from '@types';

export const getCarColors = (cars: Car[]) => [...new Set(cars.map(({ car_color }) => car_color))];
