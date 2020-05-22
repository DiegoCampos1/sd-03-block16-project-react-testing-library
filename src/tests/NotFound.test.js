import React from 'react';
import renderWithRouter from './renderWithRouter';
import { NotFound } from '../components';

test('Page container h2', () => {
  const { getByText } = renderWithRouter(<NotFound />);
  const getTitleH2 = getByText(/Page requested not found/i);
  expect(getTitleH2).toBeInTheDocument();
});

test('Img in page', () => {
  const { getByAltText } = renderWithRouter(<NotFound />);
  const img = getByAltText('Pikachu crying because the page requested was not found');
  expect(img).toBeInTheDocument();
  expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
