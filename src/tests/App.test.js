import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import {
  render, cleanup, fireEvent, waitForDomChange,
} from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';
import { Pokedex, FavoritePokemons } from '../components';
import pokemons from '../mockPokemons';
import { firstLocations, nextLocations } from '../mockLocations';
import { generations, generation1 } from '../mockGenerations';

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

describe('Test 17 - nav bar always display some links', () => {
  it('17.1 - <home> URL </> <about> URL </about> favorite pokémons </favorites> ', () => {
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

describe('Test 18, 19, 20 - click should redirect', () => {
  it('18 - home directs to /', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const homeButton = getByText('Home');
    fireEvent.click(homeButton);
    expect(history.location.pathname).toBe('/');
    fireEvent.click(getByText(/more details/i));
    fireEvent.click(homeButton);
    expect(history.location.pathname).toBe('/');
  });
  it('19 - about directs to /about', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const aboutButton = getByText('About');
    fireEvent.click(aboutButton);
    expect(history.location.pathname).toBe('/about');
  });
  it('20 - favorites directs to /favorites', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favButton = getByText('Favorite Pokémons');
    fireEvent.click(favButton);
    expect(history.location.pathname).toBe('/favorites');
  });
});

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