import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('A página deve conter um heading h2 com o texto Page requested not found 😭.', () => {
  const { queryAllByRole, getByText } = render(<NotFound />);
  const headH2 = queryAllByRole('heading');
  const headH2Text = getByText('Page requested not found');
  expect(headH2).toHaveLength(1);
  expect(headH2Text).toBeInTheDocument();
});

test('A página deve exibir a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
  const { queryByAltText } = render(<NotFound />);
  const notFound = queryByAltText('Pikachu crying because the page requested was not found');
  expect(notFound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
