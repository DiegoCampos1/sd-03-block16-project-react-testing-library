import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import data from '../data';

const pokemonTypes = [
  ...new Set(data.reduce((types, { type }) => [...types, type], [])),
];

function forEachPokemon(getByText) {
  data.forEach(({ name }) => {
    const nextPokemon = getByText('Próximo pokémon');
    expect(getByText(name)).toBeInTheDocument();
    fireEvent.click(nextPokemon);
  });
}

describe('tests Pokedex.js', () => {
  test('Verify the button next pokemon in page', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/' });

    expect(getByText('Próximo pokémon')).toBeInTheDocument();
  });

  test('Verify if the next pokemon button shows next pokemon', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/' });

    forEachPokemon(getByText);
  });

  test('Verify if the when next button clicked in the last pokemon, returns to the start', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/' });
    const nextButton = getByText('Próximo pokémon');

    data.forEach(() => fireEvent.click(nextButton));

    expect(getByText(data[0].name)).toBeInTheDocument();
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  test('Verify if the Pokedex shows just one pokemon at once', () => {
    const { getAllByText } = renderWithRouter(<App />, { route: '/' });
    const detailsButton = getAllByText('More details');

    expect(detailsButton.length).toBe(1);
  });

  test('Verify filter buttons with the name equal the type', () => {
    const { getAllByTestId } = renderWithRouter(<App />, { route: '/' });

    pokemonTypes.forEach((type, index) => {
      const typeButton = getAllByTestId('pokemon-type-button')[index];
      expect(typeButton).toBeInTheDocument();
      expect(typeButton).toHaveTextContent(type);
    });
  });

  test('Verify if filter buttons should shows the just right type', () => {
    const { getByText, getAllByTestId } = renderWithRouter(<App />, { route: '/' });

    const nextButton = getByText('Próximo pokémon');

    pokemonTypes.forEach((type, index) => {
      const button = getAllByTestId('pokemon-type-button')[index];

      fireEvent.click(button);

      const filtredPokemons = data.filter((pokemon) => pokemon.type === type);

      filtredPokemons.forEach((pokemon, _, array) => {
        expect(getByText(pokemon.name)).toBeInTheDocument();
        if (array.length > 1) fireEvent.click(nextButton);
      });
    });
  });

  test('Verify if Pokedex page has a reset button', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/' });

    expect(getByText('All')).toBeInTheDocument();
  });

  test('Verify if All button shows all the pokemons', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/' });
    const allButton = getByText('All');

    fireEvent.click(allButton);

    forEachPokemon(getByText);
  });

  test('Verify if the All button is loaded first', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/' });

    forEachPokemon(getByText);
    expect(getByText(data[0].name)).toBeInTheDocument();
  });

  test('Verify all the types button', () => {
    const { getAllByText, getByText } = renderWithRouter(<App />, { route: '/' });

    pokemonTypes.forEach((type) => {
      const typeButton = getAllByText(type)[1] || getByText(type);
      expect(typeButton).toBeInTheDocument();
    });
  });

  test('Verify if type button is disable for types with just one pokémon', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/' });
    const nextButton = getByText('Próximo pokémon');
    const dragonTypeButton = getByText('Dragon');

    fireEvent.click(dragonTypeButton);

    expect(nextButton).toBeDisabled();
  });
});
