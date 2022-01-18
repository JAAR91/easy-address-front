const LOAD_ADDRESSES = 'EASE_ADDRESS/ADDRESS/LOAD_ADDRESSES';
const NEW_ADDRESS = 'EASE_ADDRESS/ADDRESS/NEW_ADDRESS';
const DELETE_ADDRESS = 'EASE_ADDRESS/ADDRESS/DELETE_ADDRESS';
const UPDATE_ADDRESS = 'EASE_ADDRESS/ADDRESS/UPDATE_ADDRESS';

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

export const updateAddress = (payload) => ({
  type: UPDATE_ADDRESS,
  payload,
});

export const addressFetch = ( username, password ) => async (dispatch) => {
  const { token } = JSON.parse(localStorage.getItem("easy-address-data"));
  await fetch(process.env.REACT_APP_EASY_ADDRESS_ADDRESS_LIST_API, {
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

export const newAddressFetch = ( colonia, ext_number, int_number, calle, municipio, postal_code, estado, pais, setSubmitLoading, setMessage, setStage, resetFormData) => async (dispatch) => {
  const { token } = JSON.parse(localStorage.getItem("easy-address-data"));
  await fetch(process.env.REACT_APP_EASY_ADDRESS_ADDRESS_NEW_API, {
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
      setMessage("Error, nose puedo guardar la direccion, asegurate que todos los campos con (*) este llenos!");
    }
    return false;
  })
  .then((data) => {
    if (data) {
      resetFormData();
      setStage(1);
      setMessage("Direccion Agregada!");
      dispatch(newAddress({colonia, ext_number, int_number, calle, municipio, postal_code, estado, pais}));
    }
    setSubmitLoading(false);
  })
  .catch((error) => {
    setSubmitLoading(false);
    setMessage("Error de conexion intentalo mas tarde!");
  });
};

export const deleteAddressFetch = ( id, setLoadingStatus ) => async (dispatch) => {
  const { token } = JSON.parse(localStorage.getItem("easy-address-data"));
  await fetch(`${process.env.REACT_APP_EASY_ADDRESS_ADDRESS_DELETE_API}${id}`, {
    method: 'DELETE',
    headers: { 
      "Authorization" : token
    },
    mode: "cors",
  }).then((response) => {
    if (response.status === 200){
      setLoadingStatus(false);
      dispatch(deleteAddress(id));
    }
  })
  .catch((error) => {
    setLoadingStatus(false);
  });
};

export const updateAddressFetch = ( id, colonia, ext_number, int_number, calle, municipio, postal_code, estado, pais, setSubmitLoading, setMessage ) => async (dispatch) => {
  const { token } = JSON.parse(localStorage.getItem("easy-address-data"));
  await fetch(`${process.env.REACT_APP_EASY_ADDRESS_ADDRESS_UPDATE_API}${id}`, {
    method: 'PATCH',
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
      setMessage("No se puedo actualizar la direccion");
      setSubmitLoading(false);
    }
    return false;
  })
  .then((data) => {
    setSubmitLoading(false);
    if (data) {
      dispatch(updateAddress({id, colonia, ext_number, int_number, calle, municipio, postal_code, estado, pais}));
    }
  })
  .catch((error) => {
    setSubmitLoading(false);
    setMessage("Error de conexion intentalo mas tarde");
  });
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
    case UPDATE_ADDRESS:
      return [...state.map((address) => {
        if(address.id === action.payload.id) {
          return action.payload;
        }
        return address;
      })];
    default:
      return state;
  }
};

export default reducer;