import React from 'react';
import { fireEvent } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import renderWithRouter from '../renderWithRouter';
import data from '../data';

describe('Testes do arquivo Pokedex.js', () => {
  const isPokemonFavoriteById = {
    4: false,
    10: false,
    23: false,
    25: false,
    65: false,
    78: false,
    143: false,
    148: false,
    151: false,
  };

  const pokemons = [
    {
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
    },
    {
      id: 4,
      name: 'Charmander',
      type: 'Fire',
      averageWeight: {
        value: '8.5',
        measurementUnit: 'kg',
      },
      image: 'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
      foundAt: [
        {
          location: 'Alola Route 3',
          map: 'https://cdn.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
        },
        {
          location: 'Kanto Route 3',
          map: 'https://cdn.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
        },
        {
          location: 'Kanto Route 4',
          map: 'https://cdn.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
        },
        {
          location: 'Kanto Rock Tunnel',
          map: 'https://cdn.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
        },
      ],
      summary: 'The flame on its tail shows the strength of its life force. If it is weak, the flame also burns weakly.',
    },
    {
      id: 10,
      name: 'Caterpie',
      type: 'Bug',
      averageWeight: {
        value: '2.9',
        measurementUnit: 'kg',
      },
      image: 'https://cdn.bulbagarden.net/upload/8/83/Spr_5b_010.png',
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Caterpie_(Pok%C3%A9mon)',
      foundAt: [
        {
          location: 'Johto Route 30',
          map: 'https://cdn.bulbagarden.net/upload/7/76/Johto_Route_30_Map.png',
        },
        {
          location: 'Johto Route 31',
          map: 'https://cdn.bulbagarden.net/upload/2/2b/Johto_Route_31_Map.png',
        },
        {
          location: 'Ilex Forest',
          map: 'https://cdn.bulbagarden.net/upload/a/ae/Johto_Ilex_Forest_Map.png',
        },
        {
          location: 'Johto National Park',
          map: 'https://cdn.bulbagarden.net/upload/4/4e/Johto_National_Park_Map.png',
        },
      ],
      summary: 'For protection, it releases a horrible stench from the antennae on its head to drive away enemies.',
    },
  ];

  test('Teste de titulos da página', () => {
    const { getByText } = renderWithRouter(<Pokedex
      pokemons={pokemons}
      isPokemonFavoriteById={isPokemonFavoriteById}
    />);
    const pageTitle = getByText('Encountered pokémons');
    expect(pageTitle).toBeInTheDocument();
  });

  test('Cliques sucessivos no botão devem mostrar o próximo pokémon da lista', () => {
    const { getAllByRole, getByTestId } = renderWithRouter(<Pokedex
      pokemons={pokemons}
      isPokemonFavoriteById={isPokemonFavoriteById}
    />);
    const buttons = getAllByRole('button');
    const nextButton = buttons[buttons.length - 1];
    expect(nextButton).toBeInTheDocument();
    expect(nextButton.textContent).toBe('Próximo pokémon');
    let pokemonName = getByTestId('pokemon-name');
    expect(pokemonName.textContent).toBe('Pikachu');
    fireEvent.click(nextButton);
    pokemonName = getByTestId('pokemon-name');
    expect(pokemonName.textContent).toBe('Charmander');
    fireEvent.click(nextButton);
    pokemonName = getByTestId('pokemon-name');
    expect(pokemonName.textContent).toBe('Caterpie');
    fireEvent.click(nextButton);
    pokemonName = getByTestId('pokemon-name');
    expect(pokemonName.textContent).toBe('Pikachu');
  });

  test('A Pokédex deve exibir apenas um pokémon por vez', () => {
    const { getAllByTestId } = renderWithRouter(<Pokedex
      pokemons={pokemons}
      isPokemonFavoriteById={isPokemonFavoriteById}
    />);
    const countPokemons = getAllByTestId('pokemon-name');
    expect(countPokemons.length).toBe(1);
  });

  test('Testando os botões de filtros de acordo com seus nomes e testar se o botão de Próximo desabilita se tiver 1 pokémon filtrado', () => {
    const { getByTestId, getAllByRole, getAllByTestId } = renderWithRouter(<Pokedex
      pokemons={data}
      isPokemonFavoriteById={isPokemonFavoriteById}
    />);
    const buttonsFilter = getAllByTestId('pokemon-type-button');
    expect(buttonsFilter.length).toBe(7);
    const buttons = getAllByRole('button');
    const allButton = buttons[0];
    expect(allButton.textContent).toBe('All');

    const electricButton = buttons[1];
    expect(electricButton.textContent).toBe('Electric');
    const fireButton = buttons[2];
    expect(fireButton.textContent).toBe('Fire');
    const bugButton = buttons[3];
    expect(bugButton.textContent).toBe('Bug');
    const poisonButton = buttons[4];
    expect(poisonButton.textContent).toBe('Poison');
    const psychicButton = buttons[5];
    expect(psychicButton.textContent).toBe('Psychic');
    const normalButton = buttons[6];
    expect(normalButton.textContent).toBe('Normal');
    const dragonButton = buttons[7];
    expect(dragonButton.textContent).toBe('Dragon');
    const nextButton = buttons[8];
    expect(nextButton.textContent).toBe('Próximo pokémon');
    const pokemonType = getByTestId('pokemonType');
    fireEvent.click(electricButton);
    expect(pokemonType.textContent).toBe('Electric');
    expect(nextButton.disabled).toBe(true);
    fireEvent.click(fireButton);
    expect(pokemonType.textContent).toBe('Fire');
    fireEvent.click(nextButton);
    expect(pokemonType.textContent).toBe('Fire');
    fireEvent.click(bugButton);
    expect(pokemonType.textContent).toBe('Bug');
    expect(nextButton.disabled).toBe(true);
    fireEvent.click(poisonButton);
    expect(pokemonType.textContent).toBe('Poison');
    expect(nextButton.disabled).toBe(true);
    fireEvent.click(psychicButton);
    expect(pokemonType.textContent).toBe('Psychic');
    fireEvent.click(nextButton);
    expect(pokemonType.textContent).toBe('Psychic');
    fireEvent.click(normalButton);
    expect(pokemonType.textContent).toBe('Normal');
    expect(nextButton.disabled).toBe(true);
    fireEvent.click(dragonButton);
    expect(pokemonType.textContent).toBe('Dragon');
    expect(nextButton.disabled).toBe(true);

    fireEvent.click(allButton);
    expect(pokemonType.textContent).toBe('Electric');
    fireEvent.click(nextButton);
    expect(pokemonType.textContent).toBe('Fire');
    fireEvent.click(nextButton);
    expect(pokemonType.textContent).toBe('Bug');
  });

  test('Testando que a Pokédex vai gerar, dinamicamente, um botão de filtro para cada tipo de pokémon', () => {
    const { getAllByRole, queryByText } = renderWithRouter(<Pokedex
      pokemons={pokemons}
      isPokemonFavoriteById={isPokemonFavoriteById}
    />);
    const buttons = getAllByRole('button');
    expect(buttons.length).toBe(5);
    expect(buttons[0].textContent).toBe('All');
    expect(buttons[1].textContent).toBe('Electric');
    expect(buttons[2].textContent).toBe('Fire');
    expect(buttons[3].textContent).toBe('Bug');
    expect(buttons[4].textContent).toBe('Próximo pokémon');
    const buttonPoison = queryByText('Poison');
    expect(buttonPoison).toBe(null);
  });
});
