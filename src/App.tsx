import React, { FC, useEffect } from 'react';

import CarsList from '@components/CarsList';
import { Pagination } from '@components/Pagination';
import { useAppDispatch } from '@hooks';
import { getCars } from '@store/cars/operations';

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCars());
  }, []);

  return (
    <main>
      <CarsList />
      <Pagination />
    </main>
  );
};

export default App;
