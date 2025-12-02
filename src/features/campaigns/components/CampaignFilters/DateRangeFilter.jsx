import React from 'react';
import styled from 'styled-components';
import DateInput from 'shared/components/DateInput';
import Label from 'shared/components/Label/Label';
import useCampaignFilters from '../../hooks/useCampaignFilters';

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
  const {
    dateRange,
    isDateRangeValid,
    dateRangeError,
    handleStartDateChange,
    handleEndDateChange
  } = useCampaignFilters();

  const hasDateError = !isDateRangeValid;

  const handleStartChange = (e) => {
    handleStartDateChange(e.target.value);
  };

  const handleEndChange = (e) => {
    handleEndDateChange(e.target.value);
  };

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
            onChange={handleStartChange}
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
            onChange={handleEndChange}
            hasError={hasDateError}
            min={dateRange?.start}
            aria-label="End date for campaign filter"
          />
        </InputGroup>
      </DateInputsContainer>

      {hasDateError && dateRangeError && (
        <ErrorMessage
          role="alert"
          aria-live="polite"
        >
          {dateRangeError}
        </ErrorMessage>
      )}
    </DateRangeContainer>
  );
}

export default DateRangeFilter;

