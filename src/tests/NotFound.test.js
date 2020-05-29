import React from 'react';
import { cleanup } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../services/renderWithRouter';

afterEach(cleanup);

test('Testing NotFound Page ', () => {
  const { getByText, getByRole, getByAltText } = renderWithRouter(<NotFound />);

  const H2Output = getByRole('heading');
  expect(H2Output).toBeInTheDocument();
  expect(H2Output.tagName).toBe('H2');

  const H2Text = getByText('Page requested not found');
  expect(H2Text).toBeInTheDocument();

  const pokedexImg = getByAltText('Pikachu crying because the page requested was not found');
  expect(pokedexImg.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
