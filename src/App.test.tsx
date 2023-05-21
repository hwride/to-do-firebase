import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

test('renders to do text', () => {
  render(<App />);
  const toDoText = screen.getByText(/To do/i);
  expect(toDoText).not.toBeNull();
});
