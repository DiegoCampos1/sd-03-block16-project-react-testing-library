import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

afterEach(cleanup);

describe('test file NotFound.js', () => {
  test('Contain "No favorite pokémon found" text if there isn`t favorited pokémon', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/page/that-doesnt-exist/');
    const heading = getByText('Page requested not found');
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
  });

  test('Contain `not found` gif', () => {
    const { getByAltText, history } = renderWithRouter(<App />);
    history.push('/page/that-doesnt-exist/');
    const img = getByAltText(/Pikachu crying/i);
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
