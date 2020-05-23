import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from './testRenderService';
import App from '../App';
import pokemons from '../data';
import { Pokedex } from '../components';

const mockedPokemonFavoriteById = { 25: false };

describe('Testing Pokedex file', () => {
  afterEach(cleanup);
  test('When pressing the next button, the page should display the next pokémon in the list', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);

    const buttonAll = getByText('All');
    const nextPokemonButton = getByText(/Próximo pokémon/i);
    expect(nextPokemonButton).toBeInTheDocument();

    expect(buttonAll).toBeInTheDocument();
    fireEvent.click(buttonAll);
    pokemons.forEach((elem) => {
      const namePokemon = getByTestId('pokemon-name');
      expect(namePokemon).toBeInTheDocument(elem.name);
      fireEvent.click(nextPokemonButton);
    });
  });

  test('the Pokédex must contain filter buttons', () => {
    const { getAllByText, getByText } = renderWithRouter(<App />);

    const textH2 = getByText('Encountered pokémons');
    expect(textH2).toBeInTheDocument();

    const filterButton = getAllByText('All', 'Eletric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon');
    filterButton.forEach((elem) => {
      expect(elem).toBeInTheDocument();
    });
  });

  test('filter type Pokémon', () => {
    const { getByText, getAllByTestId, getByTestId } = renderWithRouter(
      <Pokedex isPokemonFavoriteById={mockedPokemonFavoriteById} pokemons={pokemons} />,
    );

    const filterButton = getAllByTestId('pokemon-type-button');
    const nextPokemonButton = getByText('Próximo pokémon');

    expect(filterButton[1]).toContainHTML('Fire');
    fireEvent.click(filterButton[1]);
    expect(nextPokemonButton).toBeEnabled();
    fireEvent.click(nextPokemonButton);
    expect(getByTestId('pokemonType')).toContainHTML('Fire');
  });
});
