import React, { use } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Input from './Input';

describe('Input Component', () => {
  test('renders input element', () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  test('applies placeholder correctly', () => {
    render(<Input placeholder="Test placeholder" />);
    const input = screen.getByPlaceholderText('Test placeholder');
    expect(input).toBeInTheDocument();
  });

  test('handles text input', async () => {
    render(<Input placeholder="Type here" />);
    const input = screen.getByRole('textbox');
   
    await userEvent.type(input, 'Hello World');
    expect(input).toHaveValue('Hello World');
  });

  test('applies error styling when hasError is true', () => {
    render(<Input hasError={true} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('error');
  });

  test('does not apply error styling when hasError is false', () => {
    render(<Input hasError={false} />);
    const input = screen.getByRole('textbox');
    expect(input).not.toHaveClass('error');
  });

  test('handles onChange events', async () => {
    const mockChange = jest.fn();
    render(<Input onChange={mockChange} />);
    const input = screen.getByRole('textbox');

    await userEvent.type(input, 'test');
    expect(mockChange).toHaveBeenCalledTimes(4);
  });

  test('can be disabled', async () => {
    render(<Input disabled />);
    const input = screen.getByRole('textbox');
   
    expect(input).toBeDisabled();
    await userEvent.type(input, 'test');
    expect(input).toHaveValue('');
  });

  test('handles focus and blur events', async () => {
    const mockFocus = jest.fn();
    const mockBlur = jest.fn();
    render(<Input onFocus={mockFocus} onBlur={mockBlur} />);
    const input = screen.getByRole('textbox');

    await userEvent.click(input);
    expect(mockFocus).toHaveBeenCalledTimes(1);
   
    await userEvent.tab();
    expect(mockBlur).toHaveBeenCalledTimes(1);
  });
});
