var info;
var geoJson;
var lastClicked;
var buttonmapping = {"co_y": ["co", "y"], "co_1": ["co", "1"], "co_2": ["co", "2"], "co_3": ["co", "3"], "co_4": ["co", "4"], 
                        "no2_y": ["no2", "y"], "no2_1": ["no2", "1"], "no2_2": ["no2", "1"], "no2_3": ["no2", "3"], "no2_4": ["no2", "4"], 
                        "so2_y": ["so2", "y"], "so2_1": ["so2", "1"], "so2_2": ["so2", "1"], "so2_3": ["so2", "3"], "so2_4": ["so2", "4"], 
                        "oz_y": ["ozone", "y"], "oz_1": ["ozone", "1"], "oz_2": ["ozone", "1"], "oz_3": ["ozone", "3"], "oz_4": ["ozone", "4"], }

window.onload = function() {
    // var map = L.map('mapid').setView([34.0522, -118.2437], 10);
    document.getElementById("checkboxes").style.visibility = "hidden";
    mycolor = d3.rgb("#FFFAF0");
    d3.select("body").style("background-color", mycolor) 
    var map = L.map('mapid').setView([37.3382, -121.8863], 10);
    // 37.3382° N, 121.8863° 
    layer_group = [];
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 10,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiY2hlbmpseSIsImEiOiJjajlmemNscGQycTU2MzNtcW51ZGJoZ2ViIn0.Gf3W96-E5bA7JX2dz56QWw',
        noWrap: true
    }).addTo(map);

//   var map = L.map('map');

  // var layer = L.esri.tiledMapLayer({
  //   url: "https://tiles.arcgis.com/tiles/ZIL9uO234SBBPGL7/arcgis/rest/services/ozone/MapServer",
  //   opacity: 0.0
  // }).addTo(map);
  // layer_group.push(layer);

  var layer_co = L.esri.tiledMapLayer({
    url: "https://tiles.arcgis.com/tiles/ZIL9uO234SBBPGL7/arcgis/rest/services/2016_avg_co/MapServer",
    opacity: 0.0
  }).addTo(map);
  layer_group.push(layer_co);

//ozone
  var layer_ozone = L.esri.tiledMapLayer({
    url: "https://tiles.arcgis.com/tiles/ZIL9uO234SBBPGL7/arcgis/rest/services/ozone_avg_2016/MapServer",
    opacity: 0.0
  }).addTo(map);
  layer_group.push(layer_ozone);

//SO2
  var layer_so2 = L.esri.tiledMapLayer({
    url: "https://tiles.arcgis.com/tiles/ZIL9uO234SBBPGL7/arcgis/rest/services/so2_2016_2/MapServer",
    opacity: 0.0
  }).addTo(map);
  layer_group.push(layer_so2);

//no2
  var layer_no2 = L.esri.tiledMapLayer({
    url: "https://tiles.arcgis.com/tiles/ZIL9uO234SBBPGL7/arcgis/rest/services/no2_avg_2016/MapServer",
    opacity: 0.0
  }).addTo(map);
  layer_group.push(layer_no2);


//Co season1 
  var layer_co1 = L.esri.tiledMapLayer({
    url: "https://tiles.arcgis.com/tiles/ZIL9uO234SBBPGL7/arcgis/rest/services/co_spring/MapServer",
    opacity: 0.0
  }).addTo(map);
  layer_group.push(layer_co1);

//Co season2
  var layer_co2 = L.esri.tiledMapLayer({
    url: "https://tiles.arcgis.com/tiles/ZIL9uO234SBBPGL7/arcgis/rest/services/co_summer/MapServer",
    opacity: 0.0
  }).addTo(map);
  layer_group.push(layer_co2);

//Co season3
  var layer_co3 = L.esri.tiledMapLayer({
    url: "https://tiles.arcgis.com/tiles/ZIL9uO234SBBPGL7/arcgis/rest/services/co_fall/MapServer",
    opacity: 0.0
  }).addTo(map);
  layer_group.push(layer_co3);

//Co season4
  var layer_co4 = L.esri.tiledMapLayer({
    url: "https://tiles.arcgis.com/tiles/ZIL9uO234SBBPGL7/arcgis/rest/services/co_winter/MapServer",
    opacity: 0.0
  }).addTo(map);
  layer_group.push(layer_co4);

//NO2 season1
var layer_no21 = L.esri.tiledMapLayer({
    url: "https://tiles.arcgis.com/tiles/ZIL9uO234SBBPGL7/arcgis/rest/services/no2_spring/MapServer",
    opacity: 0.0
  }).addTo(map);
  layer_group.push(layer_no21);

//NO2 season2
var layer_no22 = L.esri.tiledMapLayer({
    url: "https://tiles.arcgis.com/tiles/ZIL9uO234SBBPGL7/arcgis/rest/services/no2_summer/MapServer",
    opacity: 0.0
  }).addTo(map);
  layer_group.push(layer_no22);

//NO2 season3
var layer_no23 = L.esri.tiledMapLayer({
    url: "https://tiles.arcgis.com/tiles/ZIL9uO234SBBPGL7/arcgis/rest/services/no2_fall/MapServer",
    opacity: 0.0
  }).addTo(map);
  layer_group.push(layer_no23);

//NO2 season4
// var layer21 = L.esri.tiledMapLayer({
//     url: "https://services1.arcgis.com/ZIL9uO234SBBPGL7/arcgis/rest/services/no2_2016/MapServer",
//     opacity: 0.0
//   }).addTo(map);
//   layer_group.push(layer4);

//So2 season1 
var layer_so21 = L.esri.tiledMapLayer({
    url: "https://tiles.arcgis.com/tiles/ZIL9uO234SBBPGL7/arcgis/rest/services/sp_so2/MapServer",
    opacity: 0.0
  }).addTo(map);
  layer_group.push(layer_so21);

//So2 season2
var layer_so22 = L.esri.tiledMapLayer({
    url: "https://tiles.arcgis.com/tiles/ZIL9uO234SBBPGL7/arcgis/rest/services/sum_so2/MapServer",
    opacity: 0.0
  }).addTo(map);
  layer_group.push(layer_so22);

// So2 season3
var layer_so23 = L.esri.tiledMapLayer({
    url: "https://services1.arcgis.com/ZIL9uO234SBBPGL7/arcgis/rest/services/no2_2016/MapServer",
    opacity: 0.0
  }).addTo(map);
  layer_group.push(layer_so23);

//So2 season4
var layer_so24 = L.esri.tiledMapLayer({
    url: "https://services1.arcgis.com/ZIL9uO234SBBPGL7/arcgis/rest/services/no2_2016/MapServer",
    opacity: 0.0
  }).addTo(map);
  layer_group.push(layer_so24);

//Ozone season1
var layer_ozone1 = L.esri.tiledMapLayer({
    url: "https://tiles.arcgis.com/tiles/ZIL9uO234SBBPGL7/arcgis/rest/services/sp_ozone/MapServer",
    opacity: 0.0
  }).addTo(map);
  layer_group.push(layer_ozone1); 

//Ozone season2
var layer_ozone2 = L.esri.tiledMapLayer({
    url: "https://tiles.arcgis.com/tiles/ZIL9uO234SBBPGL7/arcgis/rest/services/sum_ozone/MapServer",
    opacity: 0.0
  }).addTo(map);
  layer_group.push(layer_ozone2); 

//Ozone season3
var layer_ozone3 = L.esri.tiledMapLayer({
    url: "https://tiles.arcgis.com/tiles/ZIL9uO234SBBPGL7/arcgis/rest/services/aut_ozone/MapServer",
    opacity: 0.0
  }).addTo(map);
  layer_group.push(layer_ozone3);

//Ozone season4
var layer_ozone4 = L.esri.tiledMapLayer({
    url: "https://tiles.arcgis.com/tiles/ZIL9uO234SBBPGL7/arcgis/rest/services/win_ozone/MapServer",
    opacity: 0.0
  }).addTo(map);
  layer_group.push(layer_ozone4);


 var co_y = document.getElementById('co_y');
 co_y.addEventListener('click', e => {
    lastClicked = "co_y";
    map.addLayer(layer_co);
    layer_co.setOpacity(0.25);})

var co_1 = document.getElementById('co_1');
 co_1.addEventListener('click', e => {
    lastClicked = "co_1";
    map.addLayer(layer_co1);
    layer_co1.setOpacity(0.25);})

var co_2 = document.getElementById('co_2');
 co_2.addEventListener('click', e => {
    lastClicked = "co_2";
    map.addLayer(layer_co2);
    layer_co2.setOpacity(0.25);})

var co_3 = document.getElementById('co_3');
 co_3.addEventListener('click', e => {
    lastClicked = "co_3";
    map.addLayer(layer_co3);
    layer_co3.setOpacity(0.25);})

var co_4 = document.getElementById('co_4');
 co_4.addEventListener('click', e => {
    lastClicked = "co_4";
    map.addLayer(layer_co4);
    layer_co4.setOpacity(0.25);})

var so2_y = document.getElementById('so2_y');
 so2_y.addEventListener('click', e => {
    lastClicked = "so2_y";
    map.addLayer(layer_so2);
    layer_so2.setOpacity(0.25);})

var so2_1 = document.getElementById('so2_1');
 so2_1.addEventListener('click', e => {
    lastClicked = "so2_1";
    map.addLayer(layer_so21);
    layer_so21.setOpacity(0.25);})

var so2_2 = document.getElementById('so2_2');
 so2_2.addEventListener('click', e => {
    lastClicked = "so2_2";
    map.addLayer(layer_so22);
    layer_so22.setOpacity(0.25);})

var so2_3 = document.getElementById('so2_3');
 so2_3.addEventListener('click', e => {
    lastClicked = "so2_3";
    map.addLayer(layer_so23);
    layer_so23.setOpacity(0.25);})

var so2_4 = document.getElementById('so2_4');
 so2_4.addEventListener('click', e => {
    lastClicked = "so2_4";
    map.addLayer(layer_so24);
    layer_so24.setOpacity(0.25);})

 var no2_y = document.getElementById('no2_y');
 no2_y.addEventListener('click', e => {
    lastClicked = "no2_y";
    map.addLayer(layer_no2);
    layer_no2.setOpacity(0.25);})

 var no2_1 = document.getElementById('no2_1');
 no2_1.addEventListener('click', e => {
    lastClicked = "no2_1";
    map.addLayer(layer_no21);
    layer_no21.setOpacity(0.25);})

var no2_2 = document.getElementById('no2_2');
 no2_2.addEventListener('click', e => {
    lastClicked = "no2_2";
    map.addLayer(layer_no22);
    layer_no22.setOpacity(0.25);})

var no2_3 = document.getElementById('no2_3');
 no2_3.addEventListener('click', e => {
    lastClicked = "no2_3";
    map.addLayer(layer_no23);
    layer_no23.setOpacity(0.25);})


var no2_4 = document.getElementById('no2_4');
 no2_4.addEventListener('click', e => {
    lastClicked = "no2_4";
    map.addLayer(layer_no24);
    layer_no24.setOpacity(0.25);})

var oz_y = document.getElementById('oz_y');
 oz_y.addEventListener('click', e => {
    lastClicked = "oz_y";
    map.addLayer(layer_ozone);
    layer_ozone.setOpacity(0.25);})

var oz_1 = document.getElementById('oz_1');
 oz_1.addEventListener('click', e => {
    lastClicked = "oz_1";
    map.addLayer(layer_ozone1);
    layer_ozone1.setOpacity(0.25);})

var oz_2 = document.getElementById('oz_2');
 oz_2.addEventListener('click', e => {
    lastClicked = "oz_2";
    map.addLayer(layer_ozone2);
    layer_ozone2.setOpacity(0.25);})

var oz_3 = document.getElementById('oz_3');
 oz_3.addEventListener('click', e => {
    lastClicked = "oz_3";
    map.addLayer(layer_ozone3);
    layer_ozone3.setOpacity(0.25);})

var oz_4 = document.getElementById('oz_4');
 oz_4.addEventListener('click', e => {
    lastClicked = "oz_4";
    map.addLayer(layer_ozone4);
    layer_ozone4.setOpacity(0.25);})



  // function visibility(name) {
  //   for (var i = 0; i < layer_group.length; i++) {
  //     map.removeLayer(layer_group[i]);
  //   }
  //   if (name == "no2") {
  //     map.addLayer(layer_no2);
  //     layer.setOpacity(0.25);
  //   } 

  //   else if (name == "co") {
  //     map.addLayer(layer_co);
  //     layer_co.setOpacity(0.25);
  //   }
  //   else if (name == "so2") {
  //     map.addLayer(layer_so2);
  //     layer_so2.setOpacity(0.25);
  //   }
  //   else if (name == "ozone") {
  //     map.addLayer(layer_ozone);
  //     layer_ozone.setOpacity(0.25);
  //   }
  //   else if (name == "s1_co") {
  //     map.addLayer(layer_co1);
  //     layer_co1.setOpacity(0.25);
  //   }
  //   else if (name == "s2_co") {
  //     map.addLayer(layer_co2);
  //     layer_co2.setOpacity(0.25);
  //   }
  //   else if (name == "s3_co") {
  //     map.addLayer(layer_co3);
  //     layer_co3.setOpacity(0.25);
  //   }
  //   else if (name == "s4_co") {
  //     map.addLayer(layer_co4);
  //     layer_co4.setOpacity(0.25);
  //   }
  //   else if (name == "s1_so2") {
  //     map.addLayer(layer_so21);
  //     layer_so21.setOpacity(0.25);
  //   }
  //   else if (name == "s2_so2") {
  //     map.addLayer(layer_so22);
  //     layer_so22.setOpacity(0.25);
  //   }
  //   else if (name == "s3_so2") {
  //     map.addLayer(layer_so23);
  //     layer_so23.setOpacity(0.25);
  //   }
  //   else if (name == "s4_so2") {
  //     map.addLayer(layer_so24);
  //     layer_so24.setOpacity(0.25);
  //   }
  //   else if (name == "s1_no2") {
  //     map.addLayer(layer_no21);
  //     layer_no21.setOpacity(0.25);
  //   }
  //   else if (name == "s2_no2") {
  //     map.addLayer(layer_no22);
  //     layer_no22.setOpacity(0.25);
  //   }
  //   else if (name == "s3_no2") {
  //     map.addLayer(layer_no23);
  //     layer_no23.setOpacity(0.25);
  //   }
  //   else if (name == "s4_no2") {
  //     map.addLayer(layer_no24);
  //     layer_no24.setOpacity(0.25);
  //   }
  //   else if (name == "s1_ozone") {
  //     map.addLayer(layer_ozone1);
  //     layer_ozone1.setOpacity(0.25);
  //   }
  //   else if (name == "s2_ozone") {
  //     map.addLayer(layer_ozone2);
  //     layer_ozone2.setOpacity(0.25);
  //   }
  //   else if (name == "s3_ozone") {
  //     map.addLayer(layer_ozone3);
  //     layer_ozone3.setOpacity(0.25);
  //   }
  //   else if (name == "s4_ozone") {
  //     map.addLayer(layer_ozone4);
  //     layer_ozone4.setOpacity(0.25);
  //   }
  // }
    // L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    //     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    //     maxZoom: 10,
    //     id: 'mapbox.streets',
    //     accessToken: 'pk.eyJ1IjoiY2hlbmpseSIsImEiOiJjajlmemNscGQycTU2MzNtcW51ZGJoZ2ViIn0.Gf3W96-E5bA7JX2dz56QWw',
    //     noWrap: true
    // }).addTo(map);

    d3.json("js/station_data.json", function(error, sensordata) {
        // console.log(error);
        geoJson = L.geoJson(sensordata, {
            // style -> polygon 
            style: style,
            onEachFeature: onEachFeature
            // function -> each geo-json polygon event handle
        }).addTo(map);


        var legend = L.control({position: 'bottomright'});

        // legend.onAdd = function (map) {
        //     var div = L.DomUtil.create('div', 'info legend'),
        //         grades = [0, 2, 4, 7, 10, 15, 20],
        //         labels = [];
        //     // loop through our density intervals and generate a label with a colored square for each interval
        //     for (var i = 0; i < grades.length; i++) {
        //         div.innerHTML +=
        //             '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
        //             grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        //     }

        //     // alert(div.innerHTML);
        //     return div;
        // };

        // legend.addTo(map);


        info = L.control();

        info.onAdd = function (map) {
            this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
            this.update();
            return this._div;
        };

        // method that we will use to update the control based on feature properties passed
        
        info.update = function (props) {
            if (props) {
                console.log(props.County);
                console.log(props.Latitude, props.Longitude)
                d3.select("#dash").remove();
                document.getElementById("checkboxes").style.visibility = "hidden";
                // d3.select("#dash_line").remove();
                // createLineGraph("dash", props.County, "dash_line", "js/hour_season_county.json", dash_line_w, dash_line_h, dash_line_margin, "1", "so2");
                flag = true;
            } else {
                
            } 

            // 
            // 
            this._div.innerHTML = '<h4>Pollutants in California State</h4>' +  (props ?
                ('<p>' + ' -- ' + props.County +  ' ‰' + ' -- ' +'<hr>' + 
                    "<p>" + (props.CO != 0 ? 
                        "CO: " + Math.round(props.CO * 1000, 3)  + " | " +
                        "NO2: " + Math.round(props.NO2 * 1000, 3)  + " | " +
                        "SO2: " + Math.round(props.SO2 * 1000, 3)  + " | " +
                        "Ozone: " + Math.round(props.Ozone * 1000, 3) + "</br> " +  '</p>' :'No Data' ))
                // + ' e-3 ppm' 
                : '<p>' + 'Zoom out and hover over a station!' + '</p>' );
            
            
        };

        info.addTo(map);
        
    });
}

function getColor(d) {

    return d > 20 ? '#800026' :
           d > 15 ? '#BD0026' :
           d > 10 ? '#E31A1C' :
           d > 7  ? '#FC4E2A' :
           d > 4  ? '#FD8D3C' :
           d > 2  ? '#FEB24C' :
           d > 0  ? '#FED976' :
                      '#FFFFFF';
}
////////////////////////
function style(feature) {
    return {
        fillColor: '#666',
        // getColor(feature.properties.Hydro2010),
        weight: 1,
        opacity: 1,
        // color: '#666',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
// http://www.mestudio.info/wp-content/uploads/2013/03/iconmonstr-location-12-icon.png
// https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Map_pin_icon.svg/2000px-Map_pin_icon.svg.png

function highlightFeature(e) {
    var layer = e.target;
    // console.log(e.properties.Latitude, e.properties.Latitude)
    Myicon = L.icon({iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Champi%C3%B1%C3%B3n.png',
                     iconSize: [40, 40]});
    layer.setIcon(Myicon);
    // n({
    //     weight: 3,
    //     color: '#CCFF99',
    //     // dashArray: '',
    //     fillOpacity: 0.7
    // });

    // if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    //     layer.bringToFront();
    // }
    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    // geoJson.resetStyle(e.target);
    var layer = e.target;
    Myicon = L.icon({iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Map_pin_icon.svg/2000px-Map_pin_icon.svg.png',
                     iconSize: [25, 35]});
    layer.setIcon(Myicon);
    // alert(e.target);
    info.update();
    
}

// newly added
function displayCharts(e) {
    d3.select("#dash").remove();
    document.getElementById("checkboxes").style.visibility = "hidden";
    var layer = e.target;
    var props = layer.feature.properties;
    if (props) {
        console.log(props.County);
        console.log(props.Latitude, props.Longitude);
        // d3.select("#dash_line").remove();
        pollu = buttonmapping[lastClicked][0];
        seas = buttonmapping[lastClicked][1];
        d3.select("#dash_no2_dashboard").property("checked", false);
        d3.select("#dash_so2_dashboard").property("checked", false);
        d3.select("#dash_co_dashboard").property("checked", false);
        d3.select("#dash_ozone_dashboard").property("checked", false);
        d3.select("#dash_" + pollu + "_dashboard").property("checked", true);
        document.getElementById("checkboxes").style.visibility = "visible";
        createLineGraph("dash", props.County, "dash_line", "js/hour_season_county.json", dash_line_w, dash_line_h, dash_line_margin, seas, pollu);
        flag = true;
    } else {
        
    } 

}

function onEachFeature(feature, layer) {
    // polygon, layer -> base map -> addtomap
    layer.on({
        // click 
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: displayCharts
    });
}
