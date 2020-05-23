import React from 'react';
import renderRouter from '/RenderRouter';
import NotFound from '../components/NotFound';

describe('NotFound.js testing', () => {
  test('Finding h2 heading', () => {
    const { getByText } = renderRouter(<NotFound />, { route: '/not-found' });
    const notFound = getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
    expect(notFound.tagName).toBe('H2'); // Using tagname
  });

  test('NotFound image', () => {
    const { container } = renderRouter(<NotFound />, { route: '/not-found' });
    const img = container.querySelector('IMG');
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
