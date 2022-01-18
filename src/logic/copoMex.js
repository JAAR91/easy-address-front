const coPoMexApi = async (postal_code, updateMunicipio, updateEstado, updatePais, setColList, setStage, setZipLoading) => {
  await fetch(`${process.env.REACT_APP_COPOMEX_API_KEY}${postal_code}?token=${process.env.REACT_APP_COPOMEX_API_TOKEN}`,{
    method: 'GET',
    headers: { "Content-Type": "application/json" },
    mode: "cors",
  }).then((response) => {
    return response.json();
  }).then((data) => {
    if (!data[0].error){
      updateEstado(data[0].response.estado);
      updateMunicipio(data[0].response.municipio);
      updatePais(data[0].response.pais);
      setColList(data.map((res) => res.response.asentamiento));
      setStage(2);
      setZipLoading(false);
    }
  }).catch((err) => {
    setZipLoading(false);
  });
};

export default coPoMexApi;