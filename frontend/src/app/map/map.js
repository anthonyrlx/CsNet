import createPops from './pops';
import createEnlaces from './enlaces';

window.map = L.map('map', {
  zoomDelta: 0.25,
  zoomSnap: 0,
  zoomControl: false
}).setView([-15.7801, -47.9292], 4.65);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  id: 'mapbox.streets',
  attribution: 'CsNet',
  minZoom: 4,
  maxZoom: 5,
  accessToken: 'pk.eyJ1IjoiZ3VzdGF2b20xOTk3IiwiYSI6ImNqdXViMnlobDAwNGM0ZGtkaG9ra290ODUifQ.mSY-729SnN4Olzu3re61SA'
}).addTo(map);

L.control.zoom({
  position: 'bottomright'
}).addTo(map);
map.doubleClickZoom.disable();

export {
  createPops,
  createEnlaces,
}