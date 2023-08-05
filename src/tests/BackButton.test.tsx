import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import '@testing-library/jest-dom/extend-expect';
import BackButton from '@/components/BackButton';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

describe('BackButton', () => {
  it('renders correctly', () => {
    (useRouter as jest.Mock).mockReturnValue({ query: {} });
    render(<BackButton />);
    expect(screen.getByTestId('back-button')).toBeInTheDocument();
  });
});
