import React, { FC } from 'react';

import Container from '@components/Container';
import { useAppDispatch, useAppSelector } from '@hooks';
import { selectAvailable } from '@store/filters/selectors';
import { setAvailable } from '@store/filters/slice';

import './Switcher.scss';

const Switcher: FC = () => {
  const dispatch = useAppDispatch();

  const available = useAppSelector(selectAvailable);

  const setAvailableHandler = () => dispatch(setAvailable());

  return (
    <Container>
      <div className="switcher">
        <span className="switcher__label">Only available</span>
        <button
          type="button"
          className={available ? 'switcher__body switcher__body_dark' : 'switcher__body'}
          onClick={setAvailableHandler}
        >
          <span
            className={available ? 'switcher__circle switcher__circle_dark' : 'switcher__circle'}
          ></span>
        </button>
      </div>
    </Container>
  );
};

export default Switcher;
