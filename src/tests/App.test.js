import React from 'react';
import {
  cleanup, fireEvent,
} from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';

afterEach(cleanup);

describe('test 1 - shows pokedex in main page', () => {
  it('1.1 - renders a heading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('1.2 - shows the Pokedéx when the route is `/`', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(
      getByText('Encountered pokémons'),
    ).toBeInTheDocument();
  });
});

describe('Test 2 - nav bar always display some links', () => {
  it('2.1 - <home> URL </> <about> URL </about> favorite pokémons </favorites> ', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText('Home');
    const about = getByText('About');
    const favorites = getByText('Favorite Pokémons');
    expect(home.href).toBe('http://localhost/');
    expect(about.href).toBe('http://localhost/about');
    expect(favorites.href).toBe('http://localhost/favorites');
    fireEvent.click(getByText(/more details/i));
    expect(home.href).toBe('http://localhost/');
    expect(about.href).toBe('http://localhost/about');
    expect(favorites.href).toBe('http://localhost/favorites');
  });
});

describe('Test 3 - click should redirect', () => {
  it('3.0 - home directs to /', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const homeButton = getByText('Home');
    fireEvent.click(homeButton);
    expect(history.location.pathname).toBe('/');
    fireEvent.click(getByText(/more details/i));
    fireEvent.click(homeButton);
    expect(history.location.pathname).toBe('/');
  });
  it('3.1 - about directs to /about', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const aboutButton = getByText('About');
    fireEvent.click(aboutButton);
    expect(history.location.pathname).toBe('/about');
  });
  it('3.2 - favorites directs to /favorites', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favButton = getByText('Favorite Pokémons');
    fireEvent.click(favButton);
    expect(history.location.pathname).toBe('/favorites');
  });
});
