import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchModal from '@/components/SearchModal';

jest.mock('@/store/useSearchModal', () => {
  return () => ({
    isOpen: true,
    onOpen: jest.fn(),
    onClose: jest.fn()
  });
});

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn()
}));

describe('SearchModal', () => {
  it('Inputting text updates the state', () => {
    (useRouter as jest.Mock).mockReturnValue({ query: {} });
    (useSearchParams as jest.Mock).mockReturnValue({ get: jest.fn(() => '') });

    render(<SearchModal />);

    const inputElement = screen.getByPlaceholderText('Search movie...') as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: 'test' } });

    expect(inputElement.value).toBe('test');
  });

  it('Submitting the form redirects to search page', () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ query: {}, push: mockPush });
    (useSearchParams as jest.Mock).mockReturnValue({ get: jest.fn(() => '') });

    render(<SearchModal />);

    const inputElement = screen.getByPlaceholderText('Search movie...') as HTMLInputElement;
    const submitButton = screen.getByTestId('search-button');

    fireEvent.change(inputElement, { target: { value: 'Barbie' } });
    fireEvent.click(submitButton);

    expect(mockPush).toHaveBeenCalledWith('/search/?query=Barbie');
  });
});
