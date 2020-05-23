import React from 'react';
import { render } from '@testing-library/react';
import { NotFound } from '../components';

describe('4. Testes do arquivo NotFound', () => {
  test('4.1 - A página deve conter um heading h2 com o texto Page requested not found 😭', () => {
    const { getByRole } = render(<NotFound />);
    const agadois = getByRole('heading');
    expect(agadois).toHaveTextContent('Page requested not found 😭');
  });

  test('4.2 - A página deve exibir a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { getByAltText } = render(<NotFound />);
    const ibagem = getByAltText('Pikachu crying because the page requested was not found');
    expect(ibagem.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
