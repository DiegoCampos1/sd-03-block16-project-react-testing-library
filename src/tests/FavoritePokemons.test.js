import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

test('testing favorite pokémons page', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
 );

  const pokeLinkFavorite = getByText(/Favorite/i);
  fireEvent.click(pokeLinkFavorite);

  const noFavoriteFound = getByText('No favorite pokemon found');
  expect(noFavoriteFound).toBeInTheDocument();

  const homeLink = getByText(/Home/i);
  fireEvent.click(homeLink);

  const detailsLink = getByText(/More details/i);
  fireEvent.click(detailsLink);

  const checkboxFav = getByText(/Pokémon favoritado?/i);
  fireEvent.click(checkboxFav);
  fireEvent.click(pokeLinkFavorite);

  const pokemonFav = getByText(/Pikachu/i);
  expect(pokemonFav).toBeInTheDocument();
});
