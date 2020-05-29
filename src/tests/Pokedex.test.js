import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

test('Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista', () => {
  const { getByText } = renderWithRouter(<App />);

  const nextButton = getByText('Próximo pokémon');
  expect(nextButton).toBeInTheDocument();

  fireEvent.click(getByText(/Próximo pokémon/i));
  const nextPokemon1 = getByText('Charmander');
  expect(nextPokemon1).toBeInTheDocument();

  fireEvent.click(getByText(/Próximo pokémon/i));
  const nextPokemon2 = getByText('Caterpie');
  expect(nextPokemon2).toBeInTheDocument();
});