/**
 * @jest-environment jsdom
 */

require('jest-fetch-mock').enableMocks();
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import {render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import store from '../redux/store';
import App from '../App';
import { loadAddresses } from '../redux/address/address';
import address from './__Mocks__/address.mocks';
import { newSession } from '../redux/session/session';

const data = {
  "status": true,
  "token": "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2NDI3ODc4MTF9.ES_wXzQq7qYRT2dVs2q_NOYEwfbjaKFhWjchy6hjQL8"
};

const renderWithRedux = (component) => ({
...render(
    <Provider store={store}>
      <Router>
        {component}
      </Router>
    </Provider>,
  ),
});
  
describe('Reservation Page', () => {
  beforeEach(() => {
    fetch.mockResponses(
      [
        JSON.stringify(address)
      ],
      [
        JSON.stringify(address)
      ],
      [
        JSON.stringify( { code: 0 })
      ],
      [
        JSON.stringify( { code: 0 })
      ]
    );
    store.dispatch(loadAddresses(address));
    store.dispatch(newSession(data));
  });

  test('we can access the address form from the home page', () => {
    renderWithRedux(<App />);
    userEvent.click(screen.getByText('Agregar Direcciones'));
    expect(screen.getAllByText('Agregar una nueva Direccion').length).toBe(1);
  });

  test('Address form page ask for each address field', () => {
    renderWithRedux(<App />);    
    expect(document.querySelectorAll("input").length).toBe(8);
  });

  test('The edit button take you to the address from with all the info already on the inputs', () => {
    renderWithRedux(<App />);
    userEvent.click(screen.getByText('INICIO'));
    userEvent.click(screen.getByTestId('addresses-container').childNodes[0].childNodes[0].childNodes[1].childNodes[0]);
    expect(document.querySelector(".address-zipcode").value).toBe("34534");
  });
});