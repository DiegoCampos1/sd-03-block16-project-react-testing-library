import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { cleanup, render, within } from '@testing-library/react';
import NotFound from '../components/NotFound';

afterEach(cleanup);

test('Header must be h2 tag', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  );

  const { getByText } = within(getByRole('heading', { level: 2 }));
  expect(getByText('Page requested not found')).toBeInTheDocument();
});

test('Check source of image', () => {
  const { getByAltText } = render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  );

  const source = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  expect(getByAltText('Pikachu crying because the page requested was not found')).toHaveAttribute('src', source);
});
