import React, { FC, useState, useEffect, useRef } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { MdOutlineArrowDropUp, MdOutlineArrowDropDown, MdOutlineFilterAlt } from 'react-icons/md';

import CarItem from '@components/CarItem';
import ColorForm from '@components/ColorForm';
import Container from '@components/Container';
import Notification from '@components/Notification';
import SearchForm from '@components/SearchForm';
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
  const colorFormRef = useRef<HTMLDivElement | null>(null);
  const companyFormRef = useRef<HTMLDivElement | null>(null);
  const modelFormRef = useRef<HTMLDivElement | null>(null);

  const paginatedCars = getCarsPerPage({ page, limit, cars });

  const [isColorFormOpened, setIsColorFormOpened] = useState(false);
  const [isCompanyFormOpened, setIsCompanyFormOpened] = useState(false);
  const [isModelFormOpened, setIsModelFormOpened] = useState(false);

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.parentElement?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [page]);

  const setStatusHandler = (e: React.MouseEvent, status: SortStatus) => {
    e.stopPropagation();
    dispatch(setSortStatus(status));
  };
  const resetStatusHandler = () => dispatch(setSortStatus(null));

  const toggleColorFormHandler = () => setIsColorFormOpened(prevState => !prevState);

  const closeColorFormHandler = () => setIsColorFormOpened(false);

  const toggleCompanyFormHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCompanyFormOpened(prevState => !prevState);
  };

  const closeCompanyFormHandler = () => setIsCompanyFormOpened(false);

  const toggleModelFormHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModelFormOpened(prevState => !prevState);
  };

  const closeModelFormHandler = () => setIsModelFormOpened(false);

  const handleClickOutside = (e: MouseEvent) => {
    if (colorFormRef.current && !colorFormRef.current.contains(e.target as Node)) {
      return closeColorFormHandler();
    }
    if (companyFormRef.current && !companyFormRef.current.contains(e.target as Node)) {
      return closeCompanyFormHandler();
    }
    if (modelFormRef.current && !modelFormRef.current.contains(e.target as Node)) {
      return closeModelFormHandler();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Container>
      <table className="cars__table" ref={tableRef}>
        <thead className="cars__table-head">
          <tr className="cars__table-row">
            <th
              className="cars__table-title cars__table-title_relative"
              title="Click to reset sorting"
              onClick={resetStatusHandler}
            >
              <span>Company</span>
              <div className="cars__table-control">
                <div className="cars__sort-control">
                  <button
                    type="button"
                    title="Click to sort ascending"
                    className="cars__arrow-button"
                    onClick={e => setStatusHandler(e, SortStatus.COMPANY_A_Z)}
                  >
                    <MdOutlineArrowDropUp size={16} />
                  </button>
                  <button
                    type="button"
                    title="Click to sort descending"
                    className="cars__arrow-button"
                    onClick={e => setStatusHandler(e, SortStatus.COMPANY_Z_A)}
                  >
                    <MdOutlineArrowDropDown size={16} />
                  </button>
                </div>
                <button
                  type="button"
                  title=""
                  className="cars__search-button"
                  onClick={toggleCompanyFormHandler}
                >
                  <IoSearchOutline size={20} />
                </button>
              </div>
              {isCompanyFormOpened && (
                <SearchForm
                  id="company"
                  name="company"
                  placeholder="Search company"
                  ref={companyFormRef}
                />
              )}
            </th>
            <th
              className="cars__table-title cars__table-title_relative"
              title="Click to reset sorting"
              onClick={resetStatusHandler}
            >
              <span>Model</span>
              <div className="cars__table-control">
                <div className="cars__sort-control">
                  <button
                    type="button"
                    title="Click to sort ascending"
                    className="cars__arrow-button"
                    onClick={e => setStatusHandler(e, SortStatus.MODEL_A_Z)}
                  >
                    <MdOutlineArrowDropUp size={16} />
                  </button>
                  <button
                    type="button"
                    title="Click to sort descending"
                    className="cars__arrow-button"
                    onClick={e => setStatusHandler(e, SortStatus.MODEL_Z_A)}
                  >
                    <MdOutlineArrowDropDown size={16} />
                  </button>
                </div>
                <button
                  type="button"
                  title="Click to search"
                  className="cars__search-button"
                  onClick={toggleModelFormHandler}
                >
                  <IoSearchOutline size={20} />
                </button>
              </div>
              {isModelFormOpened && (
                <SearchForm id="model" name="model" placeholder="Search model" ref={modelFormRef} />
              )}
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
            <th
              className="cars__table-title cars__table-title_relative"
              title="Click to reset sorting"
              onClick={resetStatusHandler}
            >
              <span>Year</span>
              <div className="cars__sort-control">
                <button
                  type="button"
                  title="Click to sort ascending"
                  className="cars__arrow-button"
                  onClick={e => setStatusHandler(e, SortStatus.YEAR_A_Z)}
                >
                  <MdOutlineArrowDropUp size={16} />
                </button>
                <button
                  type="button"
                  title="Click to sort descending"
                  className="cars__arrow-button"
                  onClick={e => setStatusHandler(e, SortStatus.YEAR_Z_A)}
                >
                  <MdOutlineArrowDropDown size={16} />
                </button>
              </div>
            </th>
            <th
              className="cars__table-title cars__table-title_relative"
              title="Click to reset sorting"
              onClick={resetStatusHandler}
            >
              <span>Price</span>
              <div className="cars__sort-control">
                <button
                  type="button"
                  title="Click to sort ascending"
                  className="cars__arrow-button"
                  onClick={e => setStatusHandler(e, SortStatus.PRICE_A_Z)}
                >
                  <MdOutlineArrowDropUp size={16} />
                </button>
                <button
                  type="button"
                  title="Click to sort descending"
                  className="cars__arrow-button"
                  onClick={e => setStatusHandler(e, SortStatus.PRICE_Z_A)}
                >
                  <MdOutlineArrowDropDown size={16} />
                </button>
              </div>
            </th>
            <th className="cars__table-title">Availability</th>
            <th className="cars__table-title">Actions</th>
          </tr>
        </thead>
        {paginatedCars.length ? (
          <tbody className="cars__table-body">
            {paginatedCars.map(car => (
              <CarItem key={car.id} car={car} />
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan={8}>
                <Notification message="We are sorry, but the cars you were looking for can’t be found..." />
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </Container>
  );
};

export default CarsList;
