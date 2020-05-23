import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import data from '../data';
import isPokemonFavoriteById from '../components/mocks';
import { element } from 'prop-types';

const pokemonTypes = [
  ...new Set(data.reduce((types, { type }) => [...types, type], [])),
];

describe('tests Pokedex.js', () => {
  test('shows next pokemon button in Pokedex page', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={data} isPokemonFavoriteById={isPokemonFavoriteById} />,
    );

    const nextPokemon = getByText('Próximo pokémon');

    expect(nextPokemon).toBeInTheDocument();
  });

  test('next pokemon button show next pokemon', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={data} isPokemonFavoriteById={isPokemonFavoriteById} />,
    );

    const nextPokemon = getByText('Próximo pokémon');

    data.forEach(({ name }) => {
      expect(getByText(name)).toBeInTheDocument();
      fireEvent.click(nextPokemon);
    });
  });

  test('after last pokemon a new click should show the first pokemon', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={data} isPokemonFavoriteById={isPokemonFavoriteById} />,
    );

    const nextPokemon = getByText('Próximo pokémon');

    data.forEach(() => fireEvent.click(nextPokemon));
    expect(getByText(data[0].name)).toBeInTheDocument();
  });

  test('should show just one pokemon at once', () => {
    const { getAllByText } = renderWithRouter(
      <Pokedex pokemons={data} isPokemonFavoriteById={isPokemonFavoriteById} />,
    );

    const moreDetails = getAllByText('More details');

    expect(moreDetails.length).toBe(1);
  });

  test('Pokedex page should have filter buttons with the name equal the type', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={data} isPokemonFavoriteById={isPokemonFavoriteById} />,
    );

    pokemonTypes.forEach((type, index) => {
      const button = getAllByTestId('pokemon-type-button')[index];
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent(type);
    });
  });

  test('clink in a filter button should shows just pokemons of that type', () => {
    const { getByText, getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={data} isPokemonFavoriteById={isPokemonFavoriteById} />,
    );

    const nextPokemon = getByText('Próximo pokémon');

    pokemonTypes.forEach((type, index) => {
      const button = getAllByTestId('pokemon-type-button')[index];

      fireEvent.click(button);

      const filtredPokemons = data.filter((pokemon) => pokemon.type === type);

      filtredPokemons.forEach((pokemon, _, array) => {
        expect(getByText(pokemon.name)).toBeInTheDocument();
        if (array.length > 1) fireEvent.click(nextPokemon);
      });
    });
  });

  test('Pokedex page should have a reset button', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={data} isPokemonFavoriteById={isPokemonFavoriteById} />,
    );

    const all = getByText('All');

    expect(all).toBeInTheDocument();
  });

  test('click in All button should show all the pokemons', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={data} isPokemonFavoriteById={isPokemonFavoriteById} />,
    );

    const all = getByText('All');
    const nextPokemon = getByText('Próximo pokémon');

    fireEvent.click(all);
    data.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(nextPokemon);
    });
  });

  test('verify if the all button is load first', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={data} isPokemonFavoriteById={isPokemonFavoriteById} />,
    );

    const nextPokemon = getByText('Próximo pokémon');

    data.forEach((element) => {
      expect(getByText(element.name)).toBeInTheDocument();
      fireEvent.click(nextPokemon);
    });
    expect(getByText(data[0].name)).toBeInTheDocument();
  });

  test('Pokedex page should a button filter for each type of pokemon', () => {
    const { getByText, getAllByText } = renderWithRouter(
      <Pokedex pokemons={data} isPokemonFavoriteById={isPokemonFavoriteById} />,
    );

    pokemonTypes.forEach((type) => {
      const button = getAllByText(type)[1] || getByText(type);
      expect(button).toBeInTheDocument();
    });
  });

  test('next pokemon button should disabled if theres only one pokemon', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={data} isPokemonFavoriteById={isPokemonFavoriteById} />,
    );

    const nextPokemon = getByText('Próximo pokémon');
    const bug = getByText('Bug');

    fireEvent.click(bug);

    expect(nextPokemon).toBeDisabled();
  });
});
