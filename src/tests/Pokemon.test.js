import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../renderWithRouter';
import Pokemons from '../data';

describe('Test of the Pokemon Page-', () => {
  afterEach(cleanup);
  test('The average weight of the Pokémon must be displayed', () => {
    const { queryByText } = renderWithRouter(<Pokemon
      pokemon={Pokemons[0]}
      isFavorite={false}
    />);
    const name = queryByText('Pikachu');
    const averageWeight = queryByText('Average weight:6.0kg');
    expect(name).toBeInTheDocument();
    expect(averageWeight).toBeInTheDocument();
  });

  test('The correct name of the Pokémon should appear on the screen', () => {
    const { getByAltText } = renderWithRouter(<Pokemon
      pokemon={Pokemons[0]}
      isFavorite={false}
    />);
    const imagePath = getByAltText('Pikachu sprite');
    expect(imagePath.alt).toBe('Pikachu sprite');
    expect(imagePath.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('The Poké displayed on the Pokédex must contain a navigation link to view details', () => {
    const { queryByText, history } = renderWithRouter(<Pokemon
      pokemon={Pokemons[0]}
      isFavorite={false}
    />);
    const linkDetails = queryByText('More details');
    fireEvent.click(linkDetails);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('image must contain a src attribute with the URL of the pokémon image', () => {
    const { getByAltText } = renderWithRouter(<Pokemon
      pokemon={Pokemons[0]}
      isFavorite
    />);
    const favoriteIcon = getByAltText('Pikachu is marked as favorite');
    expect(favoriteIcon.src).toBe('http://localhost/star-icon.svg');
    expect(favoriteIcon.alt).toBe('Pikachu is marked as favorite');
  });

  test('Type of Pokemon must be in the page', () => {
    const { getByTestId } = renderWithRouter(<Pokemon
      pokemon={Pokemons[0]}
      isFavorite={false}
    />);
    const pokemonType = getByTestId('pokemonType');
    expect(pokemonType.innerHTML).toBe('Electric');
  });
});
