import React, { FC, useState, useEffect, useRef } from 'react';

import DeleteForm from '@components/DeleteForm';
import Dropdown from '@components/Dropdown';
import Modal from '@components/Modal';
import { Car, Action } from '@types';

type CarItemProps = {
  car: Car;
};

const CarItem: FC<CarItemProps> = ({
  car: { id, car, car_model, car_color, car_model_year, car_vin, price, availability },
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const actions = Object.values(Action);

  const [dropdown, setDropdown] = useState<{ [car: number]: boolean }>({});
  const [deleteForm, setDeleteForm] = useState(false);

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

  const chooseOptionHandler = (name: string) => {
    if (name === Action.DELETE) {
      setDeleteForm(true);
    }
  };

  const closeDeleteFormHandler = () => {
    setDeleteForm(false);
  };

  return (
    <>
      <tr key={id} className="cars__table-row">
        <td className="cars__table-data">{car}</td>
        <td className="cars__table-data">{car_model}</td>
        <td className="cars__table-data">{car_vin}</td>
        <td className="cars__table-data">{car_color}</td>
        <td className="cars__table-data">{car_model_year}</td>
        <td className="cars__table-data">{price}</td>
        <td className="cars__table-data">{availability ? 'Available' : 'Not available'}</td>
        <td className="cars__table-data">
          <button
            type="button"
            className={
              dropdown[id] ? 'cars__table-button cars__table-button_active' : 'cars__table-button'
            }
            onClick={() => openDropdownHandler(id)}
          >
            Choose an action
          </button>
          {dropdown[id] && (
            <Dropdown items={actions} onChooseOption={chooseOptionHandler} ref={dropdownRef} />
          )}
        </td>
      </tr>
      {deleteForm && (
        <Modal onCloseModal={closeDeleteFormHandler}>
          <DeleteForm id={id} company={car} model={car_model} closeModal={closeDeleteFormHandler} />
        </Modal>
      )}
    </>
  );
};

export default CarItem;
