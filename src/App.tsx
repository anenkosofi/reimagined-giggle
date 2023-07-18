import React, { FC, useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';

import CarForm from '@components/CarForm';
import CarsList from '@components/CarsList';
import Container from '@components/Container';
import Modal from '@components/Modal';
import Pagination from '@components/Pagination';
import Switcher from '@components/Switcher';
import { useAppDispatch, useAppSelector } from '@hooks';
import { getCars } from '@store/cars/operations';
import { selectVisibleCars } from '@store/cars/selectors';

import '@components/CarsList/CarsList.scss';

const App: FC = () => {
  const dispatch = useAppDispatch();

  const visibleCars = useAppSelector(selectVisibleCars);

  const [isAddFormOpened, setIsAddFormOpened] = useState(false);

  useEffect(() => {
    dispatch(getCars());
  }, []);

  useEffect(() => {
    const bodyEl = document.getElementById('body') as HTMLElement;

    bodyEl.style.overflow = isAddFormOpened ? 'hidden' : 'visible';
  }, [isAddFormOpened]);

  const openCarFormHandler = () => setIsAddFormOpened(true);

  const closeCarFormHandler = () => setIsAddFormOpened(false);

  return (
    <main>
      <section className="cars">
        <Container>
          <div className="cars__header">
            <Switcher />
            <button type="button" className="cars__add" onClick={openCarFormHandler}>
              <MdAdd size={20} />
              <span>Add car</span>
            </button>
          </div>
          <CarsList />
          {Boolean(visibleCars.length) && <Pagination />}
          {isAddFormOpened && (
            <Modal closeModal={closeCarFormHandler}>
              <CarForm closeModal={closeCarFormHandler} />
            </Modal>
          )}
        </Container>
      </section>
    </main>
  );
};

export default App;
