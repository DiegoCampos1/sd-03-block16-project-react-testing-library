import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

test('Caso a pessoa não tenha pokémons favoritos, a mensagem No favorite pokemon found deve aparecer na tela.', () => {
  const { getByText } = render(<FavoritePokemons />);
  const noFavorite = getByText('No favorite pokemon found');
  expect(noFavorite).toBeInTheDocument();
});

test('A página não deve exibir nenhum card de pokémon não favoritado e deve exibir todos os cards de pokémons favoritados.', () => {
  const { getByText, queryByText } = renderWithRouter(<App />);
  fireEvent.click(getByText(/More details/i));
  fireEvent.click(getByText(/Pokémon favoritado?/i));
  fireEvent.click(getByText(/Favorite Pokémons/i));
  const pikachu = getByText(/Pikachu/i);
  const charmander = queryByText(/Charmander/i);
  expect(pikachu).toBeInTheDocument();
  expect(charmander).toBeNull();
});
