import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSelector, useDispatch } from 'react-redux';
import SearchCampaign from './SearchCampaign';
import { setSearchTerm, clearFilters } from 'store/reducers/campaignReducer';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('store/reducers/campaignReducer', () => ({
  ...jest.requireActual('store/reducers/campaignReducer'),
  setSearchTerm: jest.fn(),
  clearFilters: jest.fn(),
}));

describe('<SearchCampaign />', () => {
  const mockDispatch = jest.fn();
  const mockUseSelector = useSelector;
  const mockUseDispatch = useDispatch;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseDispatch.mockReturnValue(mockDispatch);
    mockUseSelector.mockReturnValue({ searchTerm: '' });
  });

  describe('Rendering', () => {
    test('renders all elements correctly', () => {
      render(<SearchCampaign />);

      expect(screen.getByLabelText('Search Campaigns')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter campaign name...')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
    });

    test('displays current search term from Redux state', () => {
      mockUseSelector.mockReturnValue({ searchTerm: 'Test Campaign' });
      
      render(<SearchCampaign />);
      
      expect(screen.getByDisplayValue('Test Campaign')).toBeInTheDocument();
    });

    test('clear button is disabled when searchTerm is empty', () => {
      mockUseSelector.mockReturnValue({ searchTerm: '' });
      
      render(<SearchCampaign />);
      
      expect(screen.getByRole('button', { name: /clear/i })).toBeDisabled();
    });

    test('clear button is enabled when searchTerm has value', () => {
      mockUseSelector.mockReturnValue({ searchTerm: 'Some search' });
      
      render(<SearchCampaign />);
      
      expect(screen.getByRole('button', { name: /clear/i })).toBeEnabled();
    });
  });

  describe('User Interactions', () => {
    test('dispatches setSearchTerm when user types in search input', async () => {
      mockUseSelector.mockReturnValue({ searchTerm: '' });
      
      render(<SearchCampaign />);
      
      const searchInput = screen.getByPlaceholderText('Enter campaign name...');
      await userEvent.type(searchInput, 'Test');
      
      expect(setSearchTerm).toHaveBeenCalledTimes(4);
      expect(setSearchTerm).toHaveBeenNthCalledWith(1, 'T');
      expect(setSearchTerm).toHaveBeenNthCalledWith(2, 'e');
      expect(setSearchTerm).toHaveBeenNthCalledWith(3, 's');
      expect(setSearchTerm).toHaveBeenNthCalledWith(4, 't');
    });

    test('dispatches clearFilters when clear button is clicked', async () => {
      mockUseSelector.mockReturnValue({ searchTerm: 'Some search' });
      
      render(<SearchCampaign />);
      
      const clearButton = screen.getByRole('button', { name: /clear/i });
      await userEvent.click(clearButton);
      
      expect(clearFilters).toHaveBeenCalledTimes(1);
      expect(clearFilters).toHaveBeenCalledWith();
    });

    test('clear button click does not dispatch when disabled', async () => {
      mockUseSelector.mockReturnValue({ searchTerm: '' });
      
      render(<SearchCampaign />);
      
      const clearButton = screen.getByRole('button', { name: /clear/i });
      
      await userEvent.click(clearButton);
      
      expect(clearFilters).not.toHaveBeenCalled();
    });
  });
});
