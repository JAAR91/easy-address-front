let userCoords = {};

const glocation = (gloc) => {
  userCoords = gloc.coords;
};

const googleApi = async () => {
  navigator.geolocation.getCurrentPosition(glocation);
  const { latitude, longitude} = userCoords;
  await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=getkey`,{
    method: 'GET',
    headers: { "Content-Type": "application/json"},
    redirect: 'follow',
  }
  )
  .then((response) => {
    console.log(response);
  }).
  catch((error) => {
    console.log(error);
  });
}

export default googleApi;