import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemon from '../data';

// test('Next Pokemon button', () => {
//   const { getByText } = renderWithRouter(<Pokedex />);
//   const textButton = getByText(/Próximo pokémon/i);
//   expect(textButton).toBeInTheDocument();
// });

test('Value Button Pokemon', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);
  const btn = getByText(/Próximo pokémon/i);
  // const btn = dataTestId('next-pokemon');
  expect(btn).toBeInTheDocument();
  fireEvent.click(btn);
  // expect(btn.value).toBe('Próximo pokémon');
  pokemon.forEach((elem) => {
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument(elem.name);
    fireEvent.click(btn);
  });
});

test('Test buttons for each title', () => {
  // const everyButtons =
  // ['All', 'Eletric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon' ];
  const { getAllByText } = renderWithRouter(<App />);
  const buttonType = getAllByText('All', 'Eletric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon');
  buttonType.forEach((elem) => {
    expect(elem).toBeInTheDocument();
  });
});

// test('CLick successives in button', () => {
//   const { getByRole } = renderWithRouter(<App />);
//   const clickBtn = getByRole('button');
//   fireEvent.click(clickBtn);
//   const { getByText } = renderWithRouter(<App />);
//   const clickSuccessives = getByText(/Average weight/i);
//   expect(clickSuccessives).toBeInTheDocument();
// });

// test('Last pokemon return to firts', () => {
//   const { queryAllByAltText } = renderWithRouter(<App />);
//   fireEvent.click(queryAllByAltText('button'));
//   const firstPokemon = getByText(/Eletric/i);
//   expect(firstPokemon).toBeInTheDocument();
// });

test('Pokedex one pokemon in page', () => {
  const { getByText } = renderWithRouter(<App />);
  const indexCard = getByText(/More details/i);
  expect(indexCard.length).not.toBeNull();
});

test('Pokédex container button filter', () => {
  const { getAllByRole } = renderWithRouter(<App />);
  const typeBtn = getAllByRole('button');
  expect(typeBtn.value).not.toBeNull();
});
