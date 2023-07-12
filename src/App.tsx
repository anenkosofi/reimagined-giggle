import React, { FC, useEffect } from 'react';

import CarsList from '@components/CarsList';
import Pagination from '@components/Pagination';
import Switcher from '@components/Switcher';
import { useAppDispatch, useAppSelector } from '@hooks';
import { getCars } from '@store/cars/operations';
import { selectVisibleCars } from '@store/cars/selectors';

import '@components/CarsList/CarsList.scss';

const App: FC = () => {
  const dispatch = useAppDispatch();

  const visibleCars = useAppSelector(selectVisibleCars);

  useEffect(() => {
    dispatch(getCars());
  }, []);

  return (
    <main>
      <section className="cars">
        <Switcher />
        <CarsList />
        {Boolean(visibleCars.length) && <Pagination />}
      </section>
    </main>
  );
};

export default App;
