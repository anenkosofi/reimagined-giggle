import React, { FC } from 'react';
import { IoIosArrowBack } from 'react-icons/io';

import { useAppDispatch, useAppSelector } from '@hooks';
import { selectVisibleCars } from '@store/cars/selectors';
import { selectPage, selectLimit } from '@store/filters/selectors';
import { setPage } from '@store/filters/slice';

import './Pagination.scss';

enum PageNumber {
  'ONE' = 1,
  'THREE' = 3,
  'FOUR' = 4,
  'FIVE' = 5,
}

enum Ellipsis {
  'LEFT' = 'ellipsis-left',
  'RIGHT' = 'ellipsis-right',
}

const Pagination: FC = () => {
  const dispatch = useAppDispatch();
  const selectedPage = useAppSelector(selectPage);
  const limit = useAppSelector(selectLimit);
  const cars = useAppSelector(selectVisibleCars);

  const pages = Math.ceil(cars.length / limit);
  const nextPage = selectedPage + 1;
  const prevPage = selectedPage - 1;

  const setPageHandler = (page: number) => {
    dispatch(setPage(page));
  };

  const getPageNumberMarkup = (i: number) => (
    <li
      key={i}
      onClick={() => setPageHandler(i)}
      className={selectedPage === i ? 'page-list__item page-list__item_active' : 'page-list__item'}
    >
      {i}
    </li>
  );

  const getEllipsisMarkup = ({ key }: { key: string }) => (
    <li key={key} className="page-list__item page-list__item_ellipsis">
      ...
    </li>
  );

  const renderPageNumbers = () => {
    const pageNumbers: React.ReactElement[] = [];
    if (pages <= PageNumber.FIVE) {
      for (let i = PageNumber.ONE; i <= pages; i++) {
        pageNumbers.push(getPageNumberMarkup(i));
      }
    } else {
      if (selectedPage <= PageNumber.THREE) {
        for (let i = PageNumber.ONE; i <= PageNumber.FOUR; i++) {
          pageNumbers.push(getPageNumberMarkup(i));
        }
        pageNumbers.push(getEllipsisMarkup({ key: Ellipsis.LEFT }));
        pageNumbers.push(getPageNumberMarkup(pages));
      } else if (selectedPage > pages - PageNumber.THREE) {
        pageNumbers.push(getPageNumberMarkup(PageNumber.ONE));
        pageNumbers.push(getEllipsisMarkup({ key: Ellipsis.RIGHT }));
        for (let i = pages - PageNumber.THREE; i <= pages; i++) {
          pageNumbers.push(getPageNumberMarkup(i));
        }
      } else {
        pageNumbers.push(getPageNumberMarkup(PageNumber.ONE));
        pageNumbers.push(getEllipsisMarkup({ key: Ellipsis.LEFT }));
        for (let i = selectedPage - PageNumber.ONE; i <= selectedPage + PageNumber.ONE; i++) {
          pageNumbers.push(getPageNumberMarkup(i));
        }
        pageNumbers.push(getEllipsisMarkup({ key: Ellipsis.RIGHT }));
        pageNumbers.push(getPageNumberMarkup(pages));
      }
    }

    return pageNumbers;
  };

  return (
    <div className="page__list">
      <button
        type="button"
        disabled={selectedPage === 1}
        className="arrow-button"
        onClick={() => setPageHandler(prevPage)}
      >
        <IoIosArrowBack className="arrow-button__icon arrow-button__left" />
      </button>
      <ul className="page__list">{renderPageNumbers()}</ul>
      <button
        type="button"
        disabled={selectedPage === pages}
        className="arrow-button"
        onClick={() => setPageHandler(nextPage)}
      >
        <IoIosArrowBack className="arrow-button__icon arrow-button__right" />
      </button>
    </div>
  );
};

export default Pagination;
