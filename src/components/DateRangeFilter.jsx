import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setDateRange } from '../store/reducers/campaignReducer';

const DateRangeContainer = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: none;
  padding: 0;
  margin: 0;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.label`
  font-weight: 500;
  color: #333;
  font-size: 13px;
`;

const DateInputsContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

const DateInput = styled.input`
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  width: 140px;
  min-width: 120px;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  &.error {
    border-color: #dc3545;
    box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.25);
  }

  @media (max-width: 768px) {
    width: 120px;
  }

  @media (max-width: 480px) {
    width: 90%;
    max-width: none;
  }
`;

const DateSeparator = styled.span`
  color: #666;
  font-weight: 600;
  margin-top: 24px;
  align-self: center;

  @media (max-width: 480px) {
    margin-top: 0;
    align-self: flex-start;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
`;

function DateRangeFilter() {
  const dispatch = useDispatch();
  const { dateRange } = useSelector(state => state.campaigns);

  const handleStartDateChange = (e) => {
    const startDate = e.target.value;
    const endDate = dateRange.end;
    
    dispatch(setDateRange({ start: startDate, end: endDate }));
  };

  const handleEndDateChange = (e) => {
    const endDate = e.target.value;
    const startDate = dateRange.start;
    
    dispatch(setDateRange({ start: startDate, end: endDate }));
  };

  const hasDateError = dateRange?.start && dateRange?.end && 
                       new Date(dateRange.start) > new Date(dateRange.end);

  return (
    <DateRangeContainer 
      role="group" 
      aria-label="Date range filter"
    >
      <DateInputsContainer>
        <InputGroup>
          <Label htmlFor="start-date">From Date</Label>
          <DateInput
            type="date"
            id="start-date"
            name="start-date"
            value={dateRange?.start || ''}
            onChange={handleStartDateChange}
            className={hasDateError ? 'error' : ''}
            aria-label="Start date for campaign filter"
          />
        </InputGroup>

        <DateSeparator aria-hidden="true">to</DateSeparator>

        <InputGroup>
          <Label htmlFor="end-date">To Date</Label>
          <DateInput
            type="date"
            id="end-date"
            name="end-date"
            value={dateRange?.end || ''}
            onChange={handleEndDateChange}
            className={hasDateError ? 'error' : ''}
            min={dateRange?.start}
            aria-label="End date for campaign filter"
          />
        </InputGroup>
      </DateInputsContainer>

      {hasDateError && (
        <ErrorMessage 
          role="alert" 
          aria-live="polite"
        >
          End date cannot be before start date. Please select a valid date range.
        </ErrorMessage>
      )}
    </DateRangeContainer>
  );
}

export default DateRangeFilter;
