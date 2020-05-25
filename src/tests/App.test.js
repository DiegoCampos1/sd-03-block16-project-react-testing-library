import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('App.js tests', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('renders nav bar links with correct href', () => {
    const { getByText } = renderWithRouter(<App />);

    const home = getByText(/Home/i);
    expect(home).toBeInTheDocument();
    expect(home.href).toBe('http://localhost/');

    const about = getByText(/About/i);
    expect(about).toBeInTheDocument();
    expect(about.href).toBe('http://localhost/about');

    const fav = getByText(/Favorite Pokémons/i);
    expect(fav).toBeInTheDocument();
    expect(fav.href).toBe('http://localhost/favorites');
  });

  test('Home link redirects properly', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const home = getByText(/Home/i);
    fireEvent.click(home);
    expect(history.location.pathname).toBe('/');
  });

  test('About link redirects properly', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const about = getByText(/About/i);
    fireEvent.click(about);
    expect(history.location.pathname).toBe('/about');
  });

  test('Favorite link redirects properly', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const favorite = getByText(/Favorite Pokémons/i);
    fireEvent.click(favorite);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Uknown URL redirects to Not Found page', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/xablau' });

    expect(getByText(/not found/i)).toBeInTheDocument();
  });
});
