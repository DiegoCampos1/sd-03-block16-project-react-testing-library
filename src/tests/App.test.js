import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import MemoryHistory from './MemoryHistory';
import App from '../App';

afterEach(cleanup);

describe('file App.js', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('home exists and redirect to path /', () => {
    const { getByText, history } = MemoryHistory(<App />);
    const linkToHome = getByText(/home/i); // Unterminated regular expression
    expect(linkToHome).toBeInTheDocument();
    fireEvent.click(linkToHome);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  test('about exists and redirect to path /about', () => {
    const { getByText, history } = MemoryHistory(<App />);
    const linkToAbout = getByText(/About/i);
    expect(linkToAbout).toBeInTheDocument();
    fireEvent.click(linkToAbout);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  test('Favorite Pokémons exists and redirect to path /favorites', () => {
    const { getByText, history } = MemoryHistory(<App />);
    const linkToFavorite = getByText(/Favorite Pokémons/i);
    expect(linkToFavorite).toBeInTheDocument();
    fireEvent.click(linkToFavorite);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });
});
