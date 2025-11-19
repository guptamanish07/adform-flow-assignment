import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import SearchCampaign  from './SearchCampaign';
import DateRangeFilter from './DateRangeFilter';
import CampaignList from './CampaignList';

import styled from 'styled-components';

const Container = styled.div`
    padding: 20px;

    @media (max-width: 768px) {
        padding: 16px;
    }

    @media (max-width: 480px) {
        padding: 12px;
    }
`;

const Section = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  margin-top: 0;
  color: #333;
  border-bottom: 2px solid #007bff;
  padding-bottom: 10px;
`;

const FiltersSection = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
    justify-content: flex-start;
  }

  @media (max-width: 480px) {
    gap: 12px;
  }
`;

function CampaignManager() {

  const { filteredCampaigns, users, usersLoading } = useSelector((state) => ({
    filteredCampaigns: state.campaigns.filteredCampaigns,
    users: state.users.users,
    usersLoading: state.users.loading,
  }), shallowEqual);

  if(usersLoading) {
      return <Container>Loading users...</Container>;
  }
  
  return (
      <Container>
          <Section>
              <SectionTitle>Filters</SectionTitle>
              <FiltersSection>
                  <DateRangeFilter/>
                  <SearchCampaign />
              </FiltersSection>
          </Section>
          <Section>
              <SectionTitle>Campaigns</SectionTitle>
              <CampaignList campaigns={filteredCampaigns} users={users} />
          </Section>
      </Container>
  );
}

export default CampaignManager;
