import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';
import { NotFound } from '../components';

test('renders a reading with the text `NotFound`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
      <NotFound />
    </MemoryRouter>,
  );
  expect(getByText('Page requested not found')).toBeInTheDocument();
});

test('look for the image', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
      <NotFound />
    </MemoryRouter>,
  );
  expect(getByText('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
  ))
    .toBeInTheDocument();
});
