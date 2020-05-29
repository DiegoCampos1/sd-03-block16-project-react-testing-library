import React from 'react';
import { Router } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import About from '../components/About';

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

test('Testing on the About of the pokédex ', () => {
  const { getByText, getByRole } = renderWithRouter(<About />);

  const H2Output = getByRole('heading');
  expect(H2Output).toBeInTheDocument();
  expect(H2Output.tagName).toBe('H2');

  const H2Text = getByText('About Pokédex');
  expect(H2Text).toBeInTheDocument();

  const paragraphs = document.querySelectorAll('p');
  expect(paragraphs).toHaveLength(2);

  const pokedexImg = getByRole('img');
  expect(pokedexImg.src).toBe(
    'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
  );
});
