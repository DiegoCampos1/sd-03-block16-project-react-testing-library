import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Pokedex from '../components/Pokedex';

describe('Pokedex', () => {
  afterEach(cleanup);

  test('Button of next Pokémon', () => {
    const { getByText } = render(<Pokedex />);
    const button = getByText('Próximo Pokémon');

    expect(button).toBeInTheDocument();
  });
});
