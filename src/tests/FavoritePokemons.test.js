import React from 'react';
import { Router } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { FavoritePokemons } from '../components';
import pokemons from '../data';

const renderWithRouter = (
  ui,
  { history = createMemoryHistory({ initialEntries: ['/'] }) } = {},
) => ({
  ...render(<Router history={history}>{ui}</Router>),
  history,
});

describe('3. Testes no arquivo FavoritePokenons.js', () => {
  afterEach(cleanup);

  test('3.1 - Caso a pessoa não tenha pokémons favoritos, a mensagem No favorite pokemon found deve aparecer na tela', () => {
    const { getByText } = render(<FavoritePokemons pokemons={[]}/>);
    expect(getByText(/No favorite p/i)).toBeInTheDocument();
  });

  test('3.2 - A página não deve exibir nenhum card de pokémon não favoritado', () => {
    const { queryByText } = renderWithRouter(<FavoritePokemons pokemons={pokemons.slice(0, 4)} />);
    expect(queryByText(/Alakazam/i)).not.toBeInTheDocument();
    expect(queryByText(/Snorlax/i)).not.toBeInTheDocument();
    expect(queryByText(/Mew/i)).not.toBeInTheDocument();
  });

  test('3.3 - A página deve exibir todos os cards de pokémons favoritados', () => {
    const { getByText, getByRole } = renderWithRouter(<FavoritePokemons pokemons={pokemons.slice(5, 8)} />);
    // fireEvent.click(getByText(/More det/i));
    // fireEvent.click(getByRole('form'));
    // fireEvent.click(getByText(/Favorite Pok/i));
    expect(getByText(/Mew/i)).toBeInTheDocument();
    expect(getByText(/Rapidash/i)).toBeInTheDocument();
    expect(getByText(/Snorlax/i)).toBeInTheDocument();
  });
});
