import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
  background-color: ${props => props.variant === 'primary' ? '#007bff' :
                              props.variant === 'success' ? '#28a745' :
                              props.variant === 'danger' ? '#dc3545' :
                              props.variant === 'secondary' ? '#6c757d' :
                              '#007bff'};
  color: white;

  &:hover:not(:disabled) {
    background-color: ${props => props.variant === 'primary' ? '#0056b3' :
                                props.variant === 'success' ? '#218838' :
                                props.variant === 'danger' ? '#c82333' :
                                props.variant === 'secondary' ? '#545b62' :
                                '#0056b3'};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const Button = ({
  variant = 'primary',
  children,
  ...props
}) => {
  return (
    <StyledButton variant={variant} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;

