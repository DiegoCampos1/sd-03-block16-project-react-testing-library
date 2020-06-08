import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import data from '../data';

const pokemonTypes = [
  ...new Set(data.reduce((types, { type }) => [...types, type], [])),
];

function forEachPokemon(getByText) {
  data.forEach(({ name }) => {
    const nextPokemon = getByText('Próximo pokémon');
    expect(getByText(name)).toBeInTheDocument();
    fireEvent.click(nextPokemon);
  });
}

test('', () => {});