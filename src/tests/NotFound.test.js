import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('tests NotFound.js', () => {
  test('shows Not Found page text', () => {
    const { getByText } = renderWithRouter(<NotFound />, { route: '/not-found' });

    const notFound = getByText('Page requested not found');

    expect(notFound).toBeInTheDocument();
    expect(notFound.tagName).toBe('H2');
  });

  test('shows Not Found page img', () => {
    const { container } = renderWithRouter(<NotFound />, { route: '/not-found' });

    const img = container.querySelector('IMG');

    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
