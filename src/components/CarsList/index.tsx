import React, { FC } from 'react';

import Container from '@components/Container';
import { useAppSelector } from '@hooks';
import { selectCars } from '@store/cars/selectors';
import { selectPage, selectLimit } from '@store/filters/selectors';
import { getCarsPerPage } from '@utils';

import './CarsList.scss';

const CarsList: FC = () => {
  const cars = useAppSelector(selectCars);
  const page = useAppSelector(selectPage);
  const limit = useAppSelector(selectLimit);

  const paginatedCars = getCarsPerPage({ page, limit, cars });

  return (
    <section className="cars">
      <Container>
        <table className="cars__table">
          <thead className="cars__table-head">
            <tr>
              <th className="cars__table-title">Company</th>
              <th className="cars__table-title">Model</th>
              <th className="cars__table-title">VIN</th>
              <th className="cars__table-title">Color</th>
              <th className="cars__table-title">Year</th>
              <th className="cars__table-title">Price</th>
              <th className="cars__table-title">Availability</th>
              <th className="cars__table-title">Actions</th>
            </tr>
          </thead>
          <tbody className="cars__table-body">
            {paginatedCars.map(
              ({ id, car, car_model, car_color, car_model_year, car_vin, price, availability }) => (
                <tr key={id} className="cars__table-row">
                  <td className="cars__table-data">{car}</td>
                  <td className="cars__table-data">{car_model}</td>
                  <td className="cars__table-data">{car_vin}</td>
                  <td className="cars__table-data">{car_color}</td>
                  <td className="cars__table-data">{car_model_year}</td>
                  <td className="cars__table-data">{price}</td>
                  <td className="cars__table-data">
                    {availability ? 'Available' : 'Not available'}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </Container>
    </section>
  );
};

export default CarsList;
