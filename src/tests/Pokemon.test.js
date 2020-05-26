import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import Pokemon from '../components/Pokemon';

describe('Pokemon.js tests', () => {
  const mockedPikachu = {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map: 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
    summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
  };

  test('Renders correct pokemon name', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon pokemon={mockedPikachu} isFavorite={false} />);
    expect(getByTestId(/pokemon-name/i)).toHaveProperty('innerHTML', 'Pikachu');
  });

  test('Renders correct average weight', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon pokemon={mockedPikachu} isFavorite={false} />);
    expect(getByTestId(/pokemon-weight/i)).toHaveProperty('innerHTML', 'Average weight:6.0kg');
  });

  test('Renders correct image', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon pokemon={mockedPikachu} isFavorite={false} />);
    const image = getByAltText(/Pikachu sprite/i);
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Renders correct details link', () => {
    const { getByText } = renderWithRouter(
      <Pokemon pokemon={mockedPikachu} isFavorite={false} />);
    expect(getByText(/More details/i).href).toBe('http://localhost/pokemons/25');
  });

  test('Details link redirects properly', () => {
    const { getByText, history } = renderWithRouter(
      <Pokemon pokemon={mockedPikachu} isFavorite={false} />);
    fireEvent.click(getByText(/More details/i));
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('Favorited pokemon displays star image', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon pokemon={mockedPikachu} isFavorite />);
    expect(getByAltText(/Pikachu is marked as favorite/i).src).toBe('http://localhost/star-icon.svg');
  });

  test('Renders correct pokemon type', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon pokemon={mockedPikachu} isFavorite={false} />);
    expect(getByTestId(/pokemonType/i)).toHaveProperty('innerHTML', 'Electric');
  });
});
