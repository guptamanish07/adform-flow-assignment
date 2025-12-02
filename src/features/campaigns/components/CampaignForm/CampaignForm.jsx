import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import DateInput from 'shared/components/DateInput';
import Label from 'shared/components/Label';
import Select from 'shared/components/Select';
import Button from 'shared/components/Button';
import Input from 'shared/components/Input';

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

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
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

  const today = new Date().toISOString().split('T')[0];

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
              hasError={!!errors.name}
              placeholder="Enter campaign name"
              width="auto"
            />
            <ErrorMessage>{errors.name}</ErrorMessage>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="startDate">Start Date *</Label>
            <DateInput
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              hasError={!!errors.startDate}
              min={today}
              width="auto"
            />
            {errors.startDate && <ErrorMessage>{errors.startDate}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="endDate">End Date *</Label>
            <DateInput
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              hasError={!!errors.endDate}
              min={formData.startDate}
              width="auto"
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
              hasError={!!errors.Budget}
              placeholder="0.00"
              width="auto"
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
              hasError={!!errors.userId}
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
          <Button variant="secondary" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="success" type="submit">
            Add Campaign
          </Button>
        </ButtonGroup>
      </form>
    </FormContainer>
  );
}

export default CampaignForm;

