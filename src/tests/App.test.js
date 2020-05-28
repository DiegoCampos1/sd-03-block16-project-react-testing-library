import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Tests "App.js" file...', () => {
  test('Tests if it shows the "Pokédex" page when the route is `/`...w', () => {
    const { getByText } = renderWithRouter(<App />);
    const pokédex = getByText('Pokédex');

    expect(pokédex).toBeInTheDocument();
  });

  test('Tests if all nav bar links are assigned correctly to its specific href...', () => {
    const { getByText } = renderWithRouter(<App />);

    const home = getByText('Home');
    const about = getByText('About');
    const favorites = getByText('Favorite Pokémons');

    expect(home.href).toBe('http://localhost/');
    expect(about.href).toBe('http://localhost/about');
    expect(favorites.href).toBe('http://localhost/favorites');
  });

  test('Tests whether, when clicked in the "Home" link, it redirects to "/" url...', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const home = getByText('Home');

    fireEvent.click(home);
    expect(history.location.pathname).toBe('/');
  });

  test('Tests whether, when clicked in the "About" link, it redirects to "/about" url...', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const about = getByText('About');

    fireEvent.click(about);
    expect(history.location.pathname).toBe('/about');
  });

  test('Tests whether, when clicked in the "Favorites Pokémons" link, redirects to "/favorites" url...', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favorites = getByText('Favorite Pokémons');

    fireEvent.click(favorites);
    expect(history.location.pathname).toBe('/favorites');
    expect(favorites).toBeInTheDocument();
  });

  test('Tests whether it redirects to "Not Found" page when a unknown url is given...', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/not-found' });

    expect(getByText('Page requested not found')).toBeInTheDocument();
  });
});
