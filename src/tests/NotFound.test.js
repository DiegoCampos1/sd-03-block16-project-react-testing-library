import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('Not Found page shows not found message', () => {
  const { getByText } = render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  );
  const notFoundMessage = getByText('Page requested not found');
  expect(notFoundMessage).toBeInTheDocument();
});

test('Not Found page shows proper image', () => {
  const { getByAltText } = render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  );
  const pikachuImage = getByAltText('Pikachu crying because the page requested was not found');
  expect(pikachuImage.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
