import React from 'react';
import { cleanup } from '@testing-library/react';
import { pokemons } from './Mock';
import renderWithRouter from './MemoryHistory';
import Pokemon from '../components/Pokemon';

afterEach(cleanup);

describe('Test Pokemon.js', () => {
  test('Pokemon name should be correct', () => {
    const { getByTestId } = renderWithRouter((
      <Pokemon pokemon={pokemons[2]} isFavorite={false} />
    ));
    expect(getByTestId('pokemon-name').textContent).toBe('Rapidash');
  });

  test('Pokemon weight should be correct', () => {
    const { getByText } = renderWithRouter((
      <Pokemon pokemon={pokemons[2]} isFavorite={false} />
    ));
    expect(getByText('Average weight:95.0kg')).toBeInTheDocument();
  });

  test('Pokemon image alt should be correct', () => {
    const { getByAltText } = renderWithRouter((
      <Pokemon pokemon={pokemons[2]} isFavorite={false} />
    ));
    const image = getByAltText('Rapidash sprite');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/5/58/Spr_5b_078.png');
  });

  test('Should contain a link to "/pokemon/id"', () => {
    const { getByText } = renderWithRouter((
      <Pokemon pokemon={pokemons[2]} isFavorite={false} />
    ));
    const linkToDetails = getByText('More details');
    expect(linkToDetails.href).toMatch(/\/pokemons\/78/);
  });

  test('Pokemon type should be correct', () => {
    const { getByTestId } = renderWithRouter((
      <Pokemon pokemon={pokemons[2]} isFavorite={false} />
    ));
    expect(getByTestId('pokemonType').textContent).toBe('Fire');
  });

  test('Should contain favorite icon with correct alt', () => {
    const isFavorite = true;
    const { getByAltText } = renderWithRouter((
      <Pokemon pokemon={pokemons[2]} isFavorite={isFavorite} />
    ));
    const img = getByAltText('Rapidash is marked as favorite');
    expect(img).toBeInTheDocument();
    expect(img.src).toMatch(/\/star-icon.svg/);
  });
});
