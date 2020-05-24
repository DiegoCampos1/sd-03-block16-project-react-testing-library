import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import data from '../data';

const pokemonTypes = [
  ...new Set(data.reduce((types, { type }) => [...types, type], [])),
];

function forEachFunction(getByText) {
  data.forEach(({ name }) => {
    const nextPokemon = getByText('Próximo pokémon');
    expect(getByText(name)).toBeInTheDocument();
    fireEvent.click(nextPokemon);
  });
}

describe('tests Pokedex.js', () => {
  test('shows next pokemon button in Pokedex page', () => {
    const { getByText } = renderWithRouter(
      <App />,
    );

    const nextPokemonButton = getByText('Próximo pokémon');

    expect(nextPokemonButton).toBeInTheDocument();
  });

  test('next pokemon button show next pokemon', () => {
    const { getByText } = renderWithRouter(
      <App />,
    );


    forEachFunction(getByText);
  });

  test('after last pokemon a new click should show the first pokemon', () => {
    const { getByText } = renderWithRouter(
      <App />,
    );

    const nextPokemonButton = getByText('Próximo pokémon');

    data.forEach(() => fireEvent.click(nextPokemonButton));
    expect(getByText(data[0].name)).toBeInTheDocument();
  });

  test('should show just one pokemon at once', () => {
    const { getByText, getAllByText } = renderWithRouter(
      <App />,
    );

    const moreDetails = getAllByText('More details');

    expect(moreDetails.length).toBe(1);
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  test('Pokedex page should have filter buttons with the name equal the type', () => {
    const { getAllByTestId } = renderWithRouter(
      <App />,
    );

    pokemonTypes.forEach((type, index) => {
      const button = getAllByTestId('pokemon-type-button')[index];
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent(type);
    });
  });

  test('clink in a filter button should shows just pokemons of that type', () => {
    const { getByText, getAllByTestId } = renderWithRouter(
      <App />,
    );

    const nextPokemonButton = getByText('Próximo pokémon');

    pokemonTypes.forEach((type, index) => {
      const button = getAllByTestId('pokemon-type-button')[index];

      fireEvent.click(button);

      const filtredPokemons = data.filter((pokemon) => pokemon.type === type);

      filtredPokemons.forEach((pokemon, _, array) => {
        expect(getByText(pokemon.name)).toBeInTheDocument();
        if (array.length > 1) fireEvent.click(nextPokemonButton);
      });
    });
  });

  test('Pokedex page should have a reset button', () => {
    const { getByText } = renderWithRouter(
      <App />,
    );

    const all = getByText('All');

    expect(all).toBeInTheDocument();
  });

  test('click in All button should show all the pokemons', () => {
    const { getByText } = renderWithRouter(
      <App />,
    );

    const all = getByText('All');

    fireEvent.click(all);
    forEachFunction(getByText);
  });

  test('verify if the all button is load first', () => {
    const { getByText } = renderWithRouter(
      <App />,
    );

    forEachFunction(getByText);

    expect(getByText(data[0].name)).toBeInTheDocument();
  });

  test('Pokedex page should a button filter for each type of pokemon', () => {
    const { getByText, getAllByText } = renderWithRouter(
      <App />,
    );

    pokemonTypes.forEach((type) => {
      const button = getAllByText(type)[1] || getByText(type);
      expect(button).toBeInTheDocument();
    });
  });

  test('next pokemon button should disabled if theres only one pokemon', () => {
    const { getByText } = renderWithRouter(
      <App />,
    );

    const nextPokemonButton = getByText('Próximo pokémon');
    const bug = getByText('Bug');

    fireEvent.click(bug);

    expect(nextPokemonButton).toBeDisabled();
  });
});
