import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, getNodeText } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

afterEach(cleanup);

test('Testing if header with message `Page requested not found 😭` is render', () => {
  const { getByRole, getAllByRole } = renderWithRouter(<NotFound />);
  const header = getByRole('heading');
  const face = getAllByRole('img');
  const nfText = getNodeText(header);
  const faceText = getNodeText(face[0]);
  expect(nfText).toBe('Page requested not found');
  expect(faceText).toBe(' 😭 ');
});

test('Test if image path is `https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`', () => {
  const { getAllByRole } = renderWithRouter(<NotFound />);
  const image = getAllByRole('img');
  const imgPath = image[1].src;
  expect(imgPath).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
