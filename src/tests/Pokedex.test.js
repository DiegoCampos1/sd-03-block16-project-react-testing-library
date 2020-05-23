import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { Pokedex } from '../components';
import { pokemons, isPokemonFavoriteById } from './mock';

afterEach(cleanup);

describe('test file Pokedex.js', () => {
  test('Button `Próximo pokémon` should show next pokemon in the list`', () => {
    const { getByText, getByTestId } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={isPokemonFavoriteById} />,
    );
    expect(getByTestId('pokemon-name').textContent).toBe('Pikachu');
    const nextPokemonButton = getByText('Próximo pokémon');
    fireEvent.click(nextPokemonButton);
    expect(getByTestId('pokemon-name').textContent).toBe('Charmander');
    fireEvent.click(nextPokemonButton);
    expect(getByTestId('pokemon-name').textContent).toBe('Rapidash');
    fireEvent.click(nextPokemonButton);
    expect(getByTestId('pokemon-name').textContent).toBe('Pikachu');
  });


  test('Pokedex should show only one pokemon', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={isPokemonFavoriteById} />,
    );
    expect(getAllByTestId('pokemon-name').length).toBe(1);
  });

  test('Contain all filters buttons and `all` button to reset', () => {
    const { getAllByTestId, getByTestId, getByText } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={isPokemonFavoriteById} />,
    );
    const pokemonTypeButtons = getAllByTestId('pokemon-type-button');
    expect(pokemonTypeButtons.length).toBe(2);
    expect(pokemonTypeButtons[0].textContent).toBe('Electric');
    expect(pokemonTypeButtons[1].textContent).toBe('Fire');
    fireEvent.click(pokemonTypeButtons[1]);
    expect(getByTestId('pokemon-name').textContent).toBe('Charmander');
    const nextPokemonButton = getByText('Próximo pokémon');
    fireEvent.click(nextPokemonButton);
    expect(getByTestId('pokemon-name').textContent).toBe('Rapidash');
    fireEvent.click(getByText('All'));
    fireEvent.click(nextPokemonButton);
    expect(getByTestId('pokemon-name').textContent).toBe('Charmander');
    expect(getByTestId('pokemonType').textContent).toBe('Fire');
    fireEvent.click(nextPokemonButton);
    expect(getByTestId('pokemon-name').textContent).toBe('Rapidash');
    expect(getByTestId('pokemonType').textContent).toBe('Fire');
    fireEvent.click(nextPokemonButton);
    expect(getByTestId('pokemon-name').textContent).toBe('Pikachu');
    expect(getByTestId('pokemonType').textContent).toBe('Electric');
  });

  test('Button `Próximo pokémon` should be disabled if there is only one pokemon in list', () => {
    const { getByText, getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={isPokemonFavoriteById} />,
    );
    fireEvent.click(getAllByTestId('pokemon-type-button')[0]);
    const nextPokemonButton = getByText('Próximo pokémon');
    expect(nextPokemonButton).toBeDisabled();
  });

  test('Contain a h2 heading with "Encountered pokémons" text', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={isPokemonFavoriteById} />,
    );
    const heading = getByText('Encountered pokémons');
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
  });
});
