import React from 'react';
import MemoryHistory from './MemoryHistory';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testando FavoritePokemons', () => {
  it('Testando texto com nenhum favorito', () => {
    const { getByText } = MemoryHistory(<FavoritePokemons />);
    const texto = getByText('No favorite pokemon found');
    expect(texto).toBeInTheDocument();
  });
});
