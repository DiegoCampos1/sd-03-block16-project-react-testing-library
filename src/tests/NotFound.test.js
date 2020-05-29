import React from 'react';
import { Router } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import NotFound from '../components/NotFound';

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

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
