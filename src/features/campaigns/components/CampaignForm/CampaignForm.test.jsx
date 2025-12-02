import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSelector } from 'react-redux';
import CampaignForm from './CampaignForm';
import { mockUsersData } from '../CampaignFilters/mockData';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('<CampaignForm />', () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();
  const mockUseSelector = useSelector;

  const defaultState = {
    users: {
      users: mockUsersData,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSelector.mockImplementation((cb) => cb(defaultState));
  });

  test('renders form with all required fields', () => {
    render(<CampaignForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    expect(screen.getByText('Add New Campaign')).toBeInTheDocument();
    expect(screen.getByLabelText('Campaign Name *')).toBeInTheDocument();
    expect(screen.getByLabelText('Start Date *')).toBeInTheDocument();
    expect(screen.getByLabelText('End Date *')).toBeInTheDocument();
    expect(screen.getByLabelText('Budget (USD) *')).toBeInTheDocument();
    expect(screen.getByLabelText('Assign to User *')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Campaign' })).toBeInTheDocument();
  });

  test('populates user dropdown with users from Redux state', () => {
    render(<CampaignForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    expect(screen.getByText('Select a user')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  test('shows validation errors when submitting empty form', async () => {
    render(<CampaignForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
   
    const submitButton = screen.getByRole('button', { name: 'Add Campaign' });
    await userEvent.click(submitButton);
   
    expect(screen.getByText('Campaign name is required')).toBeInTheDocument();
    expect(screen.getByText('Start date is required')).toBeInTheDocument();
    expect(screen.getByText('End date is required')).toBeInTheDocument();
    expect(screen.getByText('Budget is required')).toBeInTheDocument();
    expect(screen.getByText('User selection is required')).toBeInTheDocument();
   
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test('calls onSubmit with correct data when form is valid', async () => {
    render(<CampaignForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
   
    const nameInput = screen.getByLabelText('Campaign Name *');
    const startDateInput = screen.getByLabelText('Start Date *');
    const endDateInput = screen.getByLabelText('End Date *');
    const budgetInput = screen.getByLabelText('Budget (USD) *');
    const userSelect = screen.getByLabelText('Assign to User *');
    const submitButton = screen.getByRole('button', { name: 'Add Campaign' });
   
    await userEvent.type(nameInput, 'Test Campaign');
    await userEvent.type(startDateInput, '2025-12-01');
    await userEvent.type(endDateInput, '2025-12-31');
    await userEvent.type(budgetInput, '50000');
    await userEvent.selectOptions(userSelect, '1');
   
    await userEvent.click(submitButton);
   
    expect(mockOnSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Test Campaign',
        startDate: '2025-12-01',
        endDate: '2025-12-31',
        Budget: 50000,
        userId: 1,
        id: expect.any(Number)
      })
    );
  });

  test('calls onCancel when cancel button is clicked', async () => {
    render(<CampaignForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
   
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    await userEvent.click(cancelButton);
   
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  test('shows error when end date is before start date', async () => {
    render(<CampaignForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
   
    const startDateInput = screen.getByLabelText('Start Date *');
    const endDateInput = screen.getByLabelText('End Date *');
    const submitButton = screen.getByRole('button', { name: 'Add Campaign' });
   
    await userEvent.type(startDateInput, '2025-12-31');
    await userEvent.type(endDateInput, '2025-12-01');
    await userEvent.click(submitButton);
   
    expect(screen.getByText('End date cannot be before start date')).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});

