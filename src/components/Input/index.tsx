import React, { FC } from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

import { Form } from '@types';

type InputProps = {
  name: keyof Form;
  label: string;
  type: string;
  placeholder: string;
  errors: FieldErrors<Form>;
  register: UseFormRegister<Form>;
};

const Input: FC<InputProps> = ({ name, label, type, placeholder, errors, register }) => {
  return (
    <div className="car-form__field">
      <label htmlFor={name} className="car-form__label">
        {label}
      </label>
      <input
        id={name}
        type={type}
        autoComplete="off"
        placeholder={placeholder}
        className="car-form__input"
        {...register(name)}
      />
      {errors[name] && (
        <p role="alert" className="car-form__error">
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
};

export default Input;
