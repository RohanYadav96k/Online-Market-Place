

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header', () => {
  render(<App />);
  const headerElement = screen.getByRole('banner'); // or use a better test ID
  expect(headerElement).toBeInTheDocument();
});
