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
  const notFoundMessage = getByText('Page requested not found 😭');
  expect(notFoundMessage).toBeInTheDocument();
});
