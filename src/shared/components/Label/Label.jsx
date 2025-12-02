import React from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
  font-weight: ${props => props.$weight || '600'};
  color: #333;
  font-size: ${props => props.$size || '14px'};
  margin-bottom: ${props => props.$marginBottom || '5px'};
  display: block;
`;

const Label = ({
  weight = '600',
  size = '14px',
  marginBottom = '5px',
  children,
  ...props
}) => {
  return (
    <StyledLabel
      $weight={weight}
      $size={size}
      $marginBottom={marginBottom}
      {...props}
    >
      {children}
    </StyledLabel>
  );
};

export default Label;

