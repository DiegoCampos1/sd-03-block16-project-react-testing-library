import React from 'react';
import renderWithRouter from './MemoryHistory';
import NotFound from '../components/NotFound';

describe('Test NotFound.js', () => {
  test('Finding h2 heading', () => {
    const { getByText } = renderWithRouter(<NotFound />, { route: '/not-found' });
    const notFound = getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
    expect(notFound.tagName).toBe('H2');
  });

  test('NotFound image', () => {
    const { container } = renderWithRouter(<NotFound />, { route: '/not-found' });
    const img = container.querySelector('IMG');
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
