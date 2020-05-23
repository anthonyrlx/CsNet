function addEnlaceOnMap(latLong){
  const line = L.polyline(latLong, {
    color: 'yellow',
    weight: 3.5,
    opacity: 1,
    smoothFactor: 1,
    riseOnHover: false,
    // route1: p1Name + p2Name,
    // route2: p2Name + p1Name,
    // start: p1Name,
    // end: p2Name,
    // cost : cost,
    // distance : distance
  }).addTo(map);
  line.bringToBack();
}

function createEnlace(enlaces, pops){
  enlaces.map(({ P1: startPop, routes }) => {
    const [ startPopLatLongObj ] = pops.filter(({ Nome: name }) => name === startPop);
    routes.map(({ name: endPop }) => {
      const [ endPopLatLongObj ] = pops.filter(({ Nome: name }) => name === endPop);
      const { LatLong: { lat: startPopLat, long: startPopLong }} = startPopLatLongObj;
      const { LatLong: { lat: endPopLat, long: endPopLong }} = endPopLatLongObj;
      const latLongs = [[startPopLat, startPopLong], [endPopLat, endPopLong]];
      addEnlaceOnMap(latLongs);
    })
  })
}

export default createEnlace;