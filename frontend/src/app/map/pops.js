function addPopOnMap(name, lat, long){
  L.circle([lat, long], {
      color: '#0c2e2d',
      fillColor: '#fff',
      fillOpacity: 1,
      radius: 25000,
      name: name
  }).addTo(map)
}

function createPops(popsArray){
  popsArray.map(({ Nome: name, LatLong: { lat, long } }) => addPopOnMap(name, lat, long))
}

export default createPops;