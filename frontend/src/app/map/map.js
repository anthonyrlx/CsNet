import createPops from './pops';
window.mymap = L.map('map', {
  zoomDelta: 0.25,
  zoomSnap: 0
}).setView([-15.7801, -47.9292], 4);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  id: 'mapbox.streets',
  attribution: 'CsNet',
  minZoom: 4,
  maxZoom: 5,
  accessToken: 'pk.eyJ1IjoiZ3VzdGF2b20xOTk3IiwiYSI6ImNqdXViMnlobDAwNGM0ZGtkaG9ra290ODUifQ.mSY-729SnN4Olzu3re61SA'
}).addTo(mymap);
mymap.doubleClickZoom.disable();

export {
  createPops,
}