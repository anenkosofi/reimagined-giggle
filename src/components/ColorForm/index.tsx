import React, { FC, forwardRef, ForwardedRef, RefAttributes } from 'react';

import { ReactComponent as Check } from '@assets/check.svg';
import { useAppSelector, useAppDispatch } from '@hooks';
import { selectCars } from '@store/cars/selectors';
import { selectColors } from '@store/filters/selectors';
import { setColor } from '@store/filters/slice';
import { getCarColors, getTagStyle } from '@utils';

import './ColorForm.scss';

type ColorFormProps = RefAttributes<HTMLDivElement>;

const ColorForm: FC<ColorFormProps> = forwardRef(function ColorForm(
  props: ColorFormProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const dispatch = useAppDispatch();

  const cars = useAppSelector(selectCars);
  const selectedColors = useAppSelector(selectColors);

  const colors = getCarColors(cars);
  const areAnyColorsChecked = (color: string) =>
    selectedColors.some(item => item.toLowerCase() === color.toLowerCase());

  const setColorHandler = (color: string) => dispatch(setColor(color));

  return (
    <div className="form" {...props} ref={ref}>
      <ul className="form__list">
        {colors.map(color => (
          <li key={color} className="form__item">
            <input
              id={color}
              type="checkbox"
              className="form__input"
              checked={areAnyColorsChecked(color)}
              onChange={() => setColorHandler(color)}
            />
            <label htmlFor={color} className="form__field">
              <span className="form__checkbox">
                <Check className="form__icon" />
              </span>
              <span className="form__label" style={getTagStyle(color).style}>
                {color}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default ColorForm;
