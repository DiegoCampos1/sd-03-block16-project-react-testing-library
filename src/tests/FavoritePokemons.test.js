import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import App from '../App';

afterEach(cleanup);

test('testing favorite pokémons page', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
 );

  const favPokeLink = getByText(/Favorite/i);
  fireEvent.click(favPokeLink);
  const noFavFound = getByText('No favorite pokemon found');
  expect(noFavFound).toBeInTheDocument();

  const homeLink = getByText(/Home/i);
  fireEvent.click(homeLink);

  const detailsLink = getByText(/More details/i);
  fireEvent.click(detailsLink);
  const checkboxFav = getByText(/Pokémon favoritado?/i);
  fireEvent.click(checkboxFav);
  fireEvent.click(favPokeLink);
  const pokemonFav = getByText(/Pikachu/i);
  expect(pokemonFav).toBeInTheDocument();
});