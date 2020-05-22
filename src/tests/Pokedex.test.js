import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Pokedex from '../components/Pokedex';

import pokemons from '../data';

const renderWithRouter = (ui, history = createMemoryHistory()) =>
  render(<Router history={history}>{ui}</Router>);

const mockedPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe('Pokedex', () => {
  afterEach(cleanup);

  test('should be rendered on the main page', () => {
    const { queryByText } = renderWithRouter((
      <Pokedex isPokemonFavoriteById={mockedPokemonFavoriteById} pokemons={pokemons} />
    ));
    expect(queryByText('Encountered pokémons')).toBeInTheDocument();
  });

  describe('Button of next Pokémon', () => {
    test('should exits', () => {
      const { getByTestId } = renderWithRouter((
        <Pokedex isPokemonFavoriteById={mockedPokemonFavoriteById} pokemons={pokemons} />
      ));
      expect(getByTestId('next-pokemon')).toContainHTML('Próximo pokémon');
    });

    test('should pass to the next pokemon of data', () => {
      const { getByText } = renderWithRouter((
        <Pokedex isPokemonFavoriteById={mockedPokemonFavoriteById} pokemons={pokemons} />
      ));
      expect(getByText('Pikachu')).toBeInTheDocument();
      fireEvent.click(getByText('Próximo pokémon'));
      expect(getByText('Charmander')).toBeInTheDocument();
      fireEvent.click(getByText('Próximo pokémon'));
      expect(getByText('Caterpie')).toBeInTheDocument();
      fireEvent.click(getByText('Próximo pokémon'));
      expect(getByText('Ekans')).toBeInTheDocument();
    });

    test('should have a cicle behavior', () => {
      const { getByText } = renderWithRouter((
        <Pokedex
          isPokemonFavoriteById={mockedPokemonFavoriteById}
          pokemons={[pokemons[0], pokemons[1]]}
        />
      ));
      expect(getByText('Pikachu')).toBeInTheDocument();
      fireEvent.click(getByText('Próximo pokémon'));
      expect(getByText('Charmander')).toBeInTheDocument();
      fireEvent.click(getByText('Próximo pokémon'));
      expect(getByText('Pikachu')).toBeInTheDocument();
    });

    test('only on pokemon at time', () => {
      const { getAllByTestId } = renderWithRouter((
        <Pokedex isPokemonFavoriteById={mockedPokemonFavoriteById} pokemons={pokemons} />
      ));
      expect(getAllByTestId('pokemon-name').length).toBe(1);
    });
  });

  describe('should have filters buttons', () => {
    test('shows only filtered type', () => {
      const { getByText, getAllByTestId, getByTestId } = renderWithRouter((
        <Pokedex isPokemonFavoriteById={mockedPokemonFavoriteById} pokemons={pokemons} />
      ));
      const allFilteredButtons = getAllByTestId('pokemon-type-button');
      const nextPokemon = getByText('Próximo pokémon');

      expect(allFilteredButtons[1]).toContainHTML('Fire');
      fireEvent.click(allFilteredButtons[1]);
      expect(nextPokemon).toBeEnabled();
      fireEvent.click(nextPokemon);
      expect(getByTestId('pokemonType')).toContainHTML('Fire');

      expect(allFilteredButtons[4]).toContainHTML('Psychic');
      fireEvent.click(allFilteredButtons[4]);
      expect(nextPokemon).toBeEnabled();
      fireEvent.click(nextPokemon);
      expect(getByTestId('pokemonType')).toContainHTML('Psychic');

      expect(allFilteredButtons[0]).toContainHTML('Electric');
      fireEvent.click(allFilteredButtons[0]);
      expect(nextPokemon).toBeDisabled();
      fireEvent.click(nextPokemon);
      expect(getByTestId('pokemonType')).toContainHTML('Electric');
    });
  });

  describe('All Button', () => {
    test('should have the text All', () => {
      const { getByText } = renderWithRouter((
        <Pokedex isPokemonFavoriteById={mockedPokemonFavoriteById} pokemons={pokemons} />
      ));
      expect(getByText('All')).not.toContainHTML('<button>All</button>');
    });

    test('should be set on load', () => {
      const { getByText, getByTestId } = renderWithRouter((
        <Pokedex isPokemonFavoriteById={mockedPokemonFavoriteById} pokemons={pokemons} />
      ));
      const nextButton = getByText('Próximo pokémon');
      expect(getByTestId('pokemonType')).toContainHTML('Electric');
      expect(nextButton).toBeEnabled();
      fireEvent.click(nextButton);

      expect(getByTestId('pokemonType')).not.toContainHTML('Electric');
      expect(nextButton).toBeEnabled();

      expect(getByTestId('pokemonType')).not.toContainHTML('Electric');
      expect(nextButton).toBeEnabled();
    });

    test('should return to cicle on all pokemons', () => {
      const { getByText, getByTestId } = renderWithRouter((
        <Pokedex isPokemonFavoriteById={mockedPokemonFavoriteById} pokemons={pokemons} />
      ));
      const nextButton = getByText('Próximo pokémon');
      fireEvent.click(getByText('Fire'));

      expect(nextButton).toBeEnabled();
      fireEvent.click(nextButton);
      expect(getByTestId('pokemonType')).toContainHTML('Fire');

      expect(nextButton).toBeEnabled();
      fireEvent.click(nextButton);
      expect(getByTestId('pokemonType')).toContainHTML('Fire');

      fireEvent.click(getByText('All'));
      expect(getByTestId('pokemonType')).toContainHTML('Electric');
    });

    test('should have one filter for each type of pokémon', () => {
      const { getAllByRole } = renderWithRouter((
        <Pokedex isPokemonFavoriteById={mockedPokemonFavoriteById} pokemons={pokemons} />
      ));
      const typeButtonsLength = getAllByRole('button').length - 2;
      expect(typeButtonsLength).toBe(7);
    });

    test('The next pokemoon button should be disabled if there is only one pokemon', () => {
      const { getByText } = renderWithRouter((
        <Pokedex isPokemonFavoriteById={mockedPokemonFavoriteById} pokemons={[pokemons[0]]} />
      ));
      expect(getByText('Próximo pokémon')).toBeDisabled();
    });
  });
});
