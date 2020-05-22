import React from 'react';
import { MemoryRouter, useHistory } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import PokemonS from '../components/Pokemon';
import data from '../data';

describe('requisito 6', () => {
  test('6.1', () => {
    const verdade = true;
    const favoriteFalse = false;
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <PokemonS pokemon={data[0]} showDetailsLink={verdade} isFavorite={favoriteFalse} />
      </MemoryRouter>,
    );

    const getCard = container.querySelector('.pokemon');
    expect(getCard).toBeInTheDocument();
  });

  test('6.2', () => {
    const verdade = true;
    const favoriteFalse = false;
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <PokemonS pokemon={data[0]} showDetailsLink={verdade} isFavorite={favoriteFalse} />
      </MemoryRouter>,
    );

    const correctName = getByText('Pikachu');
    expect(correctName).toBeInTheDocument();
  });

  test('6.3', () => {
    const verdade = true;
    const favoriteFalse = false;
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <PokemonS pokemon={data[0]} showDetailsLink={verdade} isFavorite={favoriteFalse} />
      </MemoryRouter>,
    );

    const peso = getByText('Average weight:6.0kg');
    expect(peso).toBeInTheDocument();
  });

  test('6.4', () => {
    const verdade = true;
    const favoriteFalse = false;
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <PokemonS pokemon={data[0]} showDetailsLink={verdade} isFavorite={favoriteFalse} />
      </MemoryRouter>,
    );

    const imgPokemon = container.querySelector('img');
    expect(imgPokemon.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(imgPokemon.alt).toBe('Pikachu sprite');
  });

  test('6.5-6', () => {
    const verdade = true;
    const favoriteFalse = false;
    const { getByText, container } = render(
      <MemoryRouter initialEntries={['/']}>
        <PokemonS pokemon={data[0]} showDetailsLink={verdade} isFavorite={favoriteFalse} />
      </MemoryRouter>,
    );

    const getLink = container.querySelector('Link');
    const MorDetails = getByText('More details');
    fireEvent.click(MorDetails);
    const saveLocation = useHistory();
    expect(saveLocation.location.pathname).toBe('/pokemons/25');
    expect(getLink).toBe('/pokemons/25');
  });
});
