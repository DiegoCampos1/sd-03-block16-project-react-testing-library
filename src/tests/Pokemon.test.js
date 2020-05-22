import React from 'react';
import { MemoryRouter, useHistory } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

test('pokecard', () => {
  const { container } = render(
    <MemoryRouter >
      <App />
    </MemoryRouter>,
  );

  const getCard = container.querySelector('.pokemon');
  expect(getCard).toBeInTheDocument();
});

test('pikachu', () => {
  const { getByText } = render(
    <MemoryRouter >
      <App />
    </MemoryRouter>,
  );
  expect(getByText('Pikachu')).toBeInTheDocument();
});

test('weight', () => {
  const { getByText } = render(
    <MemoryRouter >
      <App />
    </MemoryRouter>,
  );
  expect(getByText('Average weight:6.0kg')).toBeInTheDocument();
});

test('image pikachu', () => {
  const { container } = render(
    <MemoryRouter >
      <App />
    </MemoryRouter>,
  );
  const imgPokemon = container.querySelector('img');
  expect(imgPokemon.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(imgPokemon.alt).toBe('Pikachu sprite');
});

test('details', () => {
  const { getByText, container } = render(
    <MemoryRouter >
      <App />
    </MemoryRouter>,
  );
  const getLink = container.querySelector('Link');
  const MoreDetails = getByText('More details');
  fireEvent.click(MoreDetails);
  const saveLocation = useHistory();
  expect(saveLocation.location.pathname).toBe('/pokemons/25');
  expect(getLink).toBe('/pokemons/25');
});
