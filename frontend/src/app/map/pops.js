function addPopOnMap(name, lat, long){
  const circle = L.circle([lat, long], {
      color: '#0c2e2d',
      fillColor: '#fff',
      fillOpacity: 1,
      radius: 25000,
      name: name
  }).addTo(mymap)
  popsList.push(circle)
}

function createPops(popsArray){
  popsArray.map(({ name, lat, long }) => addPopOnMap(name, lat, long))
}

export default createPops;