import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const renderWithRouter = (ui, history = createMemoryHistory()) => ({
  ...render(<Router history={history}>{ui}</Router>),
  history,
});

export default renderWithRouter;
