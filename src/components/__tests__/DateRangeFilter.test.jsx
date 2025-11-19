import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSelector, useDispatch } from 'react-redux';
import DateRangeFilter from '../DateRangeFilter';
import { setDateRange } from '../../store/reducers/campaignReducer';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('../../store/reducers/campaignReducer', () => ({
  ...jest.requireActual('../../store/reducers/campaignReducer'),
  setDateRange: jest.fn(),
}));

describe('<DateRangeFilter />', () => {
  const mockDispatch = jest.fn();
  const mockUseSelector = useSelector;
  const mockUseDispatch = useDispatch;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseDispatch.mockReturnValue(mockDispatch);
    mockUseSelector.mockReturnValue({
      campaigns: {
        dateRange: { start: '', end: '' }
      }
    });
  });

  describe('Rendering', () => {
    test('renders all elements correctly', () => {
      render(<DateRangeFilter />);

      expect(screen.getByText('From Date')).toBeInTheDocument();
      expect(screen.getByText('To Date')).toBeInTheDocument();
      expect(screen.getByLabelText('Start date for campaign filter')).toBeInTheDocument();
      expect(screen.getByLabelText('End date for campaign filter')).toBeInTheDocument();
      expect(screen.getByText('to')).toBeInTheDocument();
    });

    test('displays current date range from Redux state', () => {
      mockUseSelector.mockReturnValue({
          dateRange: { start: '2025-11-18', end: '2025-11-25' }
      });
      
      render(<DateRangeFilter />);

      expect(screen.getByDisplayValue('2025-11-18')).toBeInTheDocument();
      expect(screen.getByDisplayValue('2025-11-25')).toBeInTheDocument();
    });

    test('shows error message when end date is before start date', () => {
      mockUseSelector.mockReturnValue({
          dateRange: { start: '2023-12-31', end: '2023-01-01' }
      });
      
      render(<DateRangeFilter />);
      
      expect(screen.getByText('End date cannot be before start date. Please select a valid date range.')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    test('dispatches setDateRange when start date changes', async () => {
      mockUseSelector.mockReturnValue({
          dateRange: { start: '', end: '2025-11-25' }
      });
      
      render(<DateRangeFilter />);
      
      const startDateInput = screen.getByLabelText('Start date for campaign filter');
      await userEvent.clear(startDateInput);
      await userEvent.type(startDateInput, '2025-11-18');
      
      expect(setDateRange).toHaveBeenCalledWith({
          start: '2025-11-18',
          end: '2025-11-25'
      });
    });

    test('correctly identifies invalid date ranges', () => {
      mockUseSelector.mockReturnValue({
          dateRange: { start: '2025-11-25', end: '2025-11-18' }
      });
      
      render(<DateRangeFilter />);
      
      expect(screen.getByText('End date cannot be before start date. Please select a valid date range.')).toBeInTheDocument();
    });
  });
});
