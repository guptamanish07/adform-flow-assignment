import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setDateRange } from 'store/reducers/campaignReducer';
import DateInput from 'shared/components/DateInput';
import Label from 'shared/components/Label/Label';

const DateRangeContainer = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: none;
  padding: 0;
  margin: 0;
  @media (max-width: 480px){
    width:100%;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (max-width: 480px){
    width:100%;
  }
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
          <Label htmlFor="start-date" weight="500" size="13px">From Date</Label>
          <DateInput
            id="start-date"
            name="start-date"
            value={dateRange?.start || ''}
            onChange={handleStartDateChange}
            hasError={hasDateError}
            aria-label="Start date for campaign filter"
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="end-date" weight="500" size="13px">To Date</Label>
          <DateInput
            id="end-date"
            name="end-date"
            value={dateRange?.end || ''}
            onChange={handleEndDateChange}
            hasError={hasDateError}
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
