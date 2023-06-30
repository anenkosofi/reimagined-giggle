import React, { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';

import './Modal.scss';

type ModalProps = {
  onCloseModal: () => void;
  children: React.ReactNode;
};

const Modal: FC<ModalProps> = ({ onCloseModal, children }) => {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [onCloseModal]);

  const backdropClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  };

  return createPortal(
    <div className="modal__container" onClick={backdropClickHandler}>
      <div className="modal">{children}</div>
    </div>,
    document.querySelector('#modal-root') as HTMLElement
  );
};

export default Modal;
