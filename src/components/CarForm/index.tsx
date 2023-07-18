import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { FC, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';

import Input from '@components/Input';
import { inputs } from '@constants';
import { useAppDispatch, useAppSelector } from '@hooks';
import { selectAddedCars } from '@store/cars/selectors';
import { addCar, editCar } from '@store/cars/slice';
import { setPage } from '@store/filters/slice';
import { Form } from '@types';

import './CarForm.scss';

type CarFormProps = {
  carDetails?: {
    id: number;
    company: string;
    model: string;
    vin: string;
    year: string;
    color: string;
    price: string;
    availability: boolean;
  };
  closeModal: () => void;
};

export const schema = z.object({
  company: z.string().nonempty('This field is required'),
  model: z.string().nonempty('This field is required'),
  vin: z
    .string()
    .nonempty('This field is required')
    .min(17, 'VIN must contain 17 numbers')
    .max(17, 'VIN must contain 17 numbers'),
  year: z
    .string()
    .nonempty('This field is required')
    .min(4, 'Year must contain at 4 digits')
    .max(17, 'Year must contain at 4 digits'),
  color: z.string().nonempty('This field is required'),
  price: z
    .string()
    .nonempty('This field is required')
    .min(2, 'Price must contain at least 1 digit'),
  availability: z.boolean(),
});

const CarForm: FC<CarFormProps> = ({ carDetails, closeModal }) => {
  const dispatch = useAppDispatch();

  const addedCars = useAppSelector(selectAddedCars);

  const defaultValues: Form = {
    company: carDetails?.company || '',
    model: carDetails?.model || '',
    vin: carDetails?.vin || '',
    year: carDetails?.year || '',
    color: carDetails?.color || '',
    price: carDetails?.price || '',
    availability: carDetails?.availability || false,
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid, isSubmitSuccessful },
  } = useForm<Form>({
    defaultValues,
    resolver: zodResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onSubmit',
  });

  const onSubmitHandler = (data: Form) => {
    if (carDetails) {
      const { id, company, model, year } = carDetails;
      const { color, vin, price, availability } = data;
      const newCar = {
        id,
        car: company,
        car_model: model,
        car_color: color,
        car_model_year: +year,
        car_vin: vin,
        price: price[0] === '$' ? price : '$' + price,
        availability,
      };
      return dispatch(editCar(newCar));
    }
    const { company, model, vin, year, color, price, availability } = data;
    const newCar = {
      id: addedCars.length ? addedCars[addedCars.length - 1].id + 1 : 1001,
      car: company,
      car_model: model,
      car_color: color,
      car_model_year: +year,
      car_vin: vin,
      price: price[0] === '$' ? price : '$' + price,
      availability,
    };
    dispatch(addCar(newCar));
    dispatch(setPage(1));
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(defaultValues);

      closeModal();
    }
  }, [isSubmitSuccessful]);

  const setInputDisabled = (name: keyof Form) =>
    Boolean(carDetails) &&
    (name === 'company' || name === 'model' || name === 'vin' || name === 'year')
      ? true
      : false;

  return (
    <>
      <form
        className="car-form"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <input
          type="password"
          name="password"
          autoComplete="new-password"
          style={{ display: 'none' }}
        />
        {inputs.map(({ name, label, type, placeholder }) => (
          <Input
            key={name}
            name={name}
            label={label}
            type={type}
            placeholder={placeholder}
            errors={errors}
            register={register}
            disabled={setInputDisabled(name)}
          />
        ))}
        <div className="car-form__label">Availability</div>
        <Controller
          control={control}
          name="availability"
          render={({ field: { onChange, onBlur, value } }) => (
            <div aria-labelledby="availability" className="car-form__options">
              <label className="car-form__label car-form__label_option">
                <input
                  type="radio"
                  onBlur={onBlur}
                  onChange={() => onChange(true)}
                  checked={value}
                  className="car-form__radio"
                />
                <span className="car-form__circle">
                  <span className="car-form__dot"></span>
                </span>
                <span>Available</span>
              </label>
              <label className="car-form__label car-form__label_option">
                <input
                  type="radio"
                  onBlur={onBlur}
                  onChange={() => onChange(false)}
                  checked={!value}
                  className="car-form__radio"
                />
                <span className="car-form__circle">
                  <span className="car-form__dot"></span>
                </span>
                <span>Not available</span>
              </label>
              {errors['availability'] && (
                <p role="alert" className="car-form__error">
                  {errors['availability']?.message}
                </p>
              )}
            </div>
          )}
        />
        <div className="car-form__control">
          <button type="submit" disabled={!isValid} className="car-form__submit">
            Submit
          </button>
          <button type="button" className="car-form__cancel" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default CarForm;
