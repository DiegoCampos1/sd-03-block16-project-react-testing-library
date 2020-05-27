import React from 'react';
import { Router } from 'react-router-dom';
import { cleanup, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
// import { getByAltText } from '@testing-library/jest-dom/extend-expect';
import About from '../components/About';

afterEach(cleanup);

function renderWithRouter(
  ui,
  { route = '/about', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}


test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithRouter(<About />);
  const about = getByText(/About Pokédex/i);
  expect(about).toBeInTheDocument();
});

test('check if renders image', () => {
  const { getByAltText } = renderWithRouter(<About />);
  const pokedeximg = getByAltText('Pokédex');
  expect(pokedeximg).toBeInTheDocument();
  const img = pokedeximg.src;
  expect(img).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
