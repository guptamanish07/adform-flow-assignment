import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useMemo } from 'react';
import { setSearchTerm, setDateRange, clearFilters } from '../../../store/reducers/campaignReducer';


const useCampaignFilters = () => {
  const dispatch = useDispatch();
 
  const { searchTerm, dateRange, campaigns, filteredCampaigns } = useSelector(state => ({
    searchTerm: state.campaigns.searchTerm,
    dateRange: state.campaigns.dateRange,
    campaigns: state.campaigns.campaigns,
    filteredCampaigns: state.campaigns.filteredCampaigns
  }));

  const handleSearchChange = useCallback((value) => {
    dispatch(setSearchTerm(value));
  }, [dispatch]);

  const handleStartDateChange = useCallback((startDate) => {
    dispatch(setDateRange({ start: startDate, end: dateRange?.end || '' }));
  }, [dispatch, dateRange?.end]);

  const handleEndDateChange = useCallback((endDate) => {
    dispatch(setDateRange({ start: dateRange?.start || '', end: endDate }));
  }, [dispatch, dateRange?.start]);

  const handleClearFilters = useCallback(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  const hasActiveFilters = useMemo(() => {
    return !!(searchTerm || dateRange?.start || dateRange?.end);
  }, [searchTerm, dateRange]);


  const isDateRangeValid = useMemo(() => {
    if (!dateRange?.start || !dateRange?.end) return true;
    return new Date(dateRange.start) <= new Date(dateRange.end);
  }, [dateRange]);

  const dateRangeError = useMemo(() => {
    if (!isDateRangeValid) {
      return 'End date cannot be before start date. Please select a valid date range.';
    }
    return null;
  }, [isDateRangeValid]);


  return {
    searchTerm,
    dateRange,
    campaigns,
    filteredCampaigns,
    hasActiveFilters,
    isDateRangeValid,
    dateRangeError,

    handleSearchChange,
    handleStartDateChange,
    handleEndDateChange,
    handleClearFilters,
  };
};

export default useCampaignFilters;

