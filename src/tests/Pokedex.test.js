import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { cleanup, render, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import data from '../data';

afterEach(cleanup);

test('Next Pokemon Button', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);
  
  const nextButton = getByText(/Próximo pokémon/i);
  expect(nextButton).toBeInTheDocument();

  data.forEach((_, index) => {
    expect(getByTestId("pokemon-name").innerHTML).toBe(data[index].name);
    fireEvent.click(nextButton);
    if (index < data.length - 1) {
      expect(getByTestId("pokemon-name").innerHTML).toBe(data[index+1].name);
    } else {
      expect(getByTestId("pokemon-name").innerHTML).toBe(data[0].name);
    } 
  })
});

test('One Pokemon per Time', () => {
  const { getAllByTestId, getByTestId } = renderWithRouter(<App />);

  const allTypes = data.reduce((current, value) => {
    if (current.includes(value.type) === false) {
      current.push(value.type);
    }
    return current;
  }, ['All']);

  const allTypeButtons = getAllByTestId('pokemon-type-button').reduce((current, value) => {
    current.push(value.innerHTML);
    return current;
  }, []);

  expect(allTypes).toEqual(expect.arrayContaining(allTypeButtons));

  getAllByTestId('pokemon-type-button').forEach((button) => {
    fireEvent.click(button);
    expect(getByTestId("pokemonType").innerHTML).toBe(button.innerHTML);
  });
})

test('All Button', () => {
  
})