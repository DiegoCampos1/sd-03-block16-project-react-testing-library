import React from 'react';
import { fireEvent, getAllByTestId } from '@testing-library/react';

import MemoryHistory from './MemoryHistory';
import Pokedex from '../components/Pokedex';


describe('Testando a pokedex', () => {
  it('Testando o botão de próximo', () => {
    const {getAllByTestId, getByText } = MemoryHistory(<Pokedex />);
    const prox = getByText('Próximo pokemon');
    const type = getAllByTestId('pokemon-type-button');
    const encontrado = getByText('Encountered pokémons');
    const all = getByText('All');
    expect(prox).toBeInTheDocument();
    expect(type[0]).toBeInTheDocument();
    expect(encontrado).toBeInTheDocument();
    expect(all).toBeInTheDocument();
  });
});