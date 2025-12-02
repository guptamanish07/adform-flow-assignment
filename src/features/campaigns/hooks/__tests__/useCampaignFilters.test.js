import { renderHook, act } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import useCampaignFilters from '../useCampaignFilters';
import { setSearchTerm, clearFilters } from 'store/reducers/campaignReducer';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('store/reducers/campaignReducer', () => ({
  ...jest.requireActual('store/reducers/campaignReducer'),
  setSearchTerm: jest.fn(),
  setDateRange: jest.fn(),
  clearFilters: jest.fn(),
}));

const mockCampaigns = [
  { id: 1, name: 'Adform Campaign', startDate: '2024-06-01', endDate: '2024-08-31', Budget: 50000, userId: 1 },
  { id: 2, name: 'Test Campaign', startDate: '2024-12-01', endDate: '2024-12-31', Budget: 75000, userId: 2 }
];

describe('useCampaignFilters', () => {
  const mockDispatch = jest.fn();
  const mockUseSelector = useSelector;
  const mockUseDispatch = useDispatch;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseDispatch.mockReturnValue(mockDispatch);
    mockUseSelector.mockReturnValue({
      searchTerm: '',
      dateRange: { start: '', end: '' },
      campaigns: mockCampaigns,
      filteredCampaigns: mockCampaigns
    });
  });

  test('returns initial state correctly', () => {
    const { result } = renderHook(() => useCampaignFilters());
   
    expect(result.current.searchTerm).toBe('');
    expect(result.current.dateRange).toEqual({ start: '', end: '' });
    expect(result.current.campaigns).toHaveLength(2);
    expect(result.current.hasActiveFilters).toBe(false);
    expect(result.current.isDateRangeValid).toBe(true);
  });

  test('handles search change', () => {
    const { result } = renderHook(() => useCampaignFilters());
   
    act(() => {
      result.current.handleSearchChange(/Adform Campaign/i);
    });
   
    expect(setSearchTerm).toHaveBeenCalledWith(/Adform Campaign/i);
  });

  test('validates invalid date range', () => {
    mockUseSelector.mockReturnValue({
      searchTerm: '',
      dateRange: { start: '2024-12-31', end: '2024-01-01' },
      campaigns: mockCampaigns,
      filteredCampaigns: mockCampaigns
    });

    const { result } = renderHook(() => useCampaignFilters());
   
    expect(result.current.isDateRangeValid).toBe(false);
    expect(result.current.dateRangeError).toBe('End date cannot be before start date. Please select a valid date range.');
  });

  test('clears filters', () => {
    const { result } = renderHook(() => useCampaignFilters());
   
    act(() => {
      result.current.handleClearFilters();
    });
   
    expect(clearFilters).toHaveBeenCalledWith();
  });

  test('detects active filters', () => {
    mockUseSelector.mockReturnValue({
      searchTerm: 'adform',
      dateRange: { start: '', end: '' },
      campaigns: mockCampaigns,
      filteredCampaigns: mockCampaigns
    });

    const { result } = renderHook(() => useCampaignFilters());
   
    expect(result.current.hasActiveFilters).toBe(true);
  });
});

