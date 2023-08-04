'use client';

import React, { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  children?: React.ReactElement;
}

const SearchModal = ({ isOpen, onClose, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutsideModal = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideModal);

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideModal);
    };
  }, [handleClickOutsideModal]);

  if (!isOpen) {
    return;
  }

  return (
    <>
      <div className="modal">
        <div className="modal__wrapper" ref={modalRef}>
          <div className="modal__content">{children}</div>
        </div>
      </div>
    </>
  );
};

export default SearchModal;
