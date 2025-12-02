import React from 'react';
import styled from 'styled-components';

const StyledDateInput = styled.input`
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;
  box-sizing: border-box;
  width: ${props => props.width || '140px'};
  min-width: ${props => props.minWidth || '120px'};

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
    max-width: none;
  }
`;

const DateInput = ({
  className,
  hasError,
  width,
  minWidth,
  ...props
}) => {
  const inputClassName = hasError ? `error ${className || ''}`.trim() : className || '';
 
  return (
    <StyledDateInput
      type="date"
      className={inputClassName}
      width={width}
      minWidth={minWidth}
      {...props}
    />
  );
};

export default DateInput;

