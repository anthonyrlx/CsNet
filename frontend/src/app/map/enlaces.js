function addEnlaceOnMap(latLong, startPopName, endPopName, { distance, cost, hops }){
  const line = L.polyline(latLong, {
    color: '#fbfb4a',
    weight: 3.5,
    opacity: 1,
    smoothFactor: 1,
    riseOnHover: false,
    route1: [startPopName, endPopName],
    route2: [endPopName, startPopName],
    startPopName,
    endPopName,
    hops,
    cost,
    distance
  }).addTo(map);
  line.bringToBack();
  map.enlaces.push(line);
}

function createEnlace(enlaces, pops){
  console.log(enlaces)
  enlaces.map(({ P1: startPop, routes }) => {
    const [ startPopLatLongObj ] = pops.filter(({ Nome: name }) => name === startPop);
    routes.map(({ name: endPop, metricas }) => {
      const [ endPopLatLongObj ] = pops.filter(({ Nome: name }) => name === endPop);
      const { LatLong: { lat: startPopLat, long: startPopLong }} = startPopLatLongObj;
      const { LatLong: { lat: endPopLat, long: endPopLong }} = endPopLatLongObj;
      const latLongs = [[startPopLat, startPopLong], [endPopLat, endPopLong]];
      addEnlaceOnMap(latLongs, startPop, endPop, metricas);
    })
  })
}

export default createEnlace;