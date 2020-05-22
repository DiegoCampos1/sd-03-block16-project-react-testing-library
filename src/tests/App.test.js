import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

// jest.mock('react-router-dom', () => {
//   const originalModule = jest.requireActual('react-router-dom');
//   return ({
//     ...originalModule,
//     BrowserRouter: (props) => (<div>{props.children}</div>),
//   });
// });

describe('Test link from pages', () => {
  test('Test links navegating home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const homeLink = getByText('Home');
    expect(homeLink).toBeInTheDocument();
    fireEvent.click(homeLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  // test('Test links navegating About', () => {
  //   const { history } = renderWithRouter(<App />, { About });
  //   const { location: { pathname } } = history;
  //   expect(pathname).toBe('/About');
  // });

  test('Test links navegating About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const AboutLink = getByText('About');
    expect(AboutLink).toBeInTheDocument();
    fireEvent.click(AboutLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  test('Test links navegating About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favoritesLink = getByText('Favorite Pokémons');
    expect(favoritesLink).toBeInTheDocument();
    fireEvent.click(favoritesLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });

  test('Click in Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const clickInHome = getByText('Home');
    fireEvent.click(clickInHome);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  test('Click in About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const clickInAbout = getByText('About');
    fireEvent.click(clickInAbout);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  test('Click in Favorite Pokémons', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const clickInFavorite = getByText('Favorite Pokémons');
    fireEvent.click(clickInFavorite);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });

  test('Url not found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    // const { location: { pathname }} = history;
    history.push('/pagina-not-found/');
    // fireEvent.click(pathname);
    const noMatch = getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
