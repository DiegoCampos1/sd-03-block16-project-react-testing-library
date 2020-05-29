import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import pokemons from '../data';
import Pokedex from '../components/Pokedex';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

const typeButtons = () => pokemons.reduce((acc, e) => {
  if (acc.includes(e.type)) {
    return acc;
  }
  acc.push(e.type);
  return acc;
}, []);

const mockIsPokemonFavoriteById = {
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

afterEach(cleanup);

test('Testing the reset of the next pokemon button ', () => {
  const { getByTestId } = renderWithRouter(<App />);

  const nextButton = getByTestId(/next-pokemon/i);
  expect(nextButton).toBeInTheDocument();
  expect(nextButton).toHaveTextContent(/Próximo pokémon/i);
  pokemons.forEach((elem) => {
    const pokemonName = getByTestId(/pokemon-name/i);
    const pokemonType = getByTestId(/pokemonType/i);
    const pokemonWeight = getByTestId(/pokemon-weight/i);
    expect(pokemonName).toHaveTextContent(elem.name);
    expect(pokemonType).toHaveTextContent(elem.type);
    expect(pokemonWeight).toHaveTextContent(`Average weight:${elem.averageWeight.value}${elem.averageWeight.measurementUnit}`);
    fireEvent.click(nextButton);
  });
});

test('Testing just one pokémon on display ', () => {
  const { queryAllByTestId } = renderWithRouter(<Pokedex
    pokemons={pokemons}
    isPokemonFavoriteById={mockIsPokemonFavoriteById}
  />);
  const displayOfPokemons = queryAllByTestId(/pokemon-name/i);
  expect(displayOfPokemons).toHaveLength(1);
});

test('Testing the type buttons ', () => {
  const { getAllByTestId } = renderWithRouter(<Pokedex
    pokemons={pokemons}
    isPokemonFavoriteById={mockIsPokemonFavoriteById}
  />);
  const pokemonTypeButton = getAllByTestId(/pokemon-type-button/i);
  const renderPokemonTypeButton = pokemonTypeButton.map((elem) => elem.textContent);
  expect(pokemonTypeButton).toHaveLength(typeButtons().length);
  expect(renderPokemonTypeButton).toStrictEqual(typeButtons());
});

test('Testing the reset button all ', () => {
  const { getByText, getByTestId, getAllByTestId } = renderWithRouter(<Pokedex
    pokemons={pokemons}
    isPokemonFavoriteById={mockIsPokemonFavoriteById}
  />);
  const allButton = getByText(/All/i);
  expect(allButton).toBeInTheDocument();
  const pokemonTypeButton = getAllByTestId(/pokemon-type-button/i);
  fireEvent.click(pokemonTypeButton[5]);
  const pokemonName = getByTestId(/pokemon-name/i);
  expect(pokemonName).toHaveTextContent(/Snorlax/i);
  fireEvent.click(allButton);
  expect(pokemonName).toHaveTextContent(/Pikachu/i);
});

test('Testing the disable next button ', () => {
  const { getByTestId, getAllByTestId } = renderWithRouter(<Pokedex
    pokemons={pokemons}
    isPokemonFavoriteById={mockIsPokemonFavoriteById}
  />);
  const nextButton = getByTestId(/next-pokemon/i);
  const pokemonTypeButton = getAllByTestId(/pokemon-type-button/i);
  fireEvent.click(pokemonTypeButton[5]);
  expect(nextButton).toBeDisabled();
});
