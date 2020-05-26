import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';

import App from '../App';
import pokemons from '../data';

test('teste botão', () => {
  const { getByText, getByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const botaoProx = getByText(/Próximo/i);
  expect(botaoProx).toBeInTheDocument();
  const idName = getByTestId('pokemon-name');
  pokemons.forEach(({ name }) => {
    const nomePokemon = getByTestId('pokemon-name').innerHTML;
    expect(nomePokemon).toBe(name);
    fireEvent.click(botaoProx);
    const proxPokemon = getByTestId('pokemon-name').innerHTML;
    expect(proxPokemon).not.toBe(name);
  });

  expect(idName.innerHTML).toBe(getByTestId('pokemon-name').innerHTML);
});

test('All button', () => {
  const { getByText, getByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const fireBotao = getByText(/fire/i);
  fireEvent.click(fireBotao);
  const botaoTodos = getByText(/All/i);
  fireEvent.click(botaoTodos);
  expect(getByTestId('pokemon-name').innerHTML).toBe('Pikachu');
});

test('Tipos de botao', () => {
  const { getByText, getAllByTestId, getByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const homeMensagem = getByText('Encountered pokémons');
  expect(homeMensagem).toBeInTheDocument();
  const tiposBotoes = getAllByTestId('pokemon-type-button');
  const arrayBotao = [];
  tiposBotoes.forEach((button) => {
    const tipoPokemonAtual = getByTestId('pokemonType');
    fireEvent.click(button);
    arrayBotao.push(button.innerHTML);
    expect(button.innerHTML).toBe(tipoPokemonAtual.innerHTML);
  });

  const dataArray = [];
  pokemons.forEach(({ type }) => {
    if (!dataArray.includes(type)) {
      dataArray.push(type);
    }
    return dataArray;
  });

  expect(arrayBotao).toMatchObject(dataArray);
});
