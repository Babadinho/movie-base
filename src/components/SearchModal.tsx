'use client';

import React, { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useSearchModal from '@/hooks/useSearchModal';
import { FaSearch } from 'react-icons/fa';
import Modal from './Modal';

const SearchModal = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('query');
  const searchModal = useSearchModal();
  const [searchTerm, setSearchTerm] = useState<string>(searchQuery || '');

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

  return (
    <Modal isOpen={searchModal.isOpen} onClose={searchModal.onClose}>
      <div className="searchModal">
        <input
          type="text"
          autoFocus
          className="searchModal__input"
          placeholder="Search movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          data-testid="search-input"
        />
        <button className="searchModal__button" onClick={handleSubmit} data-testid="search-button">
          <FaSearch />
        </button>
      </div>
    </Modal>
  );
};

export default SearchModal;
