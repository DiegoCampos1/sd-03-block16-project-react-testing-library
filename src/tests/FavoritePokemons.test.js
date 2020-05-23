import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FavoritePokemons } from '../components';
import App from '../App';

afterEach(cleanup);

describe('FavoritePokemons.js testing', () => {
  test('No favorite pokémon found text', () => {
    const { getByText } = render(<FavoritePokemons pokemons={[]} />);
    const notFavoritedPokemonText = getByText('No favorite pokemon found');
    expect(notFavoritedPokemonText).toBeInTheDocument();
  });

  test('Pokémon favorite displayed', () => {
    const { getAllByAltText, getByText, getByLabelText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const pokemonDetail = getByText(/More details/i);
    fireEvent.click(pokemonDetail);
    const favoriteButton = getByLabelText('Pokémon favoritado?');
    fireEvent.click(favoriteButton);
    const favoritePokemonButton = getByText('Favorite Pokémons');
    fireEvent.click(favoritePokemonButton);
    const pokemon = getAllByAltText(/is marked as favorite/i);
    expect(pokemon.length).toBe(1);
  });
});
