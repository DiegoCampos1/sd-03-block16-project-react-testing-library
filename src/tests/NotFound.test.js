import React from 'react';
import {
  cleanup,
} from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';

afterEach(cleanup);

describe('Test 23 - unknown path display error 404', () => {
  it('23.1 - notFound page must have <Page requested not found> in <h2>', () => {
    const { queryByText } = renderWithRouter(<App />, { route: '/inexistent' });
    expect(queryByText(/page requested not found/i)).toBeInTheDocument();
    expect(queryByText(/page requested not found/i).tagName).toBe('H2');
  });
  it('23.2 - must display image', () => {
    const { getByAltText } = renderWithRouter(<App />, { route: '/messedup' });
    const img = getByAltText(/Pikachu crying because the page requested was not found/i);
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
