import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, getNodeText, fireEvent } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

afterEach(cleanup);

test('Testing if return a card with correct name of Pokémon', () => {
  const { getByTestId } = renderWithRouter(
    <Pokemon
      pokemon={pokemons[0]}
      isFavorite={false}
      showDetailsLink
    />);
  const pokeCardTitle = getByTestId('pokemon-name');
  const pokeName = getNodeText(pokeCardTitle);
  expect(pokeName).toBe(pokemons[0].name);
});

test('Testing if correct Pokemon Type is showing', () => {
  const { getByTestId } = renderWithRouter(
    <Pokemon
      pokemon={pokemons[0]}
      isFavorite={false}
      showDetailsLink
    />);
  const pokeTypeTitle = getByTestId('pokemonType');
  const pokeType = getNodeText(pokeTypeTitle);
  expect(pokeType).toBe(pokemons[0].type);
});

test('Testing if pokemon weigth is showing correctly with unit', () => {
  const { getByTestId } = renderWithRouter(
    <Pokemon
      pokemon={pokemons[0]}
      isFavorite={false}
      showDetailsLink
    />);
  const pokeWeigthTitle = getByTestId('pokemon-weight');
  const pokeWeigth = getNodeText(pokeWeigthTitle);
  const correctShowValue =
    `Average weight:${pokemons[0].averageWeight.value}${pokemons[0].averageWeight.measurementUnit}`;
  expect(pokeWeigth).toBe(correctShowValue);
});

test('Testing Pookemon Image', () => {
  const { getByTestId, getByRole } = renderWithRouter(
    <Pokemon
      pokemon={pokemons[0]}
      isFavorite={false}
      showDetailsLink
    />);
  const image = getByRole('img');
  const pokeCardTitle = getByTestId('pokemon-name');
  const pokeName = getNodeText(pokeCardTitle);
  const imageSrcData = pokemons[0].image;
  const imageAltData = `${pokeName} sprite`;
  expect(image.src).toBe(imageSrcData);
  expect(image.alt).toBe(imageAltData);
});

test('Test if Details Page is correct', () => {
  const { getByText } = renderWithRouter(
    <Pokemon
      pokemon={pokemons[0]}
      isFavorite={false}
      showDetailsLink
    />);
  const detailsLink = getByText('More details');
  const currectDetailsPage = `/pokemons/${pokemons[0].id}`;
  expect(detailsLink.href.includes(currectDetailsPage)).toBe(true);
});

test('Testing if Details link is working', () => {
  const { getByText, history } = renderWithRouter(
    <Pokemon
      pokemon={pokemons[0]}
      isFavorite={false}
      showDetailsLink
    />);
  const detailsLink = getByText('More details');
  fireEvent.click(detailsLink);
  const pathname = history.location.pathname;
  const currectDetailsPage = `/pokemons/${pokemons[0].id}`;
  expect(pathname).toBe(currectDetailsPage);
});

test('Testing if Favorites Pokemons shows a star icon', () => {
  const { getByTestId, getAllByRole } = renderWithRouter(
    <Pokemon
      pokemon={pokemons[0]}
      isFavorite
      showDetailsLink
    />);
  const pokeCardTitle = getByTestId('pokemon-name');
  const pokeName = getNodeText(pokeCardTitle);
  const imageArray = getAllByRole('img');
  const starIconAddress = '/star-icon.svg';
  const starIconAlt = `${pokeName} is marked as favorite`;
  expect(imageArray[1].src.includes(starIconAddress)).toBe(true);
  expect(imageArray[1].alt.includes(starIconAlt)).toBe(true);
});
