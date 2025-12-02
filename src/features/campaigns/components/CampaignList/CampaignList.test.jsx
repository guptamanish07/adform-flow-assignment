import React from 'react';
import { render, screen } from '@testing-library/react';
import CampaignList from './CampaignList';
import { mockCampaignsData, mockUsersData } from '../CampaignFilters/mockData';

describe('CampaignList Component', () => {

    describe('Rendering', () => {

        test('renders table headers', () => {
            render(<CampaignList campaigns={mockCampaignsData} users={mockUsersData} />);

            expect(screen.getByText('Campaign Name')).toBeInTheDocument();
            expect(screen.getByText('User Name')).toBeInTheDocument();
            expect(screen.getByText('Start Date')).toBeInTheDocument();
            expect(screen.getByText('End Date')).toBeInTheDocument();
            expect(screen.getByText('Status')).toBeInTheDocument();
            expect(screen.getByText('Budget')).toBeInTheDocument();
        });

        test('renders table with campaign data', () => {
            render(<CampaignList campaigns={mockCampaignsData} users={mockUsersData} />);

            expect(screen.getByText('Divavu')).toBeInTheDocument();
            expect(screen.getByText('Jaxspan')).toBeInTheDocument();
        });

        test('shows no results message when campaigns array is empty', () => {
            render(<CampaignList campaigns={[]} users={mockUsersData} />);

            expect(screen.getByText('No campaigns found')).toBeInTheDocument();
            expect(screen.getByText(/Try adjusting your filters/)).toBeInTheDocument();
        });

        test('handles unknown user', () => {
            const campaignWithUnknownUser = [{
                id: 1,
                name: 'Test Campaign',
                startDate: '2023-01-01',
                endDate: '2023-12-31',
                Budget: 1000,
                userId: 999,
                isActive: true
            }];

            render(<CampaignList campaigns={campaignWithUnknownUser} users={[]} />);

            expect(screen.getByText('Unknown User')).toBeInTheDocument();
        });

    });
});
