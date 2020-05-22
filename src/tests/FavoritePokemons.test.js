import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FavoritePokemons } from '../components';
import App from '../App';

afterEach(cleanup);

describe('test file FavoritePokemons.js', () => {
  test('Contain "No favorite pokémon found" text if there isn`t favorited pokémon', () => {
    const { getByText } = render(<FavoritePokemons pokemons={[]} />);
    const notFavoritedPokemonText = getByText('No favorite pokemon found');
    expect(notFavoritedPokemonText).toBeInTheDocument();
  });

  test('Displaying Pokémon only if he is favorited', () => {
    const { getAllByAltText, getByText, getByLabelText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const pokemonDetailLink = getByText(/More details/i);
    fireEvent.click(pokemonDetailLink);
    const favoriteCheckButton = getByLabelText('Pokémon favoritado?');
    fireEvent.click(favoriteCheckButton);
    const favoritePokemonsButton = getByText('Favorite Pokémons');
    fireEvent.click(favoritePokemonsButton);
    const pokemon = getAllByAltText(/is marked as favorite/i);
    expect(pokemon.length).toBe(1);
  });
});
