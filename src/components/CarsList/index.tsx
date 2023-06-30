import React, { FC, useState, useEffect, useRef } from 'react';

import Container from '@components/Container';
import Dropdown from '@components/Dropdown';
import { useAppSelector } from '@hooks';
import { selectCars } from '@store/cars/selectors';
import { selectPage, selectLimit } from '@store/filters/selectors';
import { Action } from '@types';
import { getCarsPerPage } from '@utils';

import './CarsList.scss';

const CarsList: FC = () => {
  const cars = useAppSelector(selectCars);
  const page = useAppSelector(selectPage);
  const limit = useAppSelector(selectLimit);

  const tableRef = useRef<HTMLTableElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const actions = Object.values(Action);

  const paginatedCars = getCarsPerPage({ page, limit, cars });

  const [dropdown, setDropdown] = useState<{ [car: number]: boolean }>({});

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.parentElement?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [page]);

  const chooseOptionHandler = () => {
    console.log('first');
  };

  const openDropdownHandler = (car: number) => {
    setDropdown(prevState => ({
      ...prevState,
      [car]: !prevState[car],
    }));
  };

  const closeDropdownHandler = () => {
    const updatedDropdown = Object.entries(dropdown).reduce(
      (updatedState, [car, value]) => {
        if (value) {
          updatedState[Number(car)] = false;
        }
        return updatedState;
      },
      { ...dropdown }
    );

    setDropdown(updatedDropdown);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      closeDropdownHandler();
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
                  <td className="cars__table-data">
                    <button
                      type="button"
                      className={
                        dropdown[id]
                          ? 'cars__table-button cars__table-button_active'
                          : 'cars__table-button'
                      }
                      onClick={() => openDropdownHandler(id)}
                    >
                      Choose an action
                    </button>
                    {dropdown[id] && (
                      <Dropdown
                        items={actions}
                        onChooseOption={chooseOptionHandler}
                        ref={dropdownRef}
                      />
                    )}
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
