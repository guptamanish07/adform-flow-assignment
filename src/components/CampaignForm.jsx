import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const FormContainer = styled.div`
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
`;

const FormTitle = styled.h3`
  margin-top: 0;
  color: #333;
  border-bottom: 2px solid #007bff;
  padding-bottom: 10px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin-bottom: 20px;

  @media (max-width: 480px){
    grid-template-columns: unset;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
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

`;

const Select = styled.select`
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background: white;
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

`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
`;


const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const SubmitButton = styled(Button)`
  background-color: #28a745;
  color: white;

  &:hover:not(:disabled) {
    background-color: #218838;
  }
`;

const CancelButton = styled(Button)`
  background-color: #6c757d;
  color: white;

  &:hover {
    background-color: #545b62;
  }
`;

function CampaignForm({ onSubmit, onCancel }) {
  const { users } = useSelector(state => state.users);
 
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    Budget: '',
    userId: ''
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.trim() ? '' : 'Campaign name is required';
      case 'startDate':
        return value ? '' : 'Start date is required';
      case 'endDate':
        if (!value) return 'End date is required';
        if (formData.startDate && new Date(value) < new Date(formData.startDate)) {
          return 'End date cannot be before start date';
        }
        return '';
      case 'Budget':
        if (!value) return 'Budget is required';
        const budget = parseFloat(value);
        if (isNaN(budget) || budget <= 0) return 'Budget must be a positive number';
        return '';
      case 'userId':
        return value ? '' : 'User selection is required';
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
   
    setFormData(prev => ({ ...prev, [name]: value }));
   
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    const newErrors = {};
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const campaign = {
        ...formData,
        id: Date.now(),
        Budget: parseFloat(formData.Budget),
        userId: parseInt(formData.userId)
      };
     
      onSubmit(campaign);
    }
  };

  const getInputClassName = (fieldName) => {
    return errors[fieldName] ? 'error' : '';
  };

  return (
    <FormContainer>
      <FormTitle>Add New Campaign</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormGrid>
          <FormGroup>
            <Label htmlFor="name">Campaign Name *</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className={getInputClassName('name')}
              placeholder="Enter campaign name"
            />
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="startDate">Start Date *</Label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleInputChange}
              className={getInputClassName('startDate')}
            />
            {errors.startDate && <ErrorMessage>{errors.startDate}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="endDate">End Date *</Label>
            <Input
              id="endDate"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleInputChange}
              className={getInputClassName('endDate')}
              min={formData.startDate}
            />
            {errors.endDate && <ErrorMessage>{errors.endDate}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="Budget">Budget (USD) *</Label>
            <Input
              id="Budget"
              name="Budget"
              type="number"
              step="1"
              min="0"
              value={formData.Budget}
              onChange={handleInputChange}
              className={getInputClassName('Budget')}
              placeholder="0.00"
            />
            {errors.Budget && <ErrorMessage>{errors.Budget}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="userId">Assign to User *</Label>
            <Select
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleInputChange}
              className={getInputClassName('userId')}
            >
              <option value="">Select a user</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Select>
            {errors.userId && <ErrorMessage>{errors.userId}</ErrorMessage>}
          </FormGroup>
        </FormGrid>

        <ButtonGroup>
          <CancelButton type="button" onClick={onCancel}>
            Cancel
          </CancelButton>
          <SubmitButton type="submit">
            Add Campaign
          </SubmitButton>
        </ButtonGroup>
      </form>
    </FormContainer>
  );
}

export default CampaignForm;

