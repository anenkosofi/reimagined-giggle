import React, { FC } from 'react';

import { useAppDispatch } from '@hooks';
import { removeCar } from '@store/cars/slice';

import './DeleteForm.scss';

type DeleteFormProps = {
  id: number;
  company: string;
  model: string;
  closeModal: () => void;
};

const DeleteForm: FC<DeleteFormProps> = ({ id, company, model, closeModal }) => {
  const dispatch = useAppDispatch();

  const removeCarHandler = () => dispatch(removeCar(id));

  const confirmationMessage = `Are you sure you want to delete car ${company} ${model}? This action cannot be undone.`;
  return (
    <div className="delete">
      <p className="delete__message">{confirmationMessage}</p>
      <div className="delete__button-wrapper">
        <button type="button" className="delete__confirm-button" onClick={removeCarHandler}>
          Delete
        </button>
        <button type="button" className="delete__cancel-button" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteForm;
