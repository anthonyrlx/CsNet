window.onload = async () => {
    //Cria e coloca o mapa no html
    let mymap = L.map('mapid', {
        zoomDelta: 0.25,
        zoomSnap: 0
    }).setView([-15.7801, -47.9292], 4);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Ola',
        maxZoom: 5,
        minZoom: 4,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiZ3VzdGF2b20xOTk3IiwiYSI6ImNqdXViMnlobDAwNGM0ZGtkaG9ra290ODUifQ.mSY-729SnN4Olzu3re61SA'
    }).addTo(mymap);
    //Remove algumas configurações do mapa
    //mymap.zoomControl.remove();
    //mymap.scrollWheelZoom.disable();
    //mymap.touchZoom.disable();
    mymap.doubleClickZoom.disable();
    //mymap.scrollWheelZoom.disable();
    //mymap.dragging.disable();
    let metrica = 'distance'
    let popsList = Array();
    let lineList = Array();
    let closeLine = Array();
    //Colocar os pops no mapa
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
    //Colocar os enlaces entre os pops
    let makeEnalece = (p1, p2, routes) => {
        let p1LatLong = null
        let p2LatLong = null
        let p1Name = null
        let p2Name = null
        popsList.forEach(pop => {
            let popName = pop.options.name
            pop._path.attributes[2].textContent = popName
            if (p1 == popName) {
                p1LatLong = pop.getLatLng()
                p1Name = popName
            }
        })
        popsList.forEach(pop => {
            let popName = pop.options.name
            if (p2 == popName) {
                p2LatLong = pop.getLatLng()
                p2Name = popName
            }
        })
        let latlngs = Array();
        latlngs.push(p1LatLong);
        latlngs.push(p2LatLong);
        cost = null
        distance = null
        routes.forEach(function(route){
            if(route.name == p2Name || route.name == p1Name) cost = route.metricas.cost, distance = route.metricas.distance
            //console.log(distance)
        })
        let linha = L.polyline(latlngs, {
            color: 'yellow',
            weight: 3.5,
            opacity: 1,
            smoothFactor: 1,
            riseOnHover: false,
            route1: p1Name + p2Name,
            route2: p2Name + p1Name,
            start: p1Name,
            end: p2Name,
            cost : cost,
            distance : distance
        }).addTo(mymap);
        lineList.push(linha)
        linha.bringToBack();
    }

    const getPops = async => {
        let urlPops = 'https://csnet-239015.appspot.com/api/pops'
        return feachData(urlPops)
    }

    const getEnlaces = async => {
        let urlEnlaces = 'https://csnet-239015.appspot.com/api/enlaces'
        return feachData(urlEnlaces)
    }

    const feachData = async url => {
        const res = await fetch(url)
        const json = await res.json()
        return json
    }

    const pops = await getPops()
    pops.forEach(element => {
        let name = element.Nome
        let lat = element.LatLong.lat
        let long = element.LatLong.long
        putPopsMap(name, lat, long)
    });

    const enlaces = await getEnlaces()
    enlaces.forEach(elementPops => {
        let p1Name = elementPops.P1
        let routes = elementPops.routes
        routes = elementPops.routes
        routes.forEach(elementRoute => {
            let p2Name = elementRoute.name
            makeEnalece(p1Name, p2Name, routes)
        })
    })
    //Pegando dois pontos clicados

    

    let i = 0
    let popsClicked = Array();
    let popsDisable = Array();
    popsList.forEach(pop => {
        let btnMarcar = document.createElement('button')
        let btnDesabilitar = document.createElement('button')

        btnMarcar.appendChild(document.createTextNode("Marcar"));
        btnDesabilitar.appendChild(document.createTextNode("Desabilitar"))
        pop.addEventListener('click', () => {
            namePop = pop.options.name

            let box = document.createElement('div')
            let text = document.createElement('h3')
            let node = document.createTextNode("Local: " + namePop);
            let btnMarcar = document.createElement('button')
            let btnDesabilitar = document.createElement('button')

            btnMarcar.style.padding = '2px'
            btnMarcar.style.marginRight = '5px'
            btnMarcar.style.height = '25px'
            btnMarcar.style.width = '80px'
            btnMarcar.style.backgroundColor = '#638a89'
            btnMarcar.style.color = '#fff'
            btnMarcar.style.border = '0'
            btnMarcar.style.cursor = 'pointer'
            btnMarcar.style.borderRadius = '2px'
            btnMarcar.style.fontFamily = 'Courier'
            btnMarcar.style.fontSize = '11px'

            btnDesabilitar.style.padding = '2px'
            btnDesabilitar.style.marginRight = '5px'
            btnDesabilitar.style.height = '25px'
            btnDesabilitar.style.width = '80px'
            btnDesabilitar.style.backgroundColor = '#638a89'
            btnDesabilitar.style.color = '#fff'
            btnDesabilitar.style.border = '0'
            btnDesabilitar.style.cursor = 'pointer'
            btnDesabilitar.style.borderRadius = '2px'
            btnDesabilitar.style.fontFamily = 'Courier'
            btnDesabilitar.style.fontSize = '11px'

            btnMarcar.onmouseover = () => {
                btnMarcar.style.backgroundColor = '#355554'
            }

            btnMarcar.onmouseout = () => {
                btnMarcar.style.backgroundColor = '#638a89'
            }

            btnDesabilitar.onmouseover = () => {
                btnDesabilitar.style.backgroundColor = '#355554'
            }

            btnDesabilitar.onmouseout = () => {
                btnDesabilitar.style.backgroundColor = '#638a89'
            }

            text.appendChild(node)
            box.appendChild(text)
            box.appendChild(btnMarcar)
            box.appendChild(btnDesabilitar)
            box.style.width = '170px'
            box.style.textAlign = 'center'
            latlng = pop.getLatLng()
            L.popup().setLatLng(latlng).setContent(box).openOn(mymap)
            nodeColor = pop._path.attributes.stroke.nodeValue
            if(nodeColor == '#0c2e2d'){
                btnMarcar.innerText = "Marca"
                btnDesabilitar.innerText = "Desabilitar"
            }
            else{
                btnMarcar.innerText = "Desmarcar"
                btnDesabilitar.innerText = "Habilitar"
            }
            btnMarcar.addEventListener('click', () => {
                
                nodeColor = pop._path.attributes.stroke.nodeValue
                if (nodeColor == '#0c2e2d') {
                    btnMarcar.innerText = "Desmarcar"
                    pop._path.attributes.stroke.nodeValue = 'blue'
                    pop._path.attributes.fill.nodeValue = 'blue'
                    popsClicked.push(pop)
                    i++
                    if (i == 2){
                        document.querySelector('#btn-send').disabled = false
                    }
                    if(popsClicked.length > 2){
                        popsClicked = []
                        popsClicked.push(pop)
                        document.querySelector('#btn-send').disabled = true
                        popsList.forEach(function(pop2){
                            if (pop2 != pop){
                                pop2._path.attributes.stroke.nodeValue = '#0c2e2d'
                                pop2._path.attributes.fill.nodeValue = '#fff'
                            }
                        })
                        console.log(popsClicked)
                        i = 0   
                    }
                }
                else {
                    btnMarcar.innerText = "Marcar"
                    pop._path.attributes.stroke.nodeValue = '#0c2e2d'
                    pop._path.attributes.fill.nodeValue = '#fff'
                    popsClicked.splice(popsClicked.indexOf(pop), 1)
                    if(popsClicked.length > 0){
                        popsList.forEach(popColor =>{
                            popColorName = popColor.options.name
                            popClickedName = popsClicked[0].options.name
                            if(popColorName != popClickedName){
                                popColor._path.attributes.stroke.nodeValue = '#0c2e2d'
                                popColor._path.attributes.fill.nodeValue = '#fff'
                            }
                        })
                    }

                    lineList.forEach(line =>{
                        line._path.attributes.stroke.nodeValue = 'yellow'
                    })
                    
                    document.querySelector('#btn-send').disabled = true
                    i--
                }
            })

            btnDesabilitar.addEventListener('click', () => {
                nodeColor = pop._path.attributes.stroke.nodeValue
                if (nodeColor == '#0c2e2d' || nodeColor == 'blue') {
                    btnDesabilitar.innerText = "Habilitar"
                    pop._path.attributes.stroke.nodeValue = 'silver'
                    pop._path.attributes.fill.nodeValue = 'silver'
                    popsDisable.push(pop.options.name)
                   
                    if(popsClicked.length > 1) {
                        requestDijkstra(popsClicked, popsDisable, metrica)
                        lineList.forEach(line =>{
                            line._path.attributes.stroke.nodeValue = 'yellow'
                        })
                    }
                }
                else {
                    btnDesabilitar.innerText = "Desabilitar"
                    pop._path.attributes.stroke.nodeValue = '#0c2e2d'
                    pop._path.attributes.fill.nodeValue = '#fff'
                    cleanEnlaces()
                    popsDisable.splice(popsDisable.indexOf(pop), 1)
                    if(popsClicked.length > 1) {
                        requestDijkstra(popsClicked, popsDisable, metrica)
                        lineList.forEach(line =>{
                            line._path.attributes.stroke.nodeValue = 'yellow'
                        })
                    }
                }
            })
            
        })
    })
    let requestDijkstra = async (popsClicked, popsDisable, metrica) => {
        mymap.eachLayer(function(layer) {
            console.log(layer)
            if(layer.options.pane === "tooltipPane") layer.removeFrom(mymap);
        });
        cleanEnlaces()
        let urlDijkstra = 'http://localhost:9000/api/distance'
        let parameters = { 'start': popsClicked[0].options.name, 'end': popsClicked[1].options.name, 'method': metrica, 'closedNodes': popsDisable, 
        'closedEdges':closeLine}

        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Origin": "*"
        }

        let response = await fetch(urlDijkstra, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(parameters)
        })

        routeResponse = await response.json()
        changeLine(routeResponse)
    }
    count = 0
    let changeLine  = route =>{
        hops = 0
        costTotal = 0
        distanceTotal = 0
        lineList.forEach(line =>{
            route1 = line.options.route1
            route2 = line.options.route2
            let popsRoute = route.path
            for (let i = 0; i <= popsRoute.length; i++){
                if(popsRoute[i] + popsRoute[i + 1]== route1 || popsRoute[i] + popsRoute[i + 1] == route2){
                    line._path.attributes.stroke.nodeValue = 'blue'
                    
                    latlng = line.getCenter()
                    hops += 1
                    costTotal += line.options.cost
                    distanceTotal += line.options.distance
                    //console.log(costTotal)
                    show(hops, costTotal, distanceTotal)
                    if(metrica == 'cost'){
                        L.tooltip().setLatLng(latlng).setContent(line.options.cost.toString()).addTo(mymap)
                    }
                    if(metrica == 'distance'){
                        L.tooltip().removeFrom(mymap)
                        L.tooltip().setLatLng(latlng).setContent(line.options.distance.toString()).addTo(mymap)
                    }
                    if(metrica == 'hops'){
                        L.tooltip().removeFrom(mymap)
                        L.tooltip().setLatLng(latlng).setContent('1').addTo(mymap)
                    }
                }
            }
        })
        let pops = route.path
        pops.forEach(pop =>{
            popChange = pop
            popsList.forEach(popMap =>{
                if(popMap.options.name == popChange) {
                    popMap._path.attributes.stroke.nodeValue = 'blue'
                    popMap._path.attributes.fill.nodeValue = 'blue'
                }
            })
        }) 
    
    }
    document.querySelector('#btn-send').onclick = () =>{
        let elementMetrica = document.querySelector('#metrica').value
        if(elementMetrica == '1') metrica = 'hops'
        if(elementMetrica == '2') metrica = 'distance'
        if(elementMetrica == '3') metrica = 'cost'
        popsList.forEach(function(pop){
            if (pop != popsClicked[0] || pop != popsClicked[1]){
                pop._path.attributes.stroke.nodeValue = '#0c2e2d'
                pop._path.attributes.fill.nodeValue = '#fff'
            }
        })
        requestDijkstra(popsClicked, popsDisable, metrica)
    }

    lineList.forEach(function(line){
        line.addEventListener('click', function(){
            latlng = line.getCenter()
            box = createElements()
            L.popup().setLatLng(latlng).setContent(box).openOn(mymap)
            const lineElement = box.querySelector('button')
            if(line._path.attributes.stroke.nodeValue == 'yellow' || line._path.attributes.stroke.nodeValue == 'blue') lineElement.innerText = 'Desabilitar'
            else lineElement.innerText = 'Habilitar'
            lineElement.onclick = function(){
                if (line._path.attributes.stroke.nodeValue == 'yellow' || line._path.attributes.stroke.nodeValue == 'blue'){
                    lineElement.innerText = 'Habilitar'
                    line._path.attributes.stroke.nodeValue = 'silver'
                    listClickedLine = []
                    listClickedLine.push(line.options.start)
                    listClickedLine.push(line.options.end)
                    closeLine.push(listClickedLine)
                    if(popsClicked.length > 1) {
                        popsList.forEach(function(pop){
                            if (pop != popsClicked[0] || pop != popsClicked[1]){
                                pop._path.attributes.stroke.nodeValue = '#0c2e2d'
                                pop._path.attributes.fill.nodeValue = '#fff'
                            }
                        })
                        requestDijkstra(popsClicked, popsDisable, metrica)
                        line._path.attributes.stroke.nodeValue = 'silver'
                    }
                }
                else{
                    line._path.attributes.stroke.nodeValue = 'yellow'
                    lineElement.innerText = 'Desabilitar'
                    listRemoveLine = []
                    listRemoveLine.push(line.options.start)
                    listRemoveLine.push(line.options.end)
                    closeLine.splice(listRemoveLine.indexOf(line), 1)
                    popsList.forEach(function(pop){
                        if (pop != popsClicked[0] || pop != popsClicked[1]){
                            pop._path.attributes.stroke.nodeValue = '#0c2e2d'
                            pop._path.attributes.fill.nodeValue = '#fff'
                        }
                    })
                    if(popsClicked.length > 1) {
                        requestDijkstra(popsClicked, popsDisable, metrica)
                        
                    }
                }
            }
        })
    })

    function cleanEnlaces(){
        lineList.forEach(line =>{
            if(line._path.attributes.stroke.nodeValue != 'silver'){
                line._path.attributes.stroke.nodeValue = 'yellow'
            }
        })
    }

    function createElements(){
        let box = document.createElement('div')
        let text = document.createElement('h3')

        let btnMarcar = document.createElement('button')

        btnMarcar.style.padding = '2px'
        btnMarcar.style.marginRight = '5px'
        btnMarcar.style.height = '25px'
        btnMarcar.style.width = '80px'
        btnMarcar.style.backgroundColor = '#638a89'
        btnMarcar.style.color = '#fff'
        btnMarcar.style.border = '0'
        btnMarcar.style.cursor = 'pointer'
        btnMarcar.style.borderRadius = '2px'
        btnMarcar.style.fontFamily = 'Courier'
        btnMarcar.style.fontSize = '11px'
        box.appendChild(text)
        box.appendChild(btnMarcar)
        box.style.width = '80px'
        box.style.textAlign = 'center'
        return box
    }
    function show(hops, cost, distance){
        const element = document.querySelector('#showNumber')
        //hops += hops
        if(metrica == 'hops') element.innerText = 'Total de hops: ' + hops
        if(metrica == 'cost') element.innerText = 'Total de custo: ' + cost
        if(metrica == 'distance') element.innerText = 'Total de distancia: ' + distance
    }
}