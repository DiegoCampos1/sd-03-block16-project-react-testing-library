import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';
import renderWithRouter from '../helper';

const mockedFavoriteID = { 25: true };

const mockedData = [{ ...pokemons[0] }, { ...pokemons[1] }];

const pokemonsTypes = pokemons
  .map(({ type }) => type)
  .reduce(
    (types, type) => (types.includes(type) ? types : [...types, type]),
    [],
  );

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

  test('Próximo pokémon button is disabled with pokemon list have only one pokémon', () => {
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={[pokemons[0]]}
        isPokemonFavoriteById={mockedFavoriteID}
      />,
    );
    const nextButton = getByText(/próximo pokémon/i);

    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toBeDisabled();
  });

  test('All button renders and select all pokémons', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={mockedFavoriteID} />,
    );
    const allTypeButton = getByText(/all/i);
    const nextButton = getByText(/próximo pokémon/i);

    expect(allTypeButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();

    fireEvent.click(allTypeButton);

    const pokemonTitles = pokemons.map(({ name }) => name);
    pokemonTitles.forEach((title) => {
      expect(getByText(title)).toBeInTheDocument();
      fireEvent.click(nextButton);
    });
  });

  test('render filter buttons tests', () => {
    const { getByText, getAllByText } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={mockedFavoriteID} />,
    );

    pokemonsTypes.forEach((type) => {
      const filterButton = getAllByText(type)[1] || getByText(type);
      expect(filterButton).toBeInTheDocument();
      expect(filterButton.textContent).toBe(type);
      expect(filterButton).toHaveAttribute('type', 'button');
    });
    const allTypeButton = getByText(/all/i);
    expect(allTypeButton).toBeInTheDocument();
  });

  test('when click on a type button, only pokemons of that type is selected', () => {
    const { getByText, getAllByText } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={mockedFavoriteID} />,
    );
    const nextButton = getByText(/próximo pokémon/i);

    pokemonsTypes.forEach((type) => {
      const typeButton = getAllByText(type)[1] || getByText(type);
      fireEvent.click(typeButton);
      const filteredPokemons = pokemons.filter(
        (element) => element.type === type,
      );
      filteredPokemons.forEach((filteredPokemon) => {
        expect(getByText(filteredPokemon.name)).toBeInTheDocument();
        if (filteredPokemons.length > 1) fireEvent.click(nextButton);
      });
    });
  });

  test('after click ALL button, the pokemon list backs to displays all pokémons', () => {
    const { getByText, getAllByText } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={mockedFavoriteID} />,
    );
    const allTypeButton = getByText(/all/i);
    const nextButton = getByText(/próximo pokémon/i);

    pokemonsTypes.forEach((type) => {
      const typeButton = getAllByText(type)[1] || getByText(type);
      fireEvent.click(typeButton);
      const filteredPokemons = pokemons.filter(
        (element) => element.type === type,
      );
      filteredPokemons.forEach((filteredPokemon) => {
        expect(getByText(filteredPokemon.name)).toBeInTheDocument();
        if (filteredPokemons.length > 1) fireEvent.click(nextButton);
      });
    });

    fireEvent.click(allTypeButton);

    const pokemonTitles = pokemons.map(({ name }) => name);
    pokemonTitles.forEach((title) => {
      expect(getByText(title)).toBeInTheDocument();
      fireEvent.click(nextButton);
    });
  });
});
