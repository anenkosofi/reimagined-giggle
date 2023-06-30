import React, { forwardRef } from 'react';

import './Dropdown.scss';

type DropdownProps = {
  items: string[];
  onChooseOption: (name: string) => void;
};

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(({ items, onChooseOption }, ref) => {
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

Dropdown.displayName = 'Dropdown';

export default Dropdown;
