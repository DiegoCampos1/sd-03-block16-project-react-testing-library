import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';
import renderWithRouter from '../helper';

const mockedFavoriteID = { 25: true };

const mockedData = [{ ...pokemons[0] }, { ...pokemons[1] }];

describe('Pokedex.js component tests', () => {
  afterEach(cleanup);

  test('Pokedex renders, and renders only one pokémon at time', () => {
    const { getByText, getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={pokemons}
        isPokemonFavoriteById={mockedFavoriteID}
        isFavorite
      />,
    );
    const heading = getByText(/encountered pokémons/i);
    const displayedPokemon = getAllByTestId('pokemon-name');

    expect(heading).toBeInTheDocument();
    expect(displayedPokemon.length).toBe(1);
  });

  test('Próximo pokémon button tests. When clicking on button the next pokémon of list is displayed and when the last pokémon is on the screen the first pokémon of list is displayed, after a click', () => {
    const { queryByText } = renderWithRouter(
      <Pokedex
        pokemons={mockedData}
        isPokemonFavoriteById={mockedFavoriteID}
      />,
    );
    const nextButton = queryByText(/próximo pokémon/i);

    expect(nextButton).toBeInTheDocument();
    expect(queryByText(`${mockedData[0].name}`)).toBeInTheDocument();
    fireEvent.click(nextButton);
    expect(queryByText(`${mockedData[1].name}`)).toBeInTheDocument();
    fireEvent.click(nextButton);
    expect(queryByText(`${mockedData[0].name}`)).toBeInTheDocument();
  });

  test('Próximo pokémon button is disabled with pokemon list have oly one pokémon', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={[pokemons[0]]} isPokemonFavoriteById={mockedFavoriteID} />,
    );
    const nextButton = getByText(/próximo pokémon/i);

    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toBeDisabled();
  });

  test('All button tests', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={mockedFavoriteID} />,
    );
    const allTypeButton = getByText(/all/i);

    expect(allTypeButton).toBeInTheDocument();
  });

  test('Filter buttons tests', () => {
    const { container } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={mockedFavoriteID} />,
    );
    const filterTypeButtons = container.querySelectorAll('.filter-button');
    expect(filterTypeButtons.length).toBe(8);
  });
});
