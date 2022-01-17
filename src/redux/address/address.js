const LOAD_ADDRESSES = 'EASE_ADDRESS/ADDRESS/LOAD_ADDRESSES';
const NEW_ADDRESS = 'EASE_ADDRESS/ADDRESS/NEW_ADDRESS';
const DELETE_ADDRESS = 'EASE_ADDRESS/ADDRESS/DELETE_ADDRESS';

const initialState = [];

export const loadAddresses = (payload) => ({
  type: LOAD_ADDRESSES,
  payload,
});

export const newAddress = (payload) => ({
  type: NEW_ADDRESS,
  payload,
});

export const deleteAddress = (payload) => ({
  type: DELETE_ADDRESS,
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

export const deleteAddressFetch = ( id ) => async (dispatch) => {
  const { token } = JSON.parse(localStorage.getItem("easy-address-data"));
  await fetch(`https://jaar-easy-address.herokuapp.com/api/v1/address/delete/${id}`, {
    method: 'DELETE',
    headers: { 
      "Authorization" : token
    },
    mode: "cors",
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
      dispatch(deleteAddress(id));
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
    case DELETE_ADDRESS:
      return [...state.filter((address) => address.id !== action.payload)];
    default:
      return state;
  }
};

export default reducer;