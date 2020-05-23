import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import data from '../data';
import renderWithRouter from '../renderWithRouter';

afterEach(cleanup);

test('testing whether page shows next pokemon when button clicked', () => {
  const { getByText } = renderWithRouter(<Pokedex
    pokemons={data}
    isPokemonFavoriteById={{ 4: true }}
  />);
  const nextPokemonbtn = getByText('Próximo pokémon');
  expect(nextPokemonbtn).toBeInTheDocument();
  const firstPokemon = getByText('Pikachu');
  expect(firstPokemon).toBeInTheDocument();
  fireEvent.click(nextPokemonbtn);
  const secondPokemon = getByText('Charmander');
  expect(secondPokemon).toBeInTheDocument();
  fireEvent.click(nextPokemonbtn);
  const thirdPokemon = getByText('Caterpie');
  expect(thirdPokemon).toBeInTheDocument();
  fireEvent.click(nextPokemonbtn);
  const fourthPokemon = getByText('Ekans');
  expect(fourthPokemon).toBeInTheDocument();
});

test('testing whether page shows one pokemon at a time', () => {
  const { getAllByText, getByText } = renderWithRouter(<Pokedex
    pokemons={data}
    isPokemonFavoriteById={{ 4: true }}
  />);
  const nextPokemonbtn = getByText('Próximo pokémon');
  fireEvent.click(nextPokemonbtn);
  const pokemonCard = getAllByText('More details');
  expect(pokemonCard.length).toBe(1);
});

test('testing whether filter works', () => {
  const { getAllByText, getByText } = renderWithRouter(<Pokedex
    pokemons={data}
    isPokemonFavoriteById={{ 4: true }}
  />);
  const filter = getByText('Fire');
  fireEvent.click(filter);
  const type = getAllByText('Fire');
  expect(type.length).toBe(2);
  const nextPokemonbtn = getByText('Próximo pokémon');
  fireEvent.click(nextPokemonbtn);
  expect(type.length).toBe(2);
});

test('testing whether unfilter works', () => {
  const { getByText } = renderWithRouter(<Pokedex
    pokemons={data}
    isPokemonFavoriteById={{ 4: true }}
  />);
  const unfilter = getByText('All');
  expect(unfilter).toBeInTheDocument();
  fireEvent.click(unfilter);
  const selectedpokemon = getByText('Pikachu');
  expect(selectedpokemon).toBeInTheDocument();
  const nextPokemonbtn = getByText('Próximo pokémon');
  fireEvent.click(nextPokemonbtn);
  const secondPokemon = getByText('Charmander');
  expect(secondPokemon).toBeInTheDocument();
});

test('testing whether page shows filter buttons', () => {
  const { getAllByRole, getByText } = renderWithRouter(<Pokedex
    pokemons={data}
    isPokemonFavoriteById={{ 4: true }}
  />);
  const btn = getAllByRole('button');
  const poisonbtn = getByText('Poison');
  expect(btn.length).toBe(9);
  expect(poisonbtn).toBeInTheDocument();
});

test('testing whether page shows all filters', () => {
  const array = ['All', 'Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
  const { getAllByText } = renderWithRouter(<Pokedex
    pokemons={data}
    isPokemonFavoriteById={{ 4: true }}
  />);
  array.forEach((el) => {
    const btn = getAllByText(el);
    expect(btn.length).toBeLessThanOrEqual(2);
    expect(btn.length).toBeGreaterThan(0);
  });
});

test('testing whether page shows disabled button', () => {
  const { getByText } = renderWithRouter(<Pokedex
    pokemons={data}
    isPokemonFavoriteById={{ 4: true }}
  />);
  const btn = getByText('Normal');
  fireEvent.click(btn);
  const nextbtn = getByText('Próximo pokémon');
  expect(nextbtn.disabled).toBeTruthy();
  const btn2 = getByText('Fire');
  fireEvent.click(btn2);
  expect(nextbtn.disabled).not.toBeTruthy();
});

test('testing whether page shows pokedex', () => {
  const { getByText } = renderWithRouter(<Pokedex
    pokemons={data}
    isPokemonFavoriteById={{ 4: true }}
  />);
  const heading = getByText('Encountered pokémons');
  expect(heading).toBeInTheDocument();
});

test('testing whether filter buttons in on screen', () => {
  const { getAllByTestId } = renderWithRouter(<Pokedex
    pokemons={data}
    isPokemonFavoriteById={{ 4: true }}
  />);
  const btn = getAllByTestId('pokemon-type-button');
  expect(btn.length).toBe(7);
});
