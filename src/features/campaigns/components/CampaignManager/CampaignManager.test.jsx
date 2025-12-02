import { render, screen } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import { mockCampaignsData, mockUsersData } from '../CampaignFilters/mockData';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn()
}));

import CampaignManager from '../CampaignManager';

const defaultState = {
    campaigns: {
        campaigns: mockCampaignsData,
        filteredCampaigns: mockCampaignsData,
        dateRange: { start: '', end: '' },
        searchTerm: '',
    },
    users: {
        users: mockUsersData,
        loading: false,
    },
};

describe('<CampaignManager />', () => {
    const mockDispatch = jest.fn();
    const mockUseSelector = useSelector;
    const mockUseDispatch = useDispatch;
    
    beforeEach(() => {
        jest.clearAllMocks();
        mockUseDispatch.mockReturnValue(mockDispatch);
        
        mockUseSelector.mockImplementation((cb) => cb(defaultState));
    });

    test('renders without crashing', () => {
        render(<CampaignManager />);
        
        expect(screen.getByText('Filters')).toBeInTheDocument();
        expect(screen.getByText('Campaigns')).toBeInTheDocument();
        expect(screen.getByText('Divavu')).toBeInTheDocument();
    });

    test('displays loading state when users are loading', () => {
        const loadingState = {
            ...defaultState,
            users: {
                users: [],
                loading: true,
            },
        };
        
        mockUseSelector.mockImplementation((selectorFn) => selectorFn(loadingState));
        
        render(<CampaignManager />);
        
        expect(screen.getByText('Loading users...')).toBeInTheDocument();
    });

    test('renders search and date range filters', () => {
        render(<CampaignManager />);
        
        expect(screen.getByText('Search Campaigns')).toBeInTheDocument();
        expect(screen.getByText('From Date')).toBeInTheDocument();
        expect(screen.getByText('To Date')).toBeInTheDocument();
    });

    test('passes filteredCampaigns to CampaignList', () => {
        render(<CampaignManager />);
        
        expect(screen.getByText('Divavu')).toBeInTheDocument();
        expect(screen.getByText('Jaxspan')).toBeInTheDocument();
        expect(screen.getByText('Miboo')).toBeInTheDocument();
    });
});
