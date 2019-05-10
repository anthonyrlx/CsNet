window.onload = async =>{
    let putPopsMap = (name, lat, long) => {
        let circle = L.circle([lat, long], {
            color: '#0c2e2d',
            fillColor: '#fff',
            fillOpacity: 1,
            radius: 25000,
            name: name
        }).addTo(mymap)
        popsList.push(circle)
    }
    const pops = await getPops()
        pops.forEach(element => {
            let name = element.Nome
            let lat = element.LatLong.lat
            let long = element.LatLong.long
            putPopsMap(name, lat, long)
    });
}