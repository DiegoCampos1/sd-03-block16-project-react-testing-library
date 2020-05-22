import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import Pokedexx from '../components/Pokedex';
import data from '../data';

describe('requisito 5', () => {
  test('5.1', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Pokedexx pokemons={data} isPokemonFavoriteById={{}} />
      </MemoryRouter>,
    );

    const nextPokemon = getByText('Próximo pokémon');
    expect(nextPokemon).toBeInTheDocument();
    fireEvent.click(nextPokemon);
    expect(getByText('Charmander')).toBeInTheDocument();
  });

  test('5.2', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Pokedexx pokemons={data} isPokemonFavoriteById={{}} />
      </MemoryRouter>,
    );
    const pegaID = container.querySelectorAll('.pokemon');
    expect(pegaID.length).toBe(1);
  });

  test('5.3', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Pokedexx pokemons={data} isPokemonFavoriteById={{}} />
      </MemoryRouter>,
    );
    const pegaPychic = getByText('Psychic');
    expect(pegaPychic).toBeInTheDocument();
    fireEvent.click(pegaPychic);
    expect(getByText('Alakazam')).toBeInTheDocument();
  });

  test('5.4', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Pokedexx pokemons={data} isPokemonFavoriteById={{}} />
      </MemoryRouter>,
    );
    const pegaButton = getByText('All');
    expect(pegaButton).toBeInTheDocument();
    fireEvent.click(pegaButton);
  });

  test('5.5', () => {
    const { getAllByTestId, getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Pokedexx pokemons={data} isPokemonFavoriteById={{}} />
      </MemoryRouter>,
    );
    const getClass = getAllByTestId('pokemon-type-button');
    const getAll = getByText('All');
    const Encontered = getByText('Encountered pokémons');

    expect(getClass.length).toBe(7);
    expect(getAll).toBeInTheDocument();
    expect(Encontered).toBeInTheDocument();
  });

  test('5.6', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Pokedexx pokemons={data} isPokemonFavoriteById={{}} />
      </MemoryRouter>,
    );
    const Poison = getByText('Poison');
    fireEvent.click(Poison);
    const nextPokemon = getByText('Próximo pokémon');
    expect(nextPokemon).toHaveAttribute('disabled');
  });
});
