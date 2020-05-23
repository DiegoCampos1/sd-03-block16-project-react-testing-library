import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('tests App.js', () => {
  test('shows the Pokédex when the route is `/`', () => {
    const { getByText } = renderWithRouter(<App />);

    expect(getByText('Pokédex')).toBeInTheDocument();
  });

  test('verify if nav bar links', () => {
    const { getByText } = renderWithRouter(<App />);

    const home = getByText('Home');
    const about = getByText('About');
    const favorites = getByText('Favorite Pokémons');

    expect(home.href).toBe('http://localhost/');
    expect(about.href).toBe('http://localhost/about');
    expect(favorites.href).toBe('http://localhost/favorites');

    fireEvent.click(getByText('More details'));

    expect(home.href).toBe('http://localhost/');
    expect(about.href).toBe('http://localhost/about');
    expect(favorites.href).toBe('http://localhost/favorites');
  });

  test('redirect to `/` when click in the link Home', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const home = getByText('Home');

    fireEvent.click(home);

    expect(history.location.pathname).toBe('/');

    fireEvent.click(getByText('More details'));
    fireEvent.click(home);

    expect(history.location.pathname).toBe('/');
    expect(getByText('Pokédex')).toBeInTheDocument();
  });

  test('redirect to `/about` when click in the link About', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const about = getByText('About');

    fireEvent.click(about);

    expect(history.location.pathname).toBe('/about');
    expect(getByText('About Pokédex')).toBeInTheDocument();
  });

  test('redirect to `/favorites` when click in the link Favorites Pokémons', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const favorites = getByText('Favorite Pokémons');

    fireEvent.click(favorites);

    expect(history.location.pathname).toBe('/favorites');
    expect(getByText('Favorite pokémons')).toBeInTheDocument();
  });

  test('redirect to Not Found page', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/not-found' });

    expect(getByText('Page requested not found')).toBeInTheDocument();
  });
});
