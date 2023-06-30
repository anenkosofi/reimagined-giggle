import { Car } from '@types';

type Parameters = {
  page: number;
  limit: number;
  cars: Car[];
};

export const getCarsPerPage = ({ page, limit, cars }: Parameters) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return cars.slice(startIndex, endIndex);
};
