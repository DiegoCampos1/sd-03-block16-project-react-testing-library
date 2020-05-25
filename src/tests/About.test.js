import React from 'react';
import { Router } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';

afterEach(cleanup);

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    // 1
    history,
  };
}

describe('No topo da aplicação, deve haver um conjunto fixo de links de navegação', () => {
  it('A página "About" deve exibir informações sobre a Pokédex', () => {
    const { getByText, getByAltText } = renderWithRouter(<App />, { route: '/About' });
    const about = getByText(/About Pokédex/i);
    expect(about).toBeInTheDocument();
    const info = getByText(/This application simulates a Pokédex, a digital encliclopedia containing all Pokémons/i);
    expect(info).toBeInTheDocument();
    const secondInfo = getByText(/One can filter Pokémons by type, and see more details for each one of them/i);
    expect(secondInfo).toBeInTheDocument();

    const img = getByAltText(/Pokédex/i);
    const imgSrc = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(img.src).toEqual(imgSrc);
  });
});
