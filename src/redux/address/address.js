const NEW_SESSION = 'EASE_ADDRESS/ADDRESS/NEW_USER';
const LOAD_ADDRESSES = 'EASE_ADDRESS/ADDRESS/LOAD_ADDRESSES';

const initialState = [];

export const loadAddresses = (payload) => ({
  type: LOAD_ADDRESSES,
  payload,
});

export const newSession = (payload) => ({
  type: NEW_SESSION,
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

export const loginFetch = ( username, password ) => async (dispatch) => {
  await fetch('https://jaar-easy-address.herokuapp.com/api/v1/login', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
    }),
    redirect: 'follow',
  }).then((response) => {
    if (response.status === 200){
      return response.json();
    } else {
      console.log("unable to login wrong username or password");
    }
    return false;
  })
  .then((data) => {
    if (data) {
      dispatch(newSession(data.token));
    }
  })
  .catch((error) => console.log(error));
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ADDRESSES:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;