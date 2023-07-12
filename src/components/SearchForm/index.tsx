import React, { FC, useState, forwardRef, ForwardedRef, RefAttributes } from 'react';

import { useAppDispatch, useAppSelector } from '@hooks';
import { selectCompany, selectModel } from '@store/filters/selectors';
import { setCompany, setModel } from '@store/filters/slice';

import './SearchForm.scss';

type SearchFormProps = {
  id: string;
  name: string;
  placeholder: string;
} & RefAttributes<HTMLDivElement>;

const SearchForm: FC<SearchFormProps> = forwardRef(function SearchForm(
  { id, name, placeholder }: SearchFormProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const dispatch = useAppDispatch();

  const company = useAppSelector(selectCompany);
  const model = useAppSelector(selectModel);

  const [form, setForm] = useState({ [name]: name === 'company' ? company : model });

  const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prevForm => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const formClickHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form[name].length) return;
    if (name === 'company') {
      return dispatch(setCompany(form[name]));
    }
    return dispatch(setModel(form[name]));
  };

  const resetHandler = () => {
    setForm({ [name]: '' });
    if (name === 'company') {
      return dispatch(setCompany(''));
    }
    return dispatch(setModel(''));
  };

  return (
    <div className="search-form" ref={ref} title="" onClick={formClickHandler}>
      <form className="search-form__content" autoComplete="off">
        <input
          type="password"
          name="password"
          autoComplete="new-password"
          style={{ display: 'none' }}
        />
        <div className="search-form__field">
          <label htmlFor={id} className="search-form__label">
            {name}
          </label>
          <input
            id={id}
            type="text"
            name={name}
            value={form[name]}
            onChange={changeInputHandler}
            placeholder={placeholder}
            autoComplete="off"
            className="search-form__input"
          />
        </div>
        <div className="search-form__control">
          <button type="submit" className="search-form__search" onClick={submitHandler}>
            Search
          </button>
          <button type="button" className="search-form__reset" onClick={resetHandler}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
});

export default SearchForm;
