import React from 'react';
// import { render } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

test('O nome correto do pokémon deve aparecer na tela.', () => {
  const { getByTestId } = renderWithRouter(<App />);
  const pokemonName = getByTestId('pokemon-name');
  expect(pokemonName.textContent).toBe('Pikachu');
});

test('O peso médio do pokémon deve ser exibido.', () => {
  const { getByTestId } = renderWithRouter(<App />);
  const pokemonWeight = getByTestId('pokemon-weight');
  expect(pokemonWeight.textContent).toBe('Average weight:6.0kg');
});
