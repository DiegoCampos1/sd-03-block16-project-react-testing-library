import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../historyRouter';
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

  test('home exists > to path /', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const homeText = getByText(/home/i); // Unterminated regular expression
    expect(homeText).toBeInTheDocument();
    fireEvent.click(homeText);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  test('about exists > to path /about', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const aboutText = getByText(/About/i);
    expect(aboutText).toBeInTheDocument();
    fireEvent.click(aboutText);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  test('Favorite Pokémons exists > to path /favorites', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favoriteLinkText = getByText(/Favorite Pokémons/i);
    expect(favoriteLinkText).toBeInTheDocument();
    fireEvent.click(favoriteLinkText);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });
});
