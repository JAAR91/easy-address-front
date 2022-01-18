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

export const newUserFetch = ( username, password, setLoading, setMsg ) => async (dispatch) => {
  await fetch(process.env.REACT_APP_EASY_ADDRESS_NEW_USER_API, {
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
    } else if(response.status === 409) {
      setMsg("Usuario no disponible");
      setLoading(false);
    }
    return false;
  })
  .then((data) => {
    if (data) {
      setLoading(false);
      dispatch(newSession(data.token));
    }
  })
  .catch((error) => console.log(error));
};

export const loginFetch = ( username, password, setLoading, setMsg ) => async (dispatch) => {
  await fetch(process.env.REACT_APP_EASY_ADDRESS_LOGIN_API, {
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
      setMsg("Usuario o contrasena invalida!");
      setLoading(false);
    }
    return false;
  })
  .then((data) => {
    if (data) {
      setLoading(false);
      dispatch(newSession(data.token));
    }
  })
  .catch(() => {
    setMsg("No se pudo conectar con el servidor!");
    setLoading(false);
  });
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