const LOAD_ADDRESSES = 'EASE_ADDRESS/ADDRESS/LOAD_ADDRESSES';
const NEW_ADDRESS = 'EASE_ADDRESS/ADDRESS/NEW_ADDRESS';

const initialState = [];

export const loadAddresses = (payload) => ({
  type: LOAD_ADDRESSES,
  payload,
});

export const newAddress = (payload) => ({
  type: LOAD_ADDRESSES,
  payload,
});

export const addressFetch = ( username, password ) => async (dispatch) => {
  const { token } = JSON.parse(localStorage.getItem("easy-address-data"));
  await fetch('https://jaar-easy-address.herokuapp.com/api/v1/address', {
    method: 'GET',
    headers: { 
      "Content-Type": "application/json",
      "Authorization" : token
    },
    redirect: 'follow',
  }).then((response) => {
    if (response.status === 200){
      return response.json();
    } else {
      console.log("Wrong Token!!!");
    }
    return false;
  })
  .then((data) => {
    if (data) {
      dispatch(loadAddresses(data.addresses));
    }
  })
  .catch((error) => console.log(error));
};

export const newAddressFetch = ( colonia, ext_number, int_number, calle, municipio, postal_code, estado, pais ) => async (dispatch) => {
  const { token } = JSON.parse(localStorage.getItem("easy-address-data"));
  await fetch('https://jaar-easy-address.herokuapp.com/api/v1/address/new', {
    method: 'POST',
    headers: { 
      "Content-Type": "application/json",
      "Authorization" : token
    },
    body: JSON.stringify({
      colonia, ext_number, int_number, calle, municipio, postal_code, estado, pais,
    }),
    redirect: 'follow',
  }).then((response) => {
    if (response.status === 200){
      return response.json();
    } else {
      console.log("Wrong Token!!!");
    }
    return false;
  })
  .then((data) => {
    if (data) {
      dispatch(newAddress({colonia, ext_number, int_number, calle, municipio, postal_code, estado, pais}));
    }
  })
  .catch((error) => console.log(error));
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ADDRESSES:
      return action.payload;
    case NEW_ADDRESS:
      return [
        ...state,
        action.payload
      ];
    default:
      return state;
  }
};

export default reducer;