import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

test('Heading h2 com texto', () => {
  const { getByText } = renderWithRouter(<NotFound />);

  const heading = getByText('Page requested not found');
  expect(heading).toBeInTheDocument();
});

test('A pagina deve exibir uma imagem específica', () => {
  const { getByAltText } = renderWithRouter(<NotFound />);

  const image = getByAltText('Pikachu crying because the page requested was not found');
  expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
