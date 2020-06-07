import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Test for the routes on the App component', () => {
  test('Shows the Pokedex in the "/" path', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Pokédex')).toBeInTheDocument();
  });

  test('Verify the navBar links and his paths', () => {
    const { getByText } = renderWithRouter(<App />);

    const home = getByText('Home');
    const about = getByText('About');
    const favorites = getByText('Favorite Pokémons');

    expect(home.href).toBe('http://localhost/');
    expect(about.href).toBe('http://localhost/about');
    expect(favorites.href).toBe('http://localhost/favorites');
  });

  test('Verify redirect to Home path', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const home = getByText('Home');

    fireEvent.click(home);
    expect(history.location.pathname).toBe('/');
    expect(getByText(/encountered pokémons/i)).toBeInTheDocument();
  });

  test('Verify redirect to About path', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const about = getByText('About');

    fireEvent.click(about);
    expect(history.location.pathname).toBe('/about');
    expect(getByText(/about pokédex/i)).toBeInTheDocument();
  });

  test('Verify redirect to Favorites path', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favorites = getByText('Favorite Pokémons');

    fireEvent.click(favorites);
    expect(history.location.pathname).toBe('/favorites');
    expect(getByText('Favorite pokémons')).toBeInTheDocument();
  });

  test('Verify redirect to Not Found page', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/not-found' });
    expect(getByText('Page requested not found')).toBeInTheDocument();
  });
});
