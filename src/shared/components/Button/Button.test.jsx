import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Button from './Button';

describe('Button Component', () => {
  test('renders button with children', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  test('applies primary variant by default', () => {
    render(<Button>Primary Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle('background-color: #007bff');
  });

  test('applies success variant correctly', () => {
    render(<Button variant="success">Success Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle('background-color: #28a745');
  });

  test('applies secondary variant correctly', () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle('background-color: #6c757d');
  });

  test('applies danger variant correctly', () => {
    render(<Button variant="danger">Danger Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle('background-color: #dc3545');
  });

  test('handles click events', async () => {
    const mockClick = jest.fn();
    render(<Button onClick={mockClick}>Clickable Button</Button>);
    const button = screen.getByRole('button');
   
    await userEvent.click(button);
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  test('can be disabled', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  test('does not handle click when disabled', async () => {
    const mockClick = jest.fn();
    render(<Button disabled onClick={mockClick}>Disabled Button</Button>);
    const button = screen.getByRole('button');
   
    await userEvent.click(button);
    expect(mockClick).not.toHaveBeenCalled();
  });
});
