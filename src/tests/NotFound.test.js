import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('NotFound page tests', () => {
  test('Verify not found message in the page', () => {
    const { getByText } = renderWithRouter(<NotFound />, { route: '/not-found-test' });
    const notFoundMessage = 'Page requested not found';

    expect(getByText(notFoundMessage)).toBeInTheDocument();
  });

  test('Verify not found message in the page', () => {
    const { container } = renderWithRouter(<NotFound />, { route: '/not-found-test' });
    const img = container.querySelector('IMG');
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(img.src).toBe(url);
  });
});
