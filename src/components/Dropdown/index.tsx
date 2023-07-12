import React, { FC, forwardRef, RefAttributes, ForwardedRef } from 'react';

import './Dropdown.scss';

type DropdownProps = {
  items: string[];
  onChooseOption: (name: string) => void;
} & RefAttributes<HTMLDivElement>;

const Dropdown: FC<DropdownProps> = forwardRef(function Dropdown(
  { items, onChooseOption }: DropdownProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <div className="dropdown" ref={ref}>
      <ul className="dropdown__list">
        {items.map(item => (
          <li key={item} className="dropdown__item" onClick={() => onChooseOption(item)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Dropdown;
