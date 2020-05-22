import React from 'react';
import { fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

// test('No pokemons favorite', () => {
//   const { queryByRole } = renderWithRouter(<FavoritePokemons />);
//   const pokemonsFavorite = queryByRole('isEmpty') === 0;
//   expect(pokemonsFavorite).toBeNull();
// });

test('No favorite Pokemons', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons pokemons={[]} />);
  const noFavorite = getByText(/No favorite pokemon found/i);
  expect(noFavorite).toBeTruthy();
  // expect(noCard).not.toBeNull();
});

test('No card favorite', () => {
  const { getByText, getAllByText } = renderWithRouter(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const moreDetails = getByText(/More details/i);
  expect(moreDetails).toBeInTheDocument();
  fireEvent.click(moreDetails);

  const favoritePokemons = getByText(/Favorite pokémons ?/i);
  expect(favoritePokemons).toBeInTheDocument();
  fireEvent.click(favoritePokemons);

  const cardFavorite = getAllByText(/Favorite Pokémons/i);
  expect(cardFavorite.length).not.toBeNull();
});

test('Cards favorite in page', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const cardList = getByText(/No favorite pokemon found/i);
  expect(cardList).toBeInTheDocument();
});
