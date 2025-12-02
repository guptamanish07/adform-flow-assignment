import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Label from './Label';

describe('Label Component', () => {
  test('renders label with children text', () => {
    render(<Label>Test Label</Label>);
    const label = screen.getByText('Test Label');
    expect(label).toBeInTheDocument();
  });

  test('applies htmlFor attribute correctly', () => {
    render(<Label htmlFor="test-input">Test Label</Label>);
    const label = screen.getByText('Test Label');
    expect(label).toHaveAttribute('for', 'test-input');
  });

  test('has default text color', () => {
    render(<Label>Colored Label</Label>);
    const label = screen.getByText('Colored Label');
    expect(label).toHaveStyle('color: #333');
  });

  test('renders as block element', () => {
    render(<Label>Block Label</Label>);
    const label = screen.getByText('Block Label');
    expect(label).toHaveStyle('display: block');
  });

  test('combines custom props with default styling', () => {
    render(
      <Label
        weight="500"
        size="12px"
        marginBottom="8px"
      >
        Combined Props
      </Label>
    );
    const label = screen.getByText('Combined Props');
    expect(label).toHaveStyle('font-weight: 500');
    expect(label).toHaveStyle('font-size: 12px');
    expect(label).toHaveStyle('margin-bottom: 8px');
  });

});
