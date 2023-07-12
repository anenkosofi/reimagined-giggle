import React, { FC, useState, useEffect, useRef } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { MdOutlineArrowDropUp, MdOutlineArrowDropDown, MdOutlineFilterAlt } from 'react-icons/md';

import CarItem from '@components/CarItem';
import ColorForm from '@components/ColorForm';
import Container from '@components/Container';
import { useAppSelector, useAppDispatch } from '@hooks';
import { selectVisibleCars } from '@store/cars/selectors';
import { selectPage, selectLimit } from '@store/filters/selectors';
import { setSortStatus } from '@store/filters/slice';
import { SortStatus } from '@types';
import { getCarsPerPage } from '@utils';

import './CarsList.scss';

const CarsList: FC = () => {
  const dispatch = useAppDispatch();

  const cars = useAppSelector(selectVisibleCars);
  const page = useAppSelector(selectPage);
  const limit = useAppSelector(selectLimit);

  const tableRef = useRef<HTMLTableElement | null>(null);
  const colorFormRef = useRef<HTMLTableElement | null>(null);

  const paginatedCars = getCarsPerPage({ page, limit, cars });

  const [isColorFormOpened, setIsColorFormOpened] = useState(false);

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.parentElement?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [page]);

  const setStatusHandler = (status: SortStatus) => dispatch(setSortStatus(status));

  const toggleColorFormHandler = () => setIsColorFormOpened(prevState => !prevState);

  const closeColorFormHandler = () => setIsColorFormOpened(false);

  const handleClickOutside = (e: MouseEvent) => {
    if (colorFormRef.current && !colorFormRef.current.contains(e.target as Node)) {
      closeColorFormHandler();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <section className="cars">
      <Container>
        <table className="cars__table" ref={tableRef}>
          <thead className="cars__table-head">
            <tr className="cars__table-row">
              <th className="cars__table-title">
                <span>Company</span>
                <div className="cars__table-control">
                  <div className="cars__sort-control">
                    <button
                      type="button"
                      className="cars__arrow-button"
                      onClick={() => setStatusHandler(SortStatus.COMPANY_A_Z)}
                    >
                      <MdOutlineArrowDropUp size={16} />
                    </button>
                    <button
                      type="button"
                      className="cars__arrow-button"
                      onClick={() => setStatusHandler(SortStatus.COMPANY_Z_A)}
                    >
                      <MdOutlineArrowDropDown size={16} />
                    </button>
                  </div>
                  <button type="button" className="cars__search-button">
                    <IoSearchOutline size={20} />
                  </button>
                </div>
              </th>
              <th className="cars__table-title">
                <span>Model</span>
                <div className="cars__table-control">
                  <div className="cars__sort-control">
                    <button
                      type="button"
                      className="cars__arrow-button"
                      onClick={() => setStatusHandler(SortStatus.MODEL_A_Z)}
                    >
                      <MdOutlineArrowDropUp size={16} />
                    </button>
                    <button
                      type="button"
                      className="cars__arrow-button"
                      onClick={() => setStatusHandler(SortStatus.MODEL_Z_A)}
                    >
                      <MdOutlineArrowDropDown size={16} />
                    </button>
                  </div>
                  <button type="button" className="cars__search-button">
                    <IoSearchOutline size={20} />
                  </button>
                </div>
              </th>
              <th className="cars__table-title">VIN</th>
              <th className="cars__table-title cars__table-title_relative">
                <span>Color</span>
                <button
                  type="button"
                  className="cars__search-button"
                  onClick={toggleColorFormHandler}
                >
                  <MdOutlineFilterAlt size={20} />
                </button>
                {isColorFormOpened && <ColorForm ref={colorFormRef} />}
              </th>
              <th className="cars__table-title">
                <span>Year</span>
                <div className="cars__sort-control">
                  <button
                    type="button"
                    className="cars__arrow-button"
                    onClick={() => setStatusHandler(SortStatus.YEAR_A_Z)}
                  >
                    <MdOutlineArrowDropUp size={16} />
                  </button>
                  <button
                    type="button"
                    className="cars__arrow-button"
                    onClick={() => setStatusHandler(SortStatus.YEAR_Z_A)}
                  >
                    <MdOutlineArrowDropDown size={16} />
                  </button>
                </div>
              </th>
              <th className="cars__table-title">
                <span>Price</span>
                <div className="cars__sort-control">
                  <button
                    type="button"
                    className="cars__arrow-button"
                    onClick={() => setStatusHandler(SortStatus.PRICE_A_Z)}
                  >
                    <MdOutlineArrowDropUp size={16} />
                  </button>
                  <button
                    type="button"
                    className="cars__arrow-button"
                    onClick={() => setStatusHandler(SortStatus.PRICE_Z_A)}
                  >
                    <MdOutlineArrowDropDown size={16} />
                  </button>
                </div>
              </th>
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
