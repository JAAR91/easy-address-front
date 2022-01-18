const coPoMexApi = async (postal_code, updateMunicipio, updateEstado, updatePais, setColList, setStage, setZipLoading) => {
  await fetch(`https://api.copomex.com/query/info_cp/${postal_code}?token=pruebas`,{
    method: 'GET',
    headers: { "Content-Type": "application/json" },
    redirect: 'follow',
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