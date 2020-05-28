import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, getNodeText } from '@testing-library/react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

afterEach(cleanup);

test('Test if is a detail page of a pokemon is showing', () => {
  const { getByText, getByTestId, history } = renderWithRouter(<App />);
  const pokeNameTitle = getByTestId('pokemon-name');
  const pokeName = getNodeText(pokeNameTitle);

  const detailsLink = getByText('More details');
  const destinationPage = detailsLink.href;
  fireEvent.click(detailsLink);
  const pathName = history.location.pathname;
  expect(destinationPage.includes(pathName)).toBe(true);

  const detailsPokeNameTitle = getByTestId('pokemon-name');
  const detailsPokeName = getNodeText(detailsPokeNameTitle);
  expect(pokeName).toBe(detailsPokeName);
});

test('Testing if details page contains `pokemon name` Details text', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);
  const pokeNameTitle = getByTestId('pokemon-name');
  const pokeName = getNodeText(pokeNameTitle);
  const detailsLink = getByText('More details');
  fireEvent.click(detailsLink);
  const pokeNameDetailsText = getByText(`${pokeName} Details`);
  expect(pokeNameDetailsText).toBeInTheDocument();
});

test('Details page must have not details link', () => {
  const { queryByText, getByText } = renderWithRouter(<App />);
  const detailsLink = getByText('More details');
  fireEvent.click(detailsLink);
  const newDetailsLink = queryByText('More details');
  expect(newDetailsLink).toBe(null);
});

test('Details Section muste have a heading text `Summary`', () => {
  const { getByText } = renderWithRouter(<App />);
  const detailsLink = getByText('More details');
  fireEvent.click(detailsLink);
  const summaryTitle = getByText('Summary');
  expect(summaryTitle.tagName).toBe('H2');
});

test('Test if Details page have a description paragraph of a selected pokemon', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);
  const detailsLink = getByText('More details');
  fireEvent.click(detailsLink);
  const pokeNameTitle = getByTestId('pokemon-name');
  const pokeName = getNodeText(pokeNameTitle);
  const summaryTitle = getByText('Summary');
  const sibling = summaryTitle.nextElementSibling;
  expect(sibling.tagName).toBe('P');

  const selectedPokemon = pokemons.find((e) => e.name === pokeName);
  expect(selectedPokemon.summary).toBe(sibling.innerHTML);
});

test('Details page must have a map with the location of pokemon', () => {
  const { getByText, getByTestId, getAllByRole } = renderWithRouter(<App />);
  const detailsLink = getByText('More details');
  fireEvent.click(detailsLink);
  const pokeNameTitle = getByTestId('pokemon-name');
  const pokeName = getNodeText(pokeNameTitle);
  const gameLocationByName = getByText(`Game Locations of ${pokeName}`);
  expect(gameLocationByName.tagName).toBe('H2');

  const selectedPokemon = pokemons.find((e) => e.name === pokeName);
  const images = getAllByRole('img');
  const imagesUrl = images.map((e) => e.src);
  const pokeLocationImagesUrl = selectedPokemon.foundAt.map((e) => e.map);
  pokeLocationImagesUrl.map((e) =>
    expect(imagesUrl.includes(e)).toBe(true),
  );

  const imagesAlt = images.map((e) => e.alt);
  const imageAltPokeLocation = imagesAlt.filter((e) => e === `${pokeName} location`);

  const pokeLocationsName = selectedPokemon.foundAt.map((e) => e.location);
  pokeLocationsName.map((e) => {
    const locationNameElement = getByText(e);
    expect(locationNameElement).toBeInTheDocument();
    return ('ok');
  });

  expect(imageAltPokeLocation.length).toBe(pokeLocationImagesUrl.length);
});

test('Test if Details page can favorite a Pokemon', () => {
  const { getByText, getAllByRole, getByLabelText } = renderWithRouter(<App />);
  const detailsLink = getByText('More details');
  fireEvent.click(detailsLink);

  const favoriteCheck = getByLabelText('Pokémon favoritado?');
  expect(favoriteCheck.tagName).toBe('INPUT');

  if (!favoriteCheck.checked) {
    const images = getAllByRole('img');
    const imagesUrl = images.map((e) => e.src);
    const comparingArray = imagesUrl.map((e) => e.includes('/star-icon.svg'));
    const comparingArrayResult = comparingArray.reduce(
      ((e, acc) => acc || e),
      false,
    );
    expect(comparingArrayResult).toBe(false);
    fireEvent.click(favoriteCheck);
  }
  if (favoriteCheck.checked) {
    const images = getAllByRole('img');
    const imagesUrl = images.map((e) => e.src);
    const comparingArray = imagesUrl.map((e) => e.includes('/star-icon.svg'));
    const comparingArrayResult = comparingArray.reduce(
      ((e, acc) => acc || e),
      false,
    );
    expect(comparingArrayResult).toBe(true);
  }
});
