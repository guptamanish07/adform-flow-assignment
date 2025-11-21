import React, { useState } from 'react';
import { useSelector, shallowEqual , useDispatch} from 'react-redux';

import SearchCampaign  from './SearchCampaign';
import DateRangeFilter from './DateRangeFilter';
import CampaignList from './CampaignList';
import CampaignForm from './CampaignForm';

import { addCampaigns } from '../store/reducers/campaignReducer';


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

const SectionTitle = styled.h3`
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

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;


const Addbutton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  min-width: 134px;
  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 480px){
    min-width: 120px;
    font-size: 12px;
  }
`;

function CampaignManager() {

  const { filteredCampaigns, users, usersLoading } = useSelector((state) => ({
    filteredCampaigns: state.campaigns.filteredCampaigns,
    users: state.users.users,
    usersLoading: state.users.loading,
  }), shallowEqual);
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);

  const handleAddCampaign = (campaign) => {
    dispatch(addCampaigns([campaign]));
    setShowForm(false);
  }

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
            <SectionHeader>
              <SectionTitle>Campaigns ({filteredCampaigns?.length || 0})</SectionTitle>
              <Addbutton onClick = {() => setShowForm(!showForm)}> 
                {showForm ? "Cancel"  : "Add Campaign"}
              </Addbutton>
            </SectionHeader>
            {
              showForm && (
                <CampaignForm
                  onSubmit={handleAddCampaign}
                  onCancel={() => setShowForm(false)}
                 />
              )
            }

            <CampaignList campaigns={filteredCampaigns} users={users} />
          </Section>
      </Container>
  );
}

export default CampaignManager;
