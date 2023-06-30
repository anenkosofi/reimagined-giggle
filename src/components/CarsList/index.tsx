import React, { FC, useEffect, useRef } from 'react';

import CarItem from '@components/CarItem';
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

  const tableRef = useRef<HTMLTableElement | null>(null);

  const paginatedCars = getCarsPerPage({ page, limit, cars });

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.parentElement?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [page]);

  return (
    <section className="cars">
      <Container>
        <table className="cars__table" ref={tableRef}>
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
            {paginatedCars.map(car => (
              <CarItem key={car.id} car={car} />
            ))}
          </tbody>
        </table>
      </Container>
    </section>
  );
};

export default CarsList;
