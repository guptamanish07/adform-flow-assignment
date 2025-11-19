import { isWithinInterval } from 'date-fns';

export const ADD_CAMPAIGNS = 'campaigns/addCampaigns';
export const SET_SEARCH_TERM = 'campaigns/setSearchTerm';
export const SET_DATE_RANGE = 'campaigns/setDateRange';
export const CLEAR_FILTERS = 'campaigns/clearFilters';
export const SET_LOADING = 'campaigns/setLoading';
export const SET_ERROR = 'campaigns/setError';

export const addCampaigns = (campaigns) => ({
  type: ADD_CAMPAIGNS,
  payload: campaigns
});

export const setSearchTerm = (searchTerm) => ({
  type: SET_SEARCH_TERM,
  payload: searchTerm
});

export const setDateRange = (dateRange) => ({
  type: SET_DATE_RANGE,
  payload: dateRange
});

export const clearFilters = () => ({
  type: CLEAR_FILTERS
});

export const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error
});

const isCampaignActive = (startDate, endDate) => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return isWithinInterval(now, { start, end });
};

const filterByDateRange = (campaigns, startDate, endDate) => {
  if (!startDate || !endDate) return campaigns;
  
  const filterStart = new Date(startDate);
  const filterEnd = new Date(endDate);
  
  // If end date is before start date, hide all campaigns
  if (filterStart > filterEnd) {
    return [];
  }
  
  return campaigns.filter(campaign => {
    const campaignStart = new Date(campaign.startDate);
    const campaignEnd = new Date(campaign.endDate);
    
    // Show if campaign start or end date is within the filter range
    return (
      isWithinInterval(campaignStart, { start: filterStart, end: filterEnd }) ||
      isWithinInterval(campaignEnd, { start: filterStart, end: filterEnd }) ||
      (campaignStart <= filterStart && campaignEnd >= filterEnd)
    );
  });
};

const filterCampaigns = (campaigns, searchTerm, dateRange) => {
  let filtered = [...campaigns];
  
  // Filter by search term
  if (searchTerm) {
    filtered = filtered.filter(campaign =>
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  // Filter by date range
  filtered = filterByDateRange(filtered, dateRange.start, dateRange.end);
  
  return filtered;
};

const initialState = {
  campaigns: [],
  filteredCampaigns: [],
  searchTerm: '',
  dateRange: {
    start: '',
    end: ''
  },
  loading: false,
  error: null
};

const campaignReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CAMPAIGNS: {
      const newCampaigns = action.payload.map(campaign => ({
        ...campaign,
        isActive: isCampaignActive(campaign.startDate, campaign.endDate)
      }));
      
      const updatedCampaigns = [...state.campaigns, ...newCampaigns];
      
      return {
        ...state,
        campaigns: updatedCampaigns,
        filteredCampaigns: filterCampaigns(updatedCampaigns, state.searchTerm, state.dateRange)
      };
    }
    
    case SET_SEARCH_TERM: {
      const searchTerm = action.payload;
      return {
        ...state,
        searchTerm,
        filteredCampaigns: filterCampaigns(state.campaigns, searchTerm, state.dateRange)
      };
    }
    
    case SET_DATE_RANGE: {
      const dateRange = action.payload;
      return {
        ...state,
        dateRange,
        filteredCampaigns: filterCampaigns(state.campaigns, state.searchTerm, dateRange)
      };
    }
    
    case CLEAR_FILTERS: {
      return {
        ...state,
        searchTerm: '',
        dateRange: { start: '', end: '' },
        filteredCampaigns: [...state.campaigns]
      };
    }
    
    case SET_LOADING: {
      return {
        ...state,
        loading: action.payload
      };
    }
    
    case SET_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }
    
    default:
      return state;
  }
};

export default campaignReducer;
