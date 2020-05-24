import React from 'react';
import { Router } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { FavoritePokemons } from '../components';
import App from '../App';

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');

  return ({
    ...originalModule,
    BrowserRouter: ({ children }) => (<div>{children}</div>),
  });
});

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  };
}

describe('3. Testes no arquivo FavoritePokenons.js', () => {
  afterEach(cleanup);

  test('3.1 - Caso a pessoa não tenha pokémons favoritos, a mensagem No favorite pokemon found deve aparecer na tela', () => {
    const { getByText } = render(<FavoritePokemons />);
    expect(getByText(/No favorite p/i)).toBeInTheDocument();
  });

  test('3.2 - A página não deve exibir nenhum card de pokémon não favoritado', () => {
    const { getByText, queryByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More det/i));
    fireEvent.click(getByText(/mon favoritado/i));
    fireEvent.click(getByText(/Favorite Pok/i));
    // expect(() => queryByText(/Mew/i)).toThrow();     tb funcionam
    // expect(() => queryByText(/Snorlax/i)).toThrow(); sem declarar no render acima
    expect(queryByText(/Alakazam/i)).not.toBeInTheDocument();
    expect(queryByText(/Snorlax/i)).not.toBeInTheDocument();
    expect(queryByText(/Mew/i)).not.toBeInTheDocument();
  });

  test('3.3 - A página deve exibir todos os cards de pokémons favoritados', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More det/i));
    fireEvent.click(getByRole('form'));
    fireEvent.click(getByText(/Favorite Pok/i));
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
  });
});
