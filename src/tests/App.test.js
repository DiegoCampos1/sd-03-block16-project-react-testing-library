import React from 'react';
import { cleanup, screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './testRenderService';
import App from '../App';


describe('Testing App file', () => {
  afterEach(cleanup);

  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);

    const Pokédex = getByText('Pokédex');
    expect(Pokédex).toBeInTheDocument();
  });

  test('render links header', () => {
    renderWithRouter(<App />);

    const links = screen.getByText('Home', 'About', 'Favorite Pokémons');
    expect(links).toBeInTheDocument();
  });

  test('equal url home', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/' });
    const home = getByText('Home');

    fireEvent.click(home);
    getByText('Encountered pokémons');
  });

  test('equal url about', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/about' });
    const about = getByText('About');

    fireEvent.click(about);
    getByText('About Pokédex');
  });

  test('equal url favorites', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/favorites' });
    const about = getByText('Favorite Pokémons');

    fireEvent.click(about);
    getByText('Favorite pokémons');
  });

  test('pag not found', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/nonexistent' });

    getByText('Page requested not found');
  });
});
