import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

describe('página deve conter um heading h2 com o texto Page', () => {
  test('mensagem', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={[{ pathname: '/hasuhaus' }]}>
        <App />
      </MemoryRouter>,
    );
    const notMensagem = getByText('Page requested not found');
    expect(notMensagem).toBeInTheDocument();
  });
  test('Imagem', () => {
    const { getByAltText } = render(
      <MemoryRouter initialEntries={[{ pathname: '/hasuhaus' }]}>
        <App />
      </MemoryRouter>,
    );
    const Imagem = getByAltText(/Pikachu crying because the page requested was not found/i);
    expect(Imagem.src).toMatch('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
