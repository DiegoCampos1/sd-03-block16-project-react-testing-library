import React from 'react';
import { render, cleanup } from '@testing-library/react';
import NotFound from '../components/NotFound';

afterEach(cleanup);

test('testing whether there is a heading Page not found', () => {
  const { getByText } = render(<NotFound />);
  const text = getByText('Page requested not found');
  expect(text).toBeInTheDocument();
  expect(text.tagName).toBe('H2');
});

test('testing wether not found pages shows image', () => {
  const { getAllByRole } = render(<NotFound />);
  const img = getAllByRole('img');
  expect(img.length).toBe(2);
  expect(img[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
