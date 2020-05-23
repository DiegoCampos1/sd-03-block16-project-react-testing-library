import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from './testRenderService';
import App from '../App';


describe('Testing FavoritePokemos file', () => {
  afterEach(cleanup);
  test('testing No favorite pokemon foud text', () => {
    const { getByText } = renderWithRouter(<App />);

    const pokemonFavorite = getByText(/Favorite/i);
    fireEvent.click(pokemonFavorite);
    const favoritePokemonNoFoud = getByText('No favorite pokemon found');
    expect(favoritePokemonNoFoud).toBeInTheDocument();

    const home = getByText(/Home/i);
    fireEvent.click(home);

    const detailsPokemon = getByText(/More details/i);
    fireEvent.click(detailsPokemon);
    const checkFavorite = getByText(/Pokémon favoritado?/i);
    fireEvent.click(checkFavorite);
    fireEvent.click(pokemonFavorite);
    const pokemon = getByText(/Pikachu/i);
    expect(pokemon).toBeInTheDocument();
  });
});
