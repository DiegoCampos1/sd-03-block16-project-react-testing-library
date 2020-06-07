import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

describe('when no refered adress should render an h2 and an image', () => {
  test('message', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={[{ pathname: '/xablau' }]}>
        <App />
      </MemoryRouter>,
    );
    const notFoundMessage = getByText('Page requested not found');
    expect(notFoundMessage).toBeInTheDocument();
  });
  test('should have pikachu image', () => {
    const { getByAltText } = render(
      <MemoryRouter initialEntries={[{ pathname: '/xablau' }]}>
        <App />
      </MemoryRouter>,
    );
    const image = getByAltText(/Pikachu crying because the page requested was not found/i);
    expect(image.src).toMatch('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
