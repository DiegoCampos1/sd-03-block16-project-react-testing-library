import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from './testRenderService';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

const favorite = true;

describe('Testing Pokemon File', () => {
  afterEach(cleanup);

  test('card with Pokemon information', () => {
    const { getByTestId, getByRole } = renderWithRouter(
      <Pokemon pokemon={pokemons[0]} isFavorite={false} />,
    );

    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent('Pikachu');

    const pokemonAverageWeight = getByTestId('pokemon-weight');
    expect(pokemonAverageWeight).toBeInTheDocument();
    expect(pokemonAverageWeight).toHaveTextContent('Average weight:6.0kg');

    const pokemonImage = getByRole('img');
    expect(pokemonImage.src).toBe(`${pokemons[0].image}`);
    expect(pokemonImage.alt).toBe(`${pokemons[0].name} sprite`);

    const pokemonType = getByTestId('pokemonType');
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent(`${pokemons[0].type}`);

    const pokemonLink = getByRole('link');
    expect(pokemonLink).toBeInTheDocument();
    expect(pokemonLink).toHaveAttribute('href', `/pokemons/${pokemons[0].id}`);
  });

  test('testing icon favorite Pokemon', () => {
    const { getAllByRole } = renderWithRouter(
      <Pokemon pokemon={pokemons[0]} isFavorite={favorite} />,
    );

    const pokemonFavorite = getAllByRole('img')[1];
    expect(pokemonFavorite).toHaveAttribute('src', '/star-icon.svg');
    expect(pokemonFavorite).toHaveAttribute('alt', `${pokemons[0].name} is marked as favorite`);
  });
});
