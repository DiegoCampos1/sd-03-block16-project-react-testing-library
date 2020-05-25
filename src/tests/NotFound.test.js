import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import NotFound from '../components/NotFound';

afterEach(cleanup);

test('testing when a url does not match', () => {
  const { getByText, getByRole, getByAltText } = renderWithRouter(<NotFound />);

  const h2Exists = getByRole('heading');
  expect(h2Exists).toBeInTheDocument();
  expect(h2Exists.tagName).toBe('H2');

  const notFoundPhrase = getByText('Page requested not found');
  expect(notFoundPhrase).toBeInTheDocument();

  const img = getByAltText('Pikachu crying because the page requested was not found');
  expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
