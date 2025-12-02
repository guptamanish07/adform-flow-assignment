import React, { useRef, useCallback } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

const TableContainer = styled.div`
  margin-top: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-height: 500px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    margin-top: 16px;
    border-radius: 6px;
    max-height: 400px;
  }

  @media (max-width: 480px) {
    max-height: 350px;
  }
`;

const TableWrapper = styled.div`
  overflow: auto;
  flex: 1;
  max-height: 450px;

  @media (max-width: 768px) {
    max-height: 350px;
  }

  @media (max-width: 480px) {
    max-height: 280px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 700px;

  @media (max-width: 768px) {
    min-width: 650px;
    font-size: 13px;
  }
`;

const TableCaption = styled.caption`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const TableHeader = styled.th`
  background-color: #f8f9fa;
  padding: 15px 12px;
  text-align: left;
  font-weight: 600;
  color: #333;
  font-size: 14px;
  white-space: nowrap;
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 2px solid #dee2e6;

  @media (max-width: 768px) {
    padding: 12px 10px;
    font-size: 13px;
  }

  @media (max-width: 480px) {
    padding: 10px 8px;
    font-size: 12px;
  }
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }

  &:hover {
    background-color: #e9ecef;
  }

  &:focus-within {
    background-color: #d1ecf1;
    outline: 2px solid #007bff;
    outline-offset: -2px;
  }
`;

const TableData = styled.td`
  padding: 12px;
  border-bottom: 1px solid #dee2e6;
  font-size: 14px;
  color: #333;
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: 10px 8px;
    font-size: 13px;
  }

  @media (max-width: 480px) {
    padding: 8px 6px;
    font-size: 12px;
  }
`;

const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  background-color: ${props => props.$active ? '#28a745' : '#dc3545'};
  display: inline-flex;
  align-items: center;
  gap: 4px;
 
  @media (max-width: 480px) {
    padding: 3px 6px;
    font-size: 11px;
    gap: 2px;
  }
`;

const StatusIcon = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
 
  @media (max-width: 480px) {
    width: 6px;
    height: 6px;
  }
`;

const BudgetCell = styled(TableData)`
  font-weight: 600;
  color: #28a745;
`;

const NoResultsMessage = styled.div`
  text-align: center;
  padding: 30px;
  background: #f8f9fa;
  border-radius: 8px;
  color: #6c757d;
  border: 1px dashed #dee2e6;
`;

function CampaignList({ campaigns, users }) {
  const tableRef = useRef(null);

  const getUserName = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Unknown User';
  };

  const formatBudget = (budget) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(budget);
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, 'MMM dd, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  const handleKeyDown = useCallback((event) => {
    const { key } = event;
    const table = tableRef.current;
    if (!table) return;

    const rows = Array.from(table.querySelectorAll('tbody tr'));
    const currentRow = event.target.closest('tr');
    const currentRowIndex = rows.indexOf(currentRow);

    if (currentRowIndex === -1) return;

    switch (key) {
      case 'ArrowUp':
        event.preventDefault();
        if (currentRowIndex > 0) {
          rows[currentRowIndex - 1].focus();
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (currentRowIndex < rows.length - 1) {
          rows[currentRowIndex + 1].focus();
        }
        break;
      case 'Home':
        event.preventDefault();
        if (rows.length > 0) {
          rows[0].focus();
        }
        break;
      case 'End':
        event.preventDefault();
        if (rows.length > 0) {
          rows[rows.length - 1].focus();
        }
        break;
      default:
        break;
    }
  }, []);

  if (campaigns?.length === 0) {
    return (
      <NoResultsMessage>
        <h3>No campaigns found</h3>
        <p>Try adjusting your filters or the global AddCampaigns() function in the browser console.</p>
      </NoResultsMessage>
    );
  }

  return (
    <TableContainer>
      <TableWrapper>
        <Table
          ref={tableRef}
          role="table"
          aria-label="Campaign management data table with keyboard navigation support"
          aria-rowcount={campaigns.length + 1}
          aria-describedby="table-summary table-instructions"
        >
          <TableCaption id="table-summary">
            Campaign Management Table - Showing {campaigns?.length || 0} campaigns with their details including name, assigned user, dates, status, and budget information.
            <div id="table-instructions" style={{ fontSize: '12px', marginTop: '8px', color: '#6c757d' }}>
              Use Tab to enter the table, then Arrow keys to navigate rows, Home/End to jump to first/last row.
            </div>
          </TableCaption>
          <thead>
            <tr role="row" aria-rowindex="1">
              <TableHeader scope="col">Campaign Name</TableHeader>
              <TableHeader scope="col">User Name</TableHeader>
              <TableHeader scope="col">Start Date</TableHeader>
              <TableHeader scope="col">End Date</TableHeader>
              <TableHeader scope="col">Status</TableHeader>
              <TableHeader scope="col">Budget</TableHeader>
            </tr>
          </thead>
          <tbody>
            {campaigns?.map((campaign, index) => (
              <TableRow
                key={campaign.id}
                role="row"
                tabIndex={index === 0 ? 0 : -1}
                onKeyDown={handleKeyDown}
                aria-label={`Row ${index + 1} of ${campaigns.length}. Campaign ${campaign.name}, User ${getUserName(campaign.userId)}, Start date ${formatDate(campaign.startDate)}, End date ${formatDate(campaign.endDate)}, Status ${campaign.isActive ? 'Active' : 'Inactive'}, Budget ${formatBudget(campaign.Budget)}`}
              >
                <TableData role="cell">
                  <strong>{campaign.name}</strong>
                </TableData>
                <TableData role="cell">
                  {getUserName(campaign.userId)}
                </TableData>
                <TableData role="cell" aria-label={`Start date: ${formatDate(campaign.startDate)}`}>
                  {formatDate(campaign.startDate)}
                </TableData>
                <TableData role="cell" aria-label={`End date: ${formatDate(campaign.endDate)}`}>
                  {formatDate(campaign.endDate)}
                </TableData>
                <TableData role="cell">
                  <StatusBadge
                    $active={Boolean(campaign.isActive)}
                    role="status"
                    aria-label={`Campaign status: ${campaign.isActive ? 'Active' : 'Inactive'}`}
                  >
                    <StatusIcon
                      aria-hidden="true"
                      title={campaign.isActive ? 'Active indicator' : 'Inactive indicator'}
                    />
                    {campaign.isActive ? 'Active' : 'Inactive'}
                  </StatusBadge>
                </TableData>
                <BudgetCell
                  role="cell"
                  aria-label={`Budget: ${formatBudget(campaign.Budget)}`}
                >
                  {formatBudget(campaign.Budget)}
                </BudgetCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </TableContainer>
  );
}

export default CampaignList;
