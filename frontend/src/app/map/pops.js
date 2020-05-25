import createPopOptions from './popOptions';

function addPopOnMap(name, lat, long, onClickPopOption){
  const circle = L.circle([lat, long], {
      color: '#386377',
      fillColor: '#FFF',
      fillOpacity: 1,
      radius: 25000,
      name: name
  })
  .bindPopup(createPopOptions('Marcar', 'Desabilitar', name, onClickPopOption))
  .addTo(map);
  map.pops.push(circle);
}

function createPops(popsArray, onClickPopOption){
  popsArray.map(({ Nome: name, LatLong: { lat, long } }) => addPopOnMap(name, lat, long, onClickPopOption))
}

export default createPops;