import React from 'react';
import MemoryHistory from './MemoryHistory';
import About from '../components/About';

describe('Testando o About', () => {
  it('Testando o texto e imagem', () => {
    const { getByText, getByAltText } = MemoryHistory(<About />);
    const sobre = getByText('About Pokédex');
    expect(sobre).toBeInTheDocument();
    const imagem = getByAltText('Pokédex');
    expect(imagem.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
