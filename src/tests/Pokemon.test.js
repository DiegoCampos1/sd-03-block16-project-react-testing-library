import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from './testService';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

afterEach(cleanup);

describe('Testing Pokemon Component', () => {
  test('testing pokemons name', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon
        pokemon={pokemons[0]}
        isFavorite={false}
      />,
    );

    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent('Pikachu');
  });

  test('testing pokemons type', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon
        pokemon={pokemons[0]}
        isFavorite={false}
      />,
    );
    const pokemonType = getByTestId('pokemonType');
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent(`${pokemons[0].type}`);
  });

  test('testing pokemons weight', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon
        pokemon={pokemons[0]}
        isFavorite={false}
      />,
    );
    const pokemonWeight = getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent('Average weight:6.0kg');
  });

  test('testing pokemons image', () => {
    const { getByRole } = renderWithRouter(
      <Pokemon
        pokemon={pokemons[0]}
        isFavorite={false}
      />,
    );
    const pokemonImg = getByRole('img');
    expect(pokemonImg.src).toBe(pokemons[0].image);
    expect(pokemonImg.alt).toBe(`${pokemons[0].name} sprite`);
  });

  test('testing link to details page', () => {
    const { getByRole } = renderWithRouter(
      <Pokemon
        pokemon={pokemons[0]}
        isFavorite={false}
      />,
    );
    const pokemonLinkToDetail = getByRole('link');
    expect(pokemonLinkToDetail).toBeInTheDocument();
    expect(pokemonLinkToDetail).toHaveAttribute('href', `/pokemons/${pokemons[0].id}`);
  });

  test('testing favoriting pokemon', () => {
    const { queryAllByRole } = renderWithRouter(
      <Pokemon
        pokemon={pokemons[0]}
        isFavorite
      />,
    );
    const pokemonStarFavorite = queryAllByRole('img')[1];
    expect(pokemonStarFavorite).toHaveAttribute('src', '/star-icon.svg');
    expect(pokemonStarFavorite).toHaveAttribute('alt', `${pokemons[0].name} is marked as favorite`);
  });
});
