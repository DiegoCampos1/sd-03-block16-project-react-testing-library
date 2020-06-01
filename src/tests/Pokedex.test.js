import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('', () => {
  afterEach(cleanup);
  const isPokemonFavoriteById = {
    25: false,
    4: false,
    10: false,
    23: false,
    65: false,
    151: false,
    78: false,
    143: false,
    148: false,
  };
  test('The button should have the text "Próximo pokémon', () => {
    const { queryByTestId } = renderWithRouter(<Pokedex
      pokemons={pokemons}
      isPokemonFavoriteById={isPokemonFavoriteById}
    />);
    const button = queryByTestId('next-pokemon');
    expect(button).toBeInTheDocument();
    expect(button.innerHTML).toBe('Próximo pokémon');
  });

  test('The Pokedex should have filters buttons', () => {
    const { queryAllByTestId } = renderWithRouter(<Pokedex
      pokemons={pokemons}
      isPokemonFavoriteById={isPokemonFavoriteById}
    />);
    const filterAllButton = queryAllByTestId('pokemon-type-button');
    expect(filterAllButton.length).toBe(7);
  });

  test('The Pokédex must contain a button to reset the filter', () => {
    const { queryByText } = renderWithRouter(<Pokedex
      pokemons={pokemons}
      isPokemonFavoriteById={isPokemonFavoriteById}
    />);
    const filterAllButton = queryByText('All');
    expect(filterAllButton).toBeInTheDocument();
    fireEvent.click(filterAllButton);
    const pikachu = queryByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });

  test('The Pokédex should dynamically generate a filter button for each type of Pokémon', () => {
    const { queryAllByTestId } = renderWithRouter(<Pokedex
      pokemons={pokemons}
      isPokemonFavoriteById={isPokemonFavoriteById}
    />);
    const filterAllButtons = queryAllByTestId('pokemon-type-button');
    expect(filterAllButtons[0].innerHTML).toBe('Electric');
    expect(filterAllButtons[1].innerHTML).toBe('Fire');
    expect(filterAllButtons[2].innerHTML).toBe('Bug');
    expect(filterAllButtons[3].innerHTML).toBe('Poison');
  });

  test('The Pokédex should a h2 title', () => {
    const { queryByText } = renderWithRouter(<Pokedex
      pokemons={pokemons}
      isPokemonFavoriteById={isPokemonFavoriteById}
    />);
    const titlePokedexPage = queryByText('Encountered pokémons');
    expect(titlePokedexPage).toBeInTheDocument();
  });
});
