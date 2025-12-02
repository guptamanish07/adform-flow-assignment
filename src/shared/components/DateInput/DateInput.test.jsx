import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import DateInput from './DateInput';

describe('DateInput Component', () => {
  test('renders date input element', () => {
    render(<DateInput />);
    const input = screen.getByDisplayValue('');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'date');
  });

  test('handles date input', async () => {
    render(<DateInput />);
    const input = screen.getByDisplayValue('');

    await userEvent.type(input, '2024-01-15');
    expect(input).toHaveValue('2024-01-15');
  });

  test('applies error styling when hasError is true', () => {
    render(<DateInput hasError={true} />);
    const input = screen.getByDisplayValue('');
    expect(input).toHaveClass('error');
  });

  test('does not apply error styling when hasError is false', () => {
    render(<DateInput hasError={false} />);
    const input = screen.getByDisplayValue('');
    expect(input).not.toHaveClass('error');
  });

  test('handles onChange events', async () => {
    const mockChange = jest.fn();
    render(<DateInput onChange={mockChange} />);
    const input = screen.getByDisplayValue('');
   
    await userEvent.type(input, '2024-01-15');
    expect(mockChange).toHaveBeenCalled();
  });

  test('accepts initial value', () => {
    render(<DateInput defaultValue="2024-01-15" />);
    const input = screen.getByDisplayValue('2024-01-15');
    expect(input).toBeInTheDocument();
  });

  test('can be disabled', async () => {
    render(<DateInput disabled />);
    const input = screen.getByDisplayValue('');
   
    expect(input).toBeDisabled();
    await userEvent.type(input, '2024-01-15');
    expect(input).toHaveValue('');
  });
});
