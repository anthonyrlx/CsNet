window.onload = () =>{
    let mymap = L.map('mapid').setView([ -14.235,  -51.9253], 4);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Ola',      
        maxZoom: 4,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiZ3VzdGF2b20xOTk3IiwiYSI6ImNqdXViMnlobDAwNGM0ZGtkaG9ra290ODUifQ.mSY-729SnN4Olzu3re61SA'
    }).addTo(mymap);

    mymap.zoomControl.remove();
    mymap.scrollWheelZoom.disable();
    mymap.touchZoom.disable();
    mymap.doubleClickZoom.disable();
    mymap.scrollWheelZoom.disable();
    mymap.dragging.disable();

    let circle = L.circle([-23.5505, -46.6333], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 40000
    }).addTo(mymap);

    let circle2 = L.circle([ -22.9035, -43.2096], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 40000
    }).addTo(mymap);
    console.log(circle)
    
    let circles = Array();
    circles.push(circle)
    circles.push(circle2)
    cont = 0;
    circles.forEach(a =>{
        a.addEventListener('click',() =>{
            if(a._initHooksCalled == true){
                a._initHooksCalled = false
            }
            else{
                cont++
                a._initHooksCalled == true
            }
            if(cont == 2){
                pop1 = circles[0]
                pop2 = circles[1]
                ligarPops(pop1, pop2)
            }
        })
    })

    let pontos = Array();
    let pops = document.querySelectorAll("path");
    let id1 = circle2._leaflet_id
    let id2 = circle._leaflet_id

    let ligarPops = (p1, p2) =>{   
        let latlngs = Array();
        console.log(p1)
        latlngs.push(p1.getLatLng());
        latlngs.push(p2.getLatLng());
        L.polyline(latlngs, {color: 'red'}).addTo(mymap);
    }
}