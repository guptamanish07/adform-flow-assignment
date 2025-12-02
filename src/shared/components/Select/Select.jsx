import React from 'react';
import styled from 'styled-components';

const StyledSelect = styled.select`
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background: white;
  box-sizing: border-box;
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

  @media (max-width: 480px) {
    width: 100%;
    min-width: 0;
  }
`;

const Select = ({
  className,
  hasError,
  children,
  ...props
}) => {
  const selectClassName = hasError ? `error ${className || ''}`.trim() : className || '';
 
  return (
    <StyledSelect className={selectClassName} {...props}>
      {children}
    </StyledSelect>
  );
};

export default Select;

