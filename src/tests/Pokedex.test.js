import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Pokedex from '../components/Pokedex';

import pokemons from '../data';

const renderWithRouter = (ui, history = createMemoryHistory()) =>
  render(<Router history={history}>{ui}</Router>);

const mockedPokemonFavoriteById = { 0: false };

describe('Pokedex', () => {
  afterEach(cleanup);

  describe('Button of next Pokémon', () => {
    test('should exits', () => {
      const { getByText } = renderWithRouter((
        <Pokedex isPokemonFavoriteById={mockedPokemonFavoriteById} pokemons={pokemons} />
      ));
      const button = getByText('Próximo pokémon');
      expect(button).toBeInTheDocument();
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
      const { getByText, getAllByRole, getByTestId } = renderWithRouter((
        <Pokedex isPokemonFavoriteById={mockedPokemonFavoriteById} pokemons={pokemons} />
      ));
      const buttons = getAllByRole('button');
      const nextPokemon = getByText('Próximo pokémon');

      expect(buttons[2]).toContainHTML('Fire');
      fireEvent.click(buttons[2]);
      expect(nextPokemon).toBeEnabled();
      fireEvent.click(nextPokemon);
      expect(getByTestId('pokemonType')).toContainHTML('Fire');

      expect(buttons[5]).toContainHTML('Psychic');
      fireEvent.click(buttons[5]);
      expect(nextPokemon).toBeEnabled();
      fireEvent.click(nextPokemon);
      expect(getByTestId('pokemonType')).toContainHTML('Psychic');

      expect(buttons[1]).toContainHTML('Electric');
      fireEvent.click(buttons[1]);
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
