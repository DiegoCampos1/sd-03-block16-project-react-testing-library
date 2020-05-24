import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';


test('Testes do arquivo NotFound.js', () => {
  const { getByText, getByAltText, history } = renderWithRouter(<NotFound />);
  history.push('/paginaqualquer');
  const msgNotFound = getByText('Page requested not found');
  expect(msgNotFound).toBeInTheDocument();
  const imgNotFound = getByAltText('Pikachu crying because the page requested was not found');
  expect(imgNotFound).toBeInTheDocument();
  expect(imgNotFound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
