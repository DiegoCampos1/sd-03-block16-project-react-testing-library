import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { cleanup, render } from '@testing-library/react';
import App from '../App';

describe('App tests', () => {
  afterEach(cleanup);

  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('shows the Pokédex when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    const Encountered = getByText('Encountered pokémons');
    const Home = getByText('Home');
    const About = getByText('About');
    const Favorite = getByText('Favorite Pokémons');

    expect(Encountered).toBeInTheDocument();
    expect(Home).toBeInTheDocument();
    expect(About).toBeInTheDocument();
    expect(Favorite).toBeInTheDocument();
  });
});
