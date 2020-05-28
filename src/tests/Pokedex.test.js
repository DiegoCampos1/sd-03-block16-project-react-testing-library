import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requisito 5', () => {
  test('Botão de próximo Pokemon', () => {
    const { getByText } = renderWithRouter(<App />);
    const btn = getByText('Próximo pokémon');
    expect(btn).toBeInTheDocument();

    fireEvent.click(btn);

    const nextPokemon = getByText('Charmander');
    expect(nextPokemon).toBeInTheDocument();

    fireEvent.click(btn);
    expect(getByText('Caterpie')).toBeInTheDocument();
  });

  test('Pokedex deve conter botão para resetar filtro', () => {
    const { getByText } = renderWithRouter(<App />);
    const btnAll = getByText('All');
    expect(btnAll).toBeInTheDocument();
    fireEvent.click(btnAll);

    expect(getByText('Pikachu')).toBeInTheDocument();
  });
});
