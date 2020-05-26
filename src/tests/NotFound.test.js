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
    const notFoundMessage = getByText('Page requested not found');
    expect(notFoundMessage).toBeInTheDocument();
  });
  test('Imagem', () => {
    const { getByAltText } = render(
      <MemoryRouter initialEntries={[{ pathname: '/hasuhaus' }]}>
        <App />
      </MemoryRouter>,
    );
    const image = getByAltText(/Pikachu crying because the page requested was not found/i);
    expect(image.src).toMatch('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
