import React from 'react';
import Favorite from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import { fireEvent } from '@testing-library/react';

test('No favorite pokemon found', () => {
  const { getByText } = renderWithRouter(<Favorite />);
  const noFound = getByText('No favorite pokemon found');
  expect(noFound).toBeInTheDocument();
});

test('não exibir nenhum card de pokemon não favoritado', () => {
  const { getByText } = renderWithRouter(<App />);
  
  const linkMoreDetails = getByText('More details');
  expect(linkMoreDetails).toBeInTheDocument();

  fireEvent.click(linkMoreDetails);

  const pokemonFavoritado = getByText('Pokémon favoritado?');
  expect(pokemonFavoritado).toBeInTheDocument();

  fireEvent.click(pokemonFavoritado);

  const favoritePokemons = getByText('Favorite Pokémons');
  expect(favoritePokemons).toBeInTheDocument();

  const pikachu = getByText('Pikachu');
  expect(pikachu).toBeInTheDocument();

});
