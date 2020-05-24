import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from './mock';

afterEach(cleanup);

describe('Return de information of one pokemon', () => {
  test('Name pokemon in home page', () => {
    const { getByTestId } = renderWithRouter((
      <Pokemon pokemon={pokemons[0]} isFavorite={false} />));
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName.textContent).toBe('Caterpie');
  });

  test('Avarege weigth of the pokemon', () => {
    const { getByText } = renderWithRouter((
      <Pokemon pokemon={pokemons[0]} isFavorite={false} />));
    const avaregeWeigth = getByText('Average weight:2.9kg');
    expect(avaregeWeigth).toBeInTheDocument();
  });

  test('Shold Image in pokemon', () => {
    const { getByAltText } = renderWithRouter((
      <Pokemon pokemon={pokemons[0]} isFavorite={false} />));
    const img = getByAltText('Caterpie sprite');
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://cdn.bulbagarden.net/upload/8/83/Spr_5b_010.png');
  });

  test('Should id for pokemon witch link', () => {
    const { getByText } = renderWithRouter(
      <Pokemon pokemon={pokemons[0]} isFavorite={false} />);
    const moreDetails = getByText('More details');
    expect(moreDetails).toBeInTheDocument();
    // expect(moreDetails.href).toBe('http://localhost/pokemons/10');
    expect(moreDetails.href).toMatch('pokemons/10');
  });

  test('Should type of the pokemon', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon pokemon={pokemons[0]} isFavorite={false} />);
    const typePokemon = getByTestId('pokemonType');
    expect(typePokemon.textContent).toBe('Bug');
  });

  test('Should favorite icon with id', () => {
    const isFavorite = true;
    const { getByAltText } = renderWithRouter(
      <Pokemon pokemon={pokemons[0]} isFavorite={isFavorite} />);
    const img = getByAltText('Caterpie is marked as favorite');
    expect(img).toBeInTheDocument();
    expect(img.src).toMatch('/star-icon.svg');
  });
});
