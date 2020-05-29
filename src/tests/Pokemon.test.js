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

test('A imagem deve conter um atributo src com a URL da imagem do pokémon e um atributo alt com o texto <name> sprite, onde <name> é o nome do pokémon.', () => {
  const { queryByAltText } = renderWithRouter(<App />);
  const pokemonImg = queryByAltText('Pikachu sprite');
  expect(pokemonImg.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});
