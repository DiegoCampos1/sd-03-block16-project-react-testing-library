import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Tests "NotFound.js" file...', () => {
  test('Tests if it shows a "Not Found" text...', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const notFound = getByText('Page requested not found');

    expect(notFound).toBeInTheDocument();
    expect(notFound.tagName).toBe('H2');
  });

  test('Tests if it shows the default "Not Found" page image...', () => {
    renderWithRouter(<NotFound />);
    const img = document.querySelector('IMG');

    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
