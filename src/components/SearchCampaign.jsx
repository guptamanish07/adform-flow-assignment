import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setSearchTerm, clearFilters } from '../store/reducers/campaignReducer';

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const Label = styled.label`
  font-weight: 600;
  color: #333;
  font-size: 14px;
`;

const SearchInput = styled.input`
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  width: 250px;
  min-width: 200px;
  box-sizing: border-box;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  &::placeholder {
    color: #999;
  }

  @media (max-width: 768px) {
    width: 200px;
  }

  @media (max-width: 480px) {
    width: 100%;
    max-width: none;
    flex: 1;
  }
`;

const ClearButton = styled.button`
  padding: 8px 16px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #545b62;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    width: 100%;
  }
`;

function SearchCampaign() {
  const dispatch = useDispatch();
  const { searchTerm , dateRange } = useSelector(state => state.campaigns);

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleClear = () => {
    dispatch(clearFilters());
  };

  const isClearEnabled = searchTerm || dateRange?.start || dateRange?.endDate;

  return (
    <SearchContainer>
      <Label htmlFor="search">Search Campaigns</Label>
      <ButtonContainer>
        <SearchInput
          id="search"
          type="text"
          placeholder="Enter campaign name..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <ClearButton
          onClick={handleClear}
          disabled={!isClearEnabled} 
          title="Clear all filters"
        >
          Clear
        </ClearButton>
      </ButtonContainer>
    </SearchContainer>
  );
}

export default SearchCampaign;
