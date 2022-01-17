const NEW_SESSION = 'EASE_ADDRESS/SESSION/NEW_USER';
const LOG_OUT_SESSION = 'EASE_ADDRESS/SESSION/LOG_OUT_SESSION';

let initialState = {
  status: false,
  token: "",
};

const localData = JSON.parse(localStorage.getItem("easy-address-data"));
if (localData) {
  initialState = localData;
};

const saveToLocal = (apiData) => {
  localStorage.setItem("easy-address-data", JSON.stringify(apiData));
};

export const newSession = (payload) => ({
  type: NEW_SESSION,
  payload,
});

export const logOutSession = () => ({
  type: LOG_OUT_SESSION,
  payload: {
    status: false,
    token: "",
  },
});

export const newUserFetch = ( username, password ) => async (dispatch) => {
  await fetch('https://jaar-easy-address.herokuapp.com/api/v1/user/new', {
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
      console.log("Unable to create new user!");
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
    case NEW_SESSION:
      const newState = {
        status: true,
        token: action.payload,
      };
      saveToLocal(newState);
      return newState;
    case LOG_OUT_SESSION:
      localStorage.removeItem("easy-address-data");
      return action.payload;
    default:
      return state;
  }
};

export default reducer;