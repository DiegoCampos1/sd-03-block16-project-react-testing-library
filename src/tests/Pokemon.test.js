import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { Pokemon } from '../components';
import App from '../App';

afterEach(cleanup);

const pokemon = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
};

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    // 3
    history,
  };
}

describe('Testes do arquivo Pokemon.js', () => {
  it('Deve ser retornado um card com as informações de determinado pokémon', () => {
    const {
      queryByText, getByTestId, getByAltText,
    } = renderWithRouter(
      <Pokemon
        pokemon={pokemon}
        showDetailsLink
        isFavorite
      />,
    );

    const notFavorite = getByTestId(/pokemon-name/i);
    expect(notFavorite).toBeInTheDocument();
    expect(notFavorite.innerHTML).toEqual('Pikachu');

    const averageWeight = getByTestId(/pokemon-weight/i);
    expect(averageWeight).toBeInTheDocument();
    expect(averageWeight.innerHTML).toEqual('Average weight:6.0kg');

    const type = getByTestId(/pokemonType/i);
    expect(type).toBeInTheDocument();
    expect(type.innerHTML).toEqual('Electric');

    const image = getByAltText(/Pikachu sprite/i);
    expect(image).toBeInTheDocument();
    expect(image.src).toEqual('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');

    const pokemonLink = queryByText(/More details/i);
    expect(pokemonLink).toBeInTheDocument();
    expect(pokemonLink).toHaveAttribute('href', '/pokemons/25');

    const pokemonFavorite = getByAltText(/Pikachu is marked as favorite/i);
    expect(pokemonFavorite).toBeInTheDocument();
    expect(pokemonFavorite).toHaveAttribute('src', '/star-icon.svg');
  });

  it('Pokémons favoritados devem exibir um ícone de uma estrela', () => {
    const { getByText, queryByText } = renderWithRouter(<App />);

    const pokemonLink = queryByText(/More details/i);
    expect(pokemonLink).toBeInTheDocument();
    expect(pokemonLink).toHaveAttribute('href', '/pokemons/25');
    fireEvent.click(pokemonLink);
    const clickDetails = getByText(/Pikachu Details/i);
    expect(clickDetails).toHaveTextContent('Pikachu Details');
  });
});
