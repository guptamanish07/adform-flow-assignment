import campaignReducer, {
  addCampaigns,
  setSearchTerm,
  setDateRange,
  clearFilters,
  setLoading,
  setError
} from '../campaignReducer';

jest.mock('date-fns', () => ({
  isWithinInterval: jest.fn(() => false)
}));

describe('campaignReducer', () => {
  const initialState = {
    campaigns: [],
    filteredCampaigns: [],
    searchTerm: '',
    dateRange: { start: '', end: '' },
    loading: false,
    error: null
  };

  const mockCampaigns = [
    { id: 1, name: 'Test Campaign', startDate: '2025-01-01', endDate: '2025-12-31' },
    { id: 2, name: 'Active Campaign', startDate: '2025-06-01', endDate: '2025-12-01' }
  ];

  it('should return initial state', () => {
    const result = campaignReducer(initialState, {});
    expect(result).toEqual(initialState);
  });

  it('should add campaigns', () => {
    const action = addCampaigns(mockCampaigns);
    const result = campaignReducer(initialState, action);
    expect(result.campaigns).toHaveLength(2);
    expect(result.filteredCampaigns).toHaveLength(2);
  });

  it('should set search term and filter campaigns', () => {
    const stateWithCampaigns = {
      ...initialState,
      campaigns: mockCampaigns,
      filteredCampaigns: mockCampaigns
    };
    const action = setSearchTerm('Test');
    const result = campaignReducer(stateWithCampaigns, action);
    expect(result.searchTerm).toBe('Test');
    expect(result.filteredCampaigns).toHaveLength(1);
  });

  it('should set date range', () => {
    const dateRange = { start: '2025-01-01', end: '2025-12-31' };
    const action = setDateRange(dateRange);
    const result = campaignReducer(initialState, action);
    expect(result.dateRange).toEqual(dateRange);
  });

  it('should clear filters', () => {
    const stateWithFilters = {
      ...initialState,
      campaigns: mockCampaigns,
      searchTerm: 'Test',
      dateRange: { start: '2025-01-01', end: '2025-12-31' }
    };
    const action = clearFilters();
    const result = campaignReducer(stateWithFilters, action);
    expect(result.searchTerm).toBe('');
    expect(result.dateRange).toEqual({ start: '', end: '' });
  });

  it('should set loading state', () => {
    const action = setLoading(true);
    const result = campaignReducer(initialState, action);
    expect(result.loading).toBe(true);
  });

  it('should set error state', () => {
    const action = setError('Test error');
    const result = campaignReducer(initialState, action);
    expect(result.error).toBe('Test error');
  });

  it('should handle unknown actions', () => {
    const action = { type: 'UNKNOWN' };
    const result = campaignReducer(initialState, action);
    expect(result).toEqual(initialState);
  });
});
