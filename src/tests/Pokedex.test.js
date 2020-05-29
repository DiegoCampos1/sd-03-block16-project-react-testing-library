import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';
import pokemons from '../data';

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

afterEach(cleanup);

describe('Testes do arquivo Pokedex.js', () => {
  test('Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);

    const nextPokeButton = getByText('Próximo pokémon');
    expect(nextPokeButton).toBeInTheDocument();
    expect(nextPokeButton).toHaveTextContent('Próximo pokémon');
    pokemons.forEach((e) => {
      const pokemonName = getByTestId('pokemon-name');
      expect(pokemonName).toHaveTextContent(e.name);
      fireEvent.click(nextPokeButton);
    });
    expect(getByTestId('pokemon-name')).toHaveTextContent('Pikachu');
  });

  test('A Pokédex deve exibir apenas um pokémon por vez', () => {
    const { queryAllByTestId } = renderWithRouter(<App />);
    expect(queryAllByTestId('pokemon-name')).toHaveLength(1);
  });

  test('A Pokédex deve conter botões de filtro', () => {
    const { getAllByTestId, getByText } = renderWithRouter(<App />);

    const pokemonType = getAllByTestId('pokemon-type-button')[0];
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Electric');

    const encountred = getByText('Encountered pokémons');
    expect(encountred).toBeInTheDocument();
    expect(encountred).toHaveTextContent('Encountered pokémons');
  });

  test('A Pokédex deve conter um botão para resetar o filtro', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);

    const nextButton = getByText('Próximo pokémon');
    const typeButtonFire = getByText('Fire');
    const buttonAll = getByText('All');
    const pokemonName = getByTestId('pokemon-name');
    expect(buttonAll).toBeInTheDocument();
    fireEvent.click(typeButtonFire);
    expect(pokemonName).toHaveTextContent('Charmander');
    fireEvent.click(buttonAll);
    pokemons.forEach((e) => {
      expect(pokemonName).toHaveTextContent(e.name);
      fireEvent.click(nextButton);
    });
  });
});
