'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useSearchModal from '@/store/useSearchModal';
import { FaSearch } from 'react-icons/fa';

const SearchModal = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('query');
  const searchModal = useSearchModal();
  const searchModalRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>(searchQuery || '');

  const handleClickOutsideModal = (event: MouseEvent) => {
    if (searchModalRef.current && !searchModalRef.current.contains(event.target as Node)) {
      searchModal.onClose();
    }
  };

  const handleSubmit = useCallback(() => {
    if (searchTerm === '') {
      return;
    }
    searchModal.onClose();
    router.push(`/search/?query=${searchTerm}`);
  }, [searchModal, router, searchTerm]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideModal);

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideModal);
    };
  }, [handleClickOutsideModal]);

  if (!searchModal.isOpen) {
    return;
  }
  return (
    <>
      <div className="searchModal">
        <div className="searchModal__wrapper" ref={searchModalRef}>
          <div className="searchModal__content">
            <input type="text" autoFocus className="searchModal__input" placeholder="Search movie..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={handleKeyDown} />
            <button className="searchModal__button" onClick={handleSubmit}>
              <FaSearch />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModal;
