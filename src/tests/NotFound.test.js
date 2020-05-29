import React from 'react';
import MemoryHistory from './MemoryHistory';
import NotFound from '../components/NotFound';

describe('Testando o NotFound', () => {
  it('Testando o texto', () => {
    const { getByText } = MemoryHistory(<NotFound />);
    const notFoundText = getByText('Page requested not found');
    expect(notFoundText).toBeInTheDocument();
  });

  it('Testando a imagem', () => {
    const { getByAltText } = MemoryHistory(<NotFound />);
    const foto = getByAltText('Pikachu crying because the page requested was not found');
    expect(foto).toBeInTheDocument();
    expect(foto.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
