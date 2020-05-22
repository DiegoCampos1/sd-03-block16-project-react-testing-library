import React from 'react';
import { Router } from 'react-router-dom';
import { render, getByText, cleanup } from '@testing-library/react';
import { createMemoryHistory } from "history";
import About from '../components/About';
import { getByLabelText } from '@testing-library/react';
import { getByRole } from '@testing-library/react';
import { getAllByRole } from '@testing-library/react';

describe ('Testes no arquivo About.js', () => {
  afterEach(cleanup);

  const { getByText } = render(<About />)

  test('A página "About" deve exibir informações sobre a Pokédex', () => {
    const pokeInfo = getByText(/digital encliclopedia containing all Pokémons/i);
    expect(pokeInfo).toBeInTheDocument();
  });

  test('A página deve conter um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = render(<About />)
    const header = getByRole('heading');
    expect(header).toHaveTextContent(/About Pokédex/i);
  });

  test('A página deve conter dois parágrafos com texto sobre a Pokédex', () => {
    const { getAllByRole } = render(<About />)
    const paragraphs = getAllByRole('region');
    expect((paragraphs).length).toBe(2);
  });

  test('A página deve conter a seguinte imagem de uma Pokédex: https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
    const { getByRole } = render(<About />)
    const pic = getByRole('img');
    expect((pic).src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });

})