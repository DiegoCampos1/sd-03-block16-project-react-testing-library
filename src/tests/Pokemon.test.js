import React from 'react';
import { fireEvent } from '@testing-library/react';
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

test('O tipo de pokémon deve ser exibido.', () => {
  const { getByTestId } = renderWithRouter(<App />);
  const pokemonType = getByTestId('pokemonType');
  expect(pokemonType.textContent).toBe('Electric');
});

test('A imagem deve conter um atributo src com a URL da imagem e alt com o texto <name> sprite.', () => {
  const { queryByAltText } = renderWithRouter(<App />);
  const pokemonImg = queryByAltText('Pikachu sprite');
  expect(pokemonImg.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});

test('Deve conter um link de navegação para exibir detalhes.', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/More details/i));
  const pathname = history.location.pathname;
  expect(pathname).toBe('/pokemons/25');
});

test('Pokémons favoritados devem exibir um ícone de uma estrela.', () => {
  const { getByText, queryByAltText } = renderWithRouter(<App />);
  fireEvent.click(getByText(/More details/i));
  fireEvent.click(getByText(/Pokémon favoritado?/i));
  const favoriteIcon = queryByAltText('Pikachu is marked as favorite');
  expect(favoriteIcon.src).toBe('http://localhost/star-icon.svg');
});
