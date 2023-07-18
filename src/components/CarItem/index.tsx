import React, { FC, useState, useEffect, useRef } from 'react';

import CarForm from '@components/CarForm';
import DeleteForm from '@components/DeleteForm';
import Dropdown from '@components/Dropdown';
import Modal from '@components/Modal';
import { Car, Action } from '@types';
import { getTagStyle } from '@utils';

type CarItemProps = {
  car: Car;
};

const CarItem: FC<CarItemProps> = ({
  car: { id, car, car_model, car_color, car_model_year, car_vin, price, availability },
}) => {
  const actionDropdownRef = useRef<HTMLDivElement>(null);

  const actions = Object.values(Action);

  const carDetails = {
    id,
    company: car,
    model: car_model,
    color: car_color,
    year: car_model_year.toString(),
    vin: car_vin,
    price,
    availability,
  };

  const [actionDropdown, setActionDropdown] = useState<{ [car: number]: boolean }>({});
  const [deleteForm, setDeleteForm] = useState(false);
  const [editForm, setEditForm] = useState(false);

  useEffect(() => {
    const bodyEl = document.getElementById('body') as HTMLElement;

    bodyEl.style.overflow = deleteForm ? 'hidden' : 'visible';
  }, [deleteForm]);

  useEffect(() => {
    const bodyEl = document.getElementById('body') as HTMLElement;

    bodyEl.style.overflow = editForm ? 'hidden' : 'visible';
  }, [editForm]);

  const openActionDropdownHandler = (car: number) => {
    setActionDropdown(prevState => ({
      ...prevState,
      [car]: !prevState[car],
    }));
  };

  const closeActionDropdownHandler = () => {
    const updatedDropdown = Object.entries(actionDropdown).reduce(
      (updatedState, [car, value]) => {
        if (value) {
          updatedState[Number(car)] = false;
        }
        return updatedState;
      },
      { ...actionDropdown }
    );

    setActionDropdown(updatedDropdown);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (actionDropdownRef.current && !actionDropdownRef.current.contains(e.target as Node)) {
      closeActionDropdownHandler();
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
      return setDeleteForm(true);
    }
    return setEditForm(true);
  };

  const closeDeleteFormHandler = () => setDeleteForm(false);

  const closeEditFormHandler = () => setEditForm(false);

  const tagStyle = getTagStyle(car_color);

  return (
    <>
      <tr className="cars__table-row">
        <td className="cars__table-data cars__table-data_car">{car}</td>
        <td className="cars__table-data cars__table-data_model">{car_model}</td>
        <td className="cars__table-data cars__table-data_vin">{car_vin}</td>
        <td className="cars__table-data">
          <span className="cars__table-data_color" style={tagStyle.style}>
            {car_color}
          </span>
        </td>
        <td className="cars__table-data">{car_model_year}</td>
        <td className="cars__table-data">{price}</td>
        <td className="cars__table-data">{availability ? 'Available' : 'Not available'}</td>
        <td className="cars__table-data">
          <button
            type="button"
            className={
              actionDropdown[id]
                ? 'cars__table-button cars__table-button_active'
                : 'cars__table-button'
            }
            onClick={() => openActionDropdownHandler(id)}
          >
            Choose an action
          </button>
          {actionDropdown[id] && (
            <Dropdown
              items={actions}
              onChooseOption={chooseOptionHandler}
              ref={actionDropdownRef}
            />
          )}
        </td>
      </tr>
      {deleteForm && (
        <Modal closeModal={closeDeleteFormHandler}>
          <DeleteForm id={id} company={car} model={car_model} closeModal={closeDeleteFormHandler} />
        </Modal>
      )}
      {editForm && (
        <Modal closeModal={closeDeleteFormHandler}>
          <CarForm carDetails={carDetails} closeModal={closeEditFormHandler} />
        </Modal>
      )}
    </>
  );
};

export default CarItem;
