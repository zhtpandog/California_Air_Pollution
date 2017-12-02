var info;
var geoJson;
var lastClicked;
var buttonmapping = {"co_y": ["co", "y"], "co_1": ["co", "1"], "co_2": ["co", "2"], "co_3": ["co", "3"], "co_4": ["co", "4"], 
                        "no2_y": ["no2", "y"], "no2_1": ["no2", "1"], "no2_2": ["no2", "1"], "no2_3": ["no2", "3"], "no2_4": ["no2", "4"], 
                        "so2_y": ["so2", "y"], "so2_1": ["so2", "1"], "so2_2": ["so2", "1"], "so2_3": ["so2", "3"], "so2_4": ["so2", "4"], 
                        "oz_y": ["ozone", "y"], "oz_1": ["ozone", "1"], "oz_2": ["ozone", "1"], "oz_3": ["ozone", "3"], "oz_4": ["ozone", "4"], }

window.onload = function() {
    // var map = L.map('mapid').setView([34.0522, -118.2437], 10);
    document.getElementById("bar_buttons").style.visibility = "hidden";
    document.getElementById("checkboxes").style.visibility = "hidden";
    // mycolor = d3.rgb("#FFFAF0");
    // d3.select("body").style("background-color", mycolor) 
    var map = L.map('mapid', {maxBounds:[[27, -124], [45, -115]], maxZoom:8, minZoom:6}).setView([37.5, -121], 7);
    
    // 37.3382° N, 121.8863° 
    layer_group = [];
    current_layer = null;
    var p1 = L.point(3, -150), p2 = L.point(60, -100);
    bounds = L.bounds(p1, p2);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        minZoom: 5,
        maxZoom: 7,
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
  });

//ozone
  var layer_ozone = L.esri.tiledMapLayer({
    url: "https://tiles.arcgis.com/tiles/ZIL9uO234SBBPGL7/arcgis/rest/services/ozone_avg_2016/MapServer",
    opacity: 0.0
  });

//SO2
  var layer_so2 = L.esri.tiledMapLayer({
    url: "https://tiles.arcgis.com/tiles/ZIL9uO234SBBPGL7/arcgis/rest/services/so2_2016_2/MapServer",
    opacity: 0.0
  });

//no2
  var layer_no2 = L.esri.tiledMapLayer({
    url: "https://tiles.arcgis.com/tiles/ZIL9uO234SBBPGL7/arcgis/rest/services/no2_avg_2016/MapServer",
    opacity: 0.0
  });


//Co season1 
  var layer_co1 = L.esri.tiledMapLayer({
    url: "https://tiles.arcgis.com/tiles/ZIL9uO234SBBPGL7/arcgis/rest/services/co_spring/MapServer",
    opacity: 0.0
  });

//Co season2
  var layer_co2 = L.esri.tiledMapLayer({
    url: "https://tiles.arcgis.com/tiles/ZIL9uO234SBBPGL7/arcgis/rest/services/co_summer/MapServer",
    opacity: 0.0
  });

//Co season3
  var layer_co3 = L.esri.tiledMapLayer({
    url: "https://tiles.arcgis.com/tiles/ZIL9uO234SBBPGL7/arcgis/rest/services/co_fall/MapServer",
    opacity: 0.0
  });

//Co season4
  var layer_co4 = L.esri.tiledMapLayer({
    url: "https://tiles.arcgis.com/tiles/ZIL9uO234SBBPGL7/arcgis/rest/services/co_winter/MapServer",
    opacity: 0.0
  });

//NO2 season1
var layer_no21 = L.esri.tiledMapLayer({
    url: "https://tiles.arcgis.com/tiles/ZIL9uO234SBBPGL7/arcgis/rest/services/no2_spring/MapServer",
    opacity: 0.0
  });

//NO2 season2
var layer_no22 = L.esri.tiledMapLayer({
    url: "https://tiles.arcgis.com/tiles/ZIL9uO234SBBPGL7/arcgis/rest/services/no2_summer/MapServer",
    opacity: 0.0
  });

//NO2 season3
var layer_no23 = L.esri.tiledMapLayer({
    url: "https://tiles.arcgis.com/tiles/ZIL9uO234SBBPGL7/arcgis/rest/services/no2_fall/MapServer",
    opacity: 0.0
  });

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
  });

//So2 season2
var layer_so22 = L.esri.tiledMapLayer({
    url: "https://tiles.arcgis.com/tiles/ZIL9uO234SBBPGL7/arcgis/rest/services/sum_so2/MapServer",
    opacity: 0.0
  });

// So2 season3
var layer_so23 = L.esri.tiledMapLayer({
    url: "https://services1.arcgis.com/ZIL9uO234SBBPGL7/arcgis/rest/services/no2_2016/MapServer",
    opacity: 0.0
  });

//So2 season4
var layer_so24 = L.esri.tiledMapLayer({
    url: "https://services1.arcgis.com/ZIL9uO234SBBPGL7/arcgis/rest/services/no2_2016/MapServer",
    opacity: 0.0
  });

//Ozone season1
var layer_ozone1 = L.esri.tiledMapLayer({
    url: "https://tiles.arcgis.com/tiles/ZIL9uO234SBBPGL7/arcgis/rest/services/sp_ozone/MapServer",
    opacity: 0.0
  }); 

//Ozone season2
var layer_ozone2 = L.esri.tiledMapLayer({
    url: "https://tiles.arcgis.com/tiles/ZIL9uO234SBBPGL7/arcgis/rest/services/sum_ozone/MapServer",
    opacity: 0.0
  }); 

//Ozone season3
var layer_ozone3 = L.esri.tiledMapLayer({
    url: "https://tiles.arcgis.com/tiles/ZIL9uO234SBBPGL7/arcgis/rest/services/aut_ozone/MapServer",
    opacity: 0.0
  });

//Ozone season4
var layer_ozone4 = L.esri.tiledMapLayer({
    url: "https://tiles.arcgis.com/tiles/ZIL9uO234SBBPGL7/arcgis/rest/services/win_ozone/MapServer",
    opacity: 0.0
  });


 var co_y = document.getElementById('co_y');
 co_y.addEventListener('click', e => {
    lastClicked = "co_y";
    if (current_layer != null) {
      map.removeLayer(current_layer);
      if (document.getElementById("intro") != null) {
        document.getElementById("intro").remove();
      }
      // d3.select("#intro").remove();
      
    }
    map.addLayer(layer_co);
    layer_co.setOpacity(0.45);
    current_layer = layer_co;
    })

var co_1 = document.getElementById('co_1');
 co_1.addEventListener('click', e => {
    lastClicked = "co_1";
    if (current_layer != null) {
      map.removeLayer(current_layer);
      if (document.getElementById("intro") != null) {
        if (document.getElementById("intro") != null) {
        document.getElementById("intro").remove();
      }
      }
      // d3.select("#intro").remove();
      
    }
    map.addLayer(layer_co1);
    layer_co1.setOpacity(0.45);
    current_layer = layer_co1;
   
    })

var co_2 = document.getElementById('co_2');
 co_2.addEventListener('click', e => {
    lastClicked = "co_2";
    if (current_layer != null) {
      map.removeLayer(current_layer);
      if (document.getElementById("intro") != null) {
        document.getElementById("intro").remove();
      }
      // d3.select("#intro").remove();
      
    }
    map.addLayer(layer_co2);
    layer_co2.setOpacity(0.45);
    current_layer = layer_co2;
   
    })

var co_3 = document.getElementById('co_3');
 co_3.addEventListener('click', e => {
    lastClicked = "co_3";
    if (current_layer != null) {
      map.removeLayer(current_layer);
      if (document.getElementById("intro") != null) {
        document.getElementById("intro").remove();
      }
      // d3.select("#intro").remove();
      
    }
    map.addLayer(layer_co3);
    layer_co3.setOpacity(0.45);
    current_layer = layer_co3;
   
    })

var co_4 = document.getElementById('co_4');
 co_4.addEventListener('click', e => {
    lastClicked = "co_4";
    if (current_layer != null) {
      map.removeLayer(current_layer);
      if (document.getElementById("intro") != null) {
        document.getElementById("intro").remove();
      }
      // d3.select("#intro").remove();
      
    }
    map.addLayer(layer_co4);
    layer_co4.setOpacity(0.45);
    current_layer = layer_co4;
   
    })

var so2_y = document.getElementById('so2_y');
 so2_y.addEventListener('click', e => {
    lastClicked = "so2_y";
    if (current_layer != null) {
      map.removeLayer(current_layer);
      if (document.getElementById("intro") != null) {
        document.getElementById("intro").remove();
      }
      // d3.select("#intro").remove();
      
    }
    map.addLayer(layer_so2);
    layer_so2.setOpacity(0.45);
    current_layer = layer_so2;
   
    })

var so2_1 = document.getElementById('so2_1');
 so2_1.addEventListener('click', e => {
    lastClicked = "so2_1";
    if (current_layer != null) {
      map.removeLayer(current_layer);
      if (document.getElementById("intro") != null) {
        document.getElementById("intro").remove();
      }
      // d3.select("#intro").remove();
      
    }
    map.addLayer(layer_so21);
    layer_so21.setOpacity(0.45);
     current_layer = layer_so21;
    })

var so2_2 = document.getElementById('so2_2');
 so2_2.addEventListener('click', e => {
    lastClicked = "so2_2";
    if (current_layer != null) {
      map.removeLayer(current_layer);
      if (document.getElementById("intro") != null) {
        document.getElementById("intro").remove();
      }
      // d3.select("#intro").remove();
      
    }
    map.addLayer(layer_so22);
    layer_so22.setOpacity(0.45);
    current_layer = layer_so22;
    })

var so2_3 = document.getElementById('so2_3');
 so2_3.addEventListener('click', e => {
    lastClicked = "so2_3";
    if (current_layer != null) {
      map.removeLayer(current_layer);
      if (document.getElementById("intro") != null) {
        document.getElementById("intro").remove();
      }
      // d3.select("#intro").remove();
      
    }
    map.addLayer(layer_so23);
    layer_so23.setOpacity(0.45);
    current_layer = layer_so23;
    })

var so2_4 = document.getElementById('so2_4');
 so2_4.addEventListener('click', e => {
    lastClicked = "so2_4";
    if (current_layer != null) {
      map.removeLayer(current_layer);
      if (document.getElementById("intro") != null) {
        document.getElementById("intro").remove();
      }
      // d3.select("#intro").remove();
      
    }
    map.addLayer(layer_so24);
    layer_so24.setOpacity(0.45);
    current_layer = layer_so24;
    })

 var no2_y = document.getElementById('no2_y');
 no2_y.addEventListener('click', e => {
    lastClicked = "no2_y";
    if (current_layer != null) {
      map.removeLayer(current_layer);
      if (document.getElementById("intro") != null) {
        document.getElementById("intro").remove();
      }
      // d3.select("#intro").remove();
      
    }
    map.addLayer(layer_no2);
    layer_no2.setOpacity(0.45);
    current_layer = layer_no2;
    })

 var no2_1 = document.getElementById('no2_1');
 no2_1.addEventListener('click', e => {
    lastClicked = "no2_1";
    if (current_layer != null) {
      map.removeLayer(current_layer);
      if (document.getElementById("intro") != null) {
        document.getElementById("intro").remove();
      }
      // d3.select("#intro").remove();
      
    }
    map.addLayer(layer_no21);
    layer_no21.setOpacity(0.45);
    current_layer = layer_no21;
    })

var no2_2 = document.getElementById('no2_2');
 no2_2.addEventListener('click', e => {
    lastClicked = "no2_2";
    if (current_layer != null) {
      map.removeLayer(current_layer);
      if (document.getElementById("intro") != null) {
        document.getElementById("intro").remove();
      }
      // d3.select("#intro").remove();
      
    }
    map.addLayer(layer_no22);
    layer_no22.setOpacity(0.45);
    current_layer = layer_no22;
    })

var no2_3 = document.getElementById('no2_3');
 no2_3.addEventListener('click', e => {
    lastClicked = "no2_3";
    if (current_layer != null) {
      map.removeLayer(current_layer);
      if (document.getElementById("intro") != null) {
        document.getElementById("intro").remove();
      }
      // d3.select("#intro").remove();
      
    }
    map.addLayer(layer_no23);
    layer_no23.setOpacity(0.45);
    current_layer = layer_no23;
    })


var no2_4 = document.getElementById('no2_4');
 no2_4.addEventListener('click', e => {
    lastClicked = "no2_4";
    if (current_layer != null) {
      map.removeLayer(current_layer);
      if (document.getElementById("intro") != null) {
        document.getElementById("intro").remove();
      }
      // d3.select("#intro").remove();
      
    }
    map.addLayer(layer_no24);
    layer_no24.setOpacity(0.45);
    current_layer = layer_no24;
    })

var oz_y = document.getElementById('oz_y');
 oz_y.addEventListener('click', e => {
    lastClicked = "oz_y";
    if (current_layer != null) {
      map.removeLayer(current_layer);
      if (document.getElementById("intro") != null) {
        document.getElementById("intro").remove();
      }
      // d3.select("#intro").remove();
      
    }
    map.addLayer(layer_ozone);
    layer_ozone.setOpacity(0.45);
    current_layer = layer_ozone;
    })

var oz_1 = document.getElementById('oz_1');
 oz_1.addEventListener('click', e => {
    lastClicked = "oz_1";
    if (current_layer != null) {
      map.removeLayer(current_layer);
      if (document.getElementById("intro") != null) {
        document.getElementById("intro").remove();
      }
      // d3.select("#intro").remove();
      
    }
    map.addLayer(layer_ozone1);
    layer_ozone1.setOpacity(0.45);
    current_layer = layer_ozone1;

    })

var oz_2 = document.getElementById('oz_2');
 oz_2.addEventListener('click', e => {
    lastClicked = "oz_2";
    if (current_layer != null) {
      map.removeLayer(current_layer);
      if (document.getElementById("intro") != null) {
        document.getElementById("intro").remove();
      }
      // d3.select("#intro").remove();
      
    }
    map.addLayer(layer_ozone2);
    layer_ozone2.setOpacity(0.45);
   current_layer = layer_ozone2;
    })

var oz_3 = document.getElementById('oz_3');
 oz_3.addEventListener('click', e => {
    lastClicked = "oz_3";
    if (current_layer != null) {
      map.removeLayer(current_layer);
      if (document.getElementById("intro") != null) {
        document.getElementById("intro").remove();
      }
      d3.getElementById("#intro").remove();
      
    }
    map.addLayer(layer_ozone3);
    layer_ozone3.setOpacity(0.45);
   current_layer = layer_ozone3;
    })

var oz_4 = document.getElementById('oz_4');
 oz_4.addEventListener('click', e => {
    lastClicked = "oz_4";
    if (current_layer != null) {
      map.removeLayer(current_layer);
      if (document.getElementById("intro") != null) {
        document.getElementById("intro").remove();
      }
      d3.getElementById("#intro").remove();
      
    }
    map.addLayer(layer_ozone4);
    layer_ozone4.setOpacity(0.45);
   current_layer = layer_ozone4;
    })

function update_layer(layer) {
  old_layer = layer_group.pop();

}

  // function visibility(name) {
  //   for (var i = 0; i < layer_group.length; i++) {
  //     map.removeLayer(layer_group[i]);
  //   }
  //   if (name == "no2") {
  //     map.addLayer(layer_no2);
  //     layer.setOpacity(0.45);
  //   } 

  //   else if (name == "co") {
  //     map.addLayer(layer_co);
  //     layer_co.setOpacity(0.45);
  //   }
  //   else if (name == "so2") {
  //     map.addLayer(layer_so2);
  //     layer_so2.setOpacity(0.45);
  //   }
  //   else if (name == "ozone") {
  //     map.addLayer(layer_ozone);
  //     layer_ozone.setOpacity(0.45);
  //   }
  //   else if (name == "s1_co") {
  //     map.addLayer(layer_co1);
  //     layer_co1.setOpacity(0.45);
  //   }
  //   else if (name == "s2_co") {
  //     map.addLayer(layer_co2);
  //     layer_co2.setOpacity(0.45);
  //   }
  //   else if (name == "s3_co") {
  //     map.addLayer(layer_co3);
  //     layer_co3.setOpacity(0.45);
  //   }
  //   else if (name == "s4_co") {
  //     map.addLayer(layer_co4);
  //     layer_co4.setOpacity(0.45);
  //   }
  //   else if (name == "s1_so2") {
  //     map.addLayer(layer_so21);
  //     layer_so21.setOpacity(0.45);
  //   }
  //   else if (name == "s2_so2") {
  //     map.addLayer(layer_so22);
  //     layer_so22.setOpacity(0.45);
  //   }
  //   else if (name == "s3_so2") {
  //     map.addLayer(layer_so23);
  //     layer_so23.setOpacity(0.45);
  //   }
  //   else if (name == "s4_so2") {
  //     map.addLayer(layer_so24);
  //     layer_so24.setOpacity(0.45);
  //   }
  //   else if (name == "s1_no2") {
  //     map.addLayer(layer_no21);
  //     layer_no21.setOpacity(0.45);
  //   }
  //   else if (name == "s2_no2") {
  //     map.addLayer(layer_no22);
  //     layer_no22.setOpacity(0.45);
  //   }
  //   else if (name == "s3_no2") {
  //     map.addLayer(layer_no23);
  //     layer_no23.setOpacity(0.45);
  //   }
  //   else if (name == "s4_no2") {
  //     map.addLayer(layer_no24);
  //     layer_no24.setOpacity(0.45);
  //   }
  //   else if (name == "s1_ozone") {
  //     map.addLayer(layer_ozone1);
  //     layer_ozone1.setOpacity(0.45);
  //   }
  //   else if (name == "s2_ozone") {
  //     map.addLayer(layer_ozone2);
  //     layer_ozone2.setOpacity(0.45);
  //   }
  //   else if (name == "s3_ozone") {
  //     map.addLayer(layer_ozone3);
  //     layer_ozone3.setOpacity(0.45);
  //   }
  //   else if (name == "s4_ozone") {
  //     map.addLayer(layer_ozone4);
  //     layer_ozone4.setOpacity(0.45);
  //   }
  // }
    // L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    //     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    //     maxZoom: 10,
    //     id: 'mapbox.streets',
    //     accessToken: 'pk.eyJ1IjoiY2hlbmpseSIsImEiOiJjajlmemNscGQycTU2MzNtcW51ZGJoZ2ViIn0.Gf3W96-E5bA7JX2dz56QWw',
    //     noWrap: true
    // }).addTo(map);

    // console.log(d3.select("#dash_pie").attr("width"))

    // var color = {CO:"#bdbdbd", Ozone:"#9ecae1", NO2:"#bcbddc", SO2:"#fa9fb5"};

    
    // function piechart(county, season){

    //     var svg = d3.select("#dash_pie").attr("id", "piechart_pppj");

    //     var width = +svg.attr("width"),
    //         height = +svg.attr("height"),
    //         radius = Math.min(width, height) / 2 - 15,
    //         g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    //         var pie = d3.pie()
    //             .sort(null)
    //             .value(function(d) { 
    //                 return d[county][season]
    //             });
                
    //         var path = d3.arc()
    //             .outerRadius(radius - 10)
    //             .innerRadius(0);

    //     d3.json("js/dataofPie.json", function(error, data) {
    //       if (error) throw error;

    //         var arc = g.selectAll(".arc")
    //             .data(pie(data))
    //             .enter().append("g")
    //             .attr("class", "arc");

    //         arc.append("path")
    //             .attr("d", path)
    //             .attr("fill", function(d) { return color[d.data.pollutant]; });
            

    // console.log(pie(data))

    //         var legend = svg.selectAll(".legend")
    //             .data(pie(data))
    //             .enter().append("g")
    //             .attr("class", "legend")
    //             .attr("transform", function(d, i) { return "translate(10," + i * 25 + ")"; });

    //         legend.append("rect")
    //             .attr("x", width - 180)
    //             .attr("y", 10)
    //             .attr("width", 18)
    //             .attr("height", 18)
    //             .style("fill", function (d) {
    //                 return color[d.data.pollutant]});

    //         // draw legend text
    //         legend.append("text")
    //             .attr("x", width - 150)
    //             .attr("y", 20)
    //             .attr("dy", ".35em")
    //             .style("text-anchor", "start")
    //             .text(function(d) { return d.data.pollutant;});

    //     });
    // }

    // var county = "Los Angeles";
    // var season = "4";
    
    // piechart(county, season)

    d3.json("js/station_data.json", function(error, sensordata) {
        // console.log(error);
        geoJson = L.geoJson(sensordata, {
            // style -> polygon 
            style: style,
            onEachFeature: onEachFeature
            // function -> each geo-json polygon event handle
        }).addTo(map);

        

        var legend = L.control({position: 'bottomleft'});
        legend.onAdd = function (map) {
            var div = L.DomUtil.create('div', 'info legend'),
                grades = [0, 2, 4, 7, 10, 15, 20],
                labels = [];
                div.innerHTML += "<img src = '../legend/co_fall.png' alt='co_fall' height='80' width='160' >";
            // loop through our density intervals and generate a label with a colored square for each interval
            // for (var i = 0; i < grades.length; i++) {
            //     div.innerHTML +=
            //         '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            //         grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
            // }

            // alert(div.innerHTML);
            return div;
        };

        legend.addTo(map);


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
                d3.select("#bar_svg").remove();
                d3.select("#piechart_pppj").remove();
                document.getElementById("checkboxes").style.visibility = "hidden";
                document.getElementById("bar_buttons").style.visibility = "hidden";
                
                // d3.select("#dash_line").remove();
                // createLineGraph("dash", props.County, "dash_line", "js/hour_season_county.json", dash_line_w, dash_line_h, dash_line_margin, "1", "so2");
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
                     iconSize: [40, 40], iconAnchor: [22, 40]});
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
                     iconAnchor: [17, 40], iconSize: [25, 40]});
    layer.setIcon(Myicon);
    // alert(e.target);
    info.update();
    
}

// newly added
function displayCharts(e) {
    if (document.getElementById("intro") != null) {
        document.getElementById("intro").remove();
      }
    d3.select("#dash").remove();
    d3.select("#bar_svg").remove();
    d3.select("#piechart_pppj").remove();
    document.getElementById("checkboxes").style.visibility = "hidden";
    document.getElementById("bar_buttons").style.visibility = "hidden";
    var layer = e.target;
    var props = layer.feature.properties;
    if (props) {
        console.log(props.County);
        console.log(props.Latitude, props.Longitude);
        // d3.select("#dash_line").remove();
        pollu = buttonmapping[lastClicked][0];
        seas = buttonmapping[lastClicked][1];
        county_name = props.County;
        d3.select("#dash_no2_dashboard").property("checked", false);
        d3.select("#dash_so2_dashboard").property("checked", false);
        d3.select("#dash_co_dashboard").property("checked", false);
        d3.select("#dash_ozone_dashboard").property("checked", false);
        d3.select("#dash_" + pollu + "_dashboard").property("checked", true);

        document.getElementById("checkboxes").style.visibility = "visible";
        document.getElementById("bar_buttons").style.visibility = "visible";
        createLineGraph("dash", county_name, "dash_line", "js/hour_season_county.json", dash_line_w, dash_line_h, dash_line_margin, seas, pollu);
        createBarChart("js/" + county_name + ".csv");
        piechart(county_name, seas);
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

var color = {CO:"#bdbdbd", Ozone:"#9ecae1", NO2:"#bcbddc", SO2:"#fa9fb5"};

    
function piechart(county, season){

    // var svg = d3.select("#dash_pie").attr("id", "piechart_pppj");
    // svg = d3.select("#dash_bar")
    //                   .append("svg")
    //                   .attr("id", "bar_svg")
    //                   .attr("width", svgw)
    //                   .attr("height", svgh)
    width = 720;
    height = 300;
    var svg = d3.select("#dash_pie").append("svg").attr("id", "piechart_pppj").attr("width", width).attr("height", height);

    // var width = +svg.attr("width"),
    //     height = +svg.attr("height"),
        var radius = Math.min(width, height) / 2 - 15,
        g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var pie = d3.pie()
            .sort(null)
            .value(function(d) { 
                return d[county][season]
            });
            
        var path = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

    d3.json("js/dataofPie.json", function(error, data) {
      if (error) throw error;

        var arc = g.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc");

        arc.append("path")
            .attr("d", path)
            .attr("fill", function(d) { return color[d.data.pollutant]; });
        

console.log(pie(data))

        var legend = svg.selectAll(".legend")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { return "translate(10," + i * 25 + ")"; });

        legend.append("rect")
            .attr("x", width - 180)
            .attr("y", 10)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", function (d) {
                return color[d.data.pollutant]});

        // draw legend text
        legend.append("text")
            .attr("x", width - 150)
            .attr("y", 20)
            .attr("dy", ".35em")
            .style("text-anchor", "start")
            .text(function(d) { return d.data.pollutant;});

    });
}


function createBarChart(dataSource) {
 
      // "avg_county.csv"

    d3.csv(dataSource, function (dataset) {
              var svgh = 800
              var svgw = 1000

              co_check = true
              no2_check = true
              o3_check = true
              so2_check = true

              co_max = d3.max(dataset.filter(function(d) {
                return d.Pollutant === "CO"}), function (d) {
                return d.Sample
              })
              no2_max = d3.max(dataset.filter(function(d) {
                return d.Pollutant === "NO2"}), function (d) {
                return d.Sample
              })
              o3_max = d3.max(dataset.filter(function(d) {
                return d.Pollutant === "Ozone"}), function (d) {
                return d.Sample
              })
              so2_max = d3.max(dataset.filter(function(d) {
                return d.Pollutant === "SO2"}), function (d) {
                return d.Sample
              })

              co_scale = d3.scaleLinear()
                            .domain([0,co_max])
                            .range([0,svgw-150])
              no2_scale = d3.scaleLinear()
                            .domain([0,no2_max])
                            .range([0,svgw-150])
              o3_scale = d3.scaleLinear()
                            .domain([0,o3_max])
                            .range([0,svgw-150])
              so2_scale = d3.scaleLinear()
                            .domain([0,so2_max])
                            .range([0,svgw-150])

              // #section3
              svg = d3.select("#dash_bar")
                      .append("svg")
                      .attr("id", "bar_svg")
                      .attr("width", svgw)
                      .attr("height", svgh)

              svg.selectAll("apple")
                  .data(dataset)
                  .enter()
                  .filter(function(d) {
                    return d.Pollutant === "CO"
                  })
                  .append("text")
                  .text(function (d) {
                    return d.County
                  })
                  .attr("x", 20)
                  .attr("y", function (d,i) {
                    return svgh/14*i +25
                  })
                  .attr("font-weight", "bold")

              svg.selectAll("apple")
                  .data(dataset)
                  .enter()
                  .filter(function (d) {
                    return d.Pollutant === "CO"
                  })
                  .append("rect")
                  .attr("class", "co_bar co_col")
                  .attr("y", function (d,i) {
                    return svgh/14 *i 
                  })
                  .attr("x", 150)
                  .attr("height", svgh/14/4 - 3)
                  .attr("width", function (d) {
                    return o3_scale(d.Sample)
                  })

              svg.selectAll("apple")
                  .data(dataset)
                  .enter()
                  .filter(function (d) {
                    return d.Pollutant === "NO2"
                  })
                  .append("rect")
                  .attr("class", "no2_bar no2_col")
                  .attr("y", function (d,i) {
                    return svgh/14*i + svgh/14/4 - 3
                  })
                  .attr("x", 150)
                  .attr("height", svgh/14/4 - 3)
                  .attr("width", function (d) {
                    return o3_scale(d.Sample)
                  })

              svg.selectAll("apple")
                  .data(dataset)
                  .enter()
                  .filter(function (d) {
                    return d.Pollutant === "Ozone"
                  })
                  .append("rect")
                  .attr("class", "o3_bar o3_col")
                  .attr("y", function (d,i) {
                    return svgh/14*i + svgh/14/2 - 6
                  })
                  .attr("x", 150)
                  .attr("height", svgh/14/4 - 3)
                  .attr("width", function (d) {
                    return o3_scale(d.Sample)
                  })

              svg.selectAll("apple")
                  .data(dataset)
                  .enter()
                  .filter(function (d) {
                    return d.Pollutant === "SO2"
                  })
                  .append("rect")
                  .attr("class", "so2_bar so2_col")
                  .attr("y", function (d,i) {
                    return svgh/14*i + svgh/14/4*3 - 9
                  })
                  .attr("x", 150)
                  .attr("height", svgh/14/4 - 3)
                  .attr("width", function (d) {
                    return o3_scale(d.Sample)
                  })

              d3.select("#co_on")
                  .on("click", function (d) {
                    co_check = false

                    d3.selectAll("#co_on")
                      .attr("height", 0)

                    d3.selectAll("#co_off")
                      .attr("height", 20) 

                    d3.selectAll(".co_bar")
                      .transition()
                      .duration(1000)
                      .attr("height", 0)

                    if(no2_check + o3_check + so2_check == 3) {
                      d3.selectAll(".no2_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/3-4)
                        .attr("y", function (d,i) {
                          return svgh/14*i
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })

                      d3.selectAll(".o3_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/3-4)
                        .attr("y", function (d,i) {
                          return svgh/14*i + (svgh/14/3 - 4)*1
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })

                      d3.selectAll(".so2_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/3-4)
                        .attr("y", function (d,i) {
                          return svgh/14*i + (svgh/14/3 - 4)*2
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })
                      }

                    if(no2_check + o3_check + so2_check == 2) {
                      if (no2_check ==  0) {
                        d3.selectAll(".o3_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/2-7)
                          .attr("y", function (d,i) {
                            return svgh/14*i 
                          })
                          .attr("width", function (d) {
                            return o3_scale(d.Sample)
                          })

                        d3.selectAll(".so2_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/2-7)
                          .attr("y", function (d,i) {
                            return svgh/14*i + (svgh/14/2 - 7)
                          })
                          .attr("width", function (d) {
                            return o3_scale(d.Sample)
                          })
                        } else {
                          if (o3_check == 0) {
                            d3.selectAll(".no2_bar")
                              .transition()
                              .duration(1000)
                              .attr("height", svgh/14/2-7)
                              .attr("y", function (d,i) {
                                return svgh/14*i
                              })
                              .attr("width", function (d) {
                                return no2_scale(d.Sample)
                              })

                            d3.selectAll(".so2_bar")
                              .transition()
                              .duration(1000)
                              .attr("height", svgh/14/2-7)
                              .attr("y", function (d,i) {
                                return svgh/14*i + (svgh/14/2 - 7)
                              })
                              .attr("width", function (d) {
                                return no2_scale(d.Sample)
                              }) 
                            } else {
                              d3.selectAll(".no2_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/2-7)
                                .attr("y", function (d,i) {
                                  return svgh/14*i
                                })
                                .attr("width", function (d) {
                                  return o3_scale(d.Sample)
                                })

                              d3.selectAll(".o3_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/2-7)
                                .attr("y", function (d,i) {
                                  return svgh/14*i + (svgh/14/2 - 7)
                                })
                                .attr("width", function (d) {
                                  return o3_scale(d.Sample)
                                })
                            }
                        }
                      }

                      if(no2_check + o3_check + so2_check == 1) {
                        if (no2_check ==  1) {
                          d3.selectAll(".no2_bar")
                            .transition()
                            .duration(1000)
                            .attr("height", svgh/14/1-12)
                            .attr("y", function (d,i) {
                              return svgh/14*i
                            })
                            .attr("width", function (d) {
                                return no2_scale(d.Sample)
                            })
                          } else {
                            if (o3_check == 1) {
                              d3.selectAll(".o3_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/1-12)
                                .attr("y", function (d,i) {
                                  return svgh/14*i 
                                })
                                .attr("width", function (d) {
                                  return o3_scale(d.Sample)
                                })
                              } else {
                                d3.selectAll(".so2_bar")
                                  .transition()
                                  .duration(1000)
                                  .attr("height", svgh/14/1-12)
                                  .attr("y", function (d,i) {
                                    return svgh/14*i
                                  })
                                  .attr("width", function (d) {
                                    return so2_scale(d.Sample)
                                  })
                              }
                          }
                        }
                  })

              d3.select("#co_off")
                  .on("click", function (d) {
                    co_check = true

                    d3.selectAll("#co_off")
                      .attr("height", 0)

                    d3.selectAll("#co_on")
                      .attr("height", 20) 

                    if(no2_check + o3_check + so2_check == 3) {
                      d3.selectAll(".co_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/4-3)
                        .attr("y", function (d,i) {
                          return svgh/14*i
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })

                      d3.selectAll(".no2_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/4-3)
                        .attr("y", function (d,i) {
                          return svgh/14*i + (svgh/14/4 - 3)
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })

                      d3.selectAll(".o3_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/4-3)
                        .attr("y", function (d,i) {
                          return svgh/14*i + (svgh/14/4 - 3)*2
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })

                      d3.selectAll(".so2_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/4-3)
                        .attr("y", function (d,i) {
                          return svgh/14*i + (svgh/14/4 - 3)*3
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })
                    }

                    if(no2_check + o3_check + so2_check == 2) {
                      if (no2_check ==  0) {
                        d3.selectAll(".co_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/3-4)
                          .attr("y", function (d,i) {
                            return svgh/14*i
                          })
                          .attr("width", function (d) {
                            return o3_scale(d.Sample)
                          })

                        d3.selectAll(".o3_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/3-4)
                          .attr("y", function (d,i) {
                            return svgh/14*i + (svgh/14/3 - 4)*1
                          })
                          .attr("width", function (d) {
                            return o3_scale(d.Sample)
                          })

                        d3.selectAll(".so2_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/3-4)
                          .attr("y", function (d,i) {
                            return svgh/14*i + (svgh/14/3 - 4)*2
                          })
                          .attr("width", function (d) {
                            return o3_scale(d.Sample)
                          })
                        } else {
                          if (o3_check == 0) {
                            d3.selectAll(".co_bar")
                              .transition()
                              .duration(1000)
                              .attr("height", svgh/14/3-4)
                              .attr("y", function (d,i) {
                                return svgh/14*i
                              })
                              .attr("width", function (d) {
                                return no2_scale(d.Sample)
                              })

                            d3.selectAll(".no2_bar")
                              .transition()
                              .duration(1000)
                              .attr("height", svgh/14/3-4)
                              .attr("y", function (d,i) {
                                return svgh/14*i + (svgh/14/3 - 4)*1
                              })
                              .attr("width", function (d) {
                                return no2_scale(d.Sample)
                              })

                            d3.selectAll(".so2_bar")
                              .transition()
                              .duration(1000)
                              .attr("height", svgh/14/3-4)
                              .attr("y", function (d,i) {
                                return svgh/14*i + (svgh/14/3 - 4)*2
                              })
                              .attr("width", function (d) {
                                return no2_scale(d.Sample)
                              })
                            } else {
                              d3.selectAll(".co_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/3-4)
                                .attr("y", function (d,i) {
                                  return svgh/14*i
                                })
                                .attr("width", function (d) {
                                  return o3_scale(d.Sample)
                                })

                              d3.selectAll(".no2_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/3-4)
                                .attr("y", function (d,i) {
                                  return svgh/14*i + (svgh/14/3 - 4)*1
                                })
                                .attr("width", function (d) {
                                  return o3_scale(d.Sample)
                                })

                              d3.selectAll(".o3_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/3-4)
                                .attr("y", function (d,i) {
                                  return svgh/14*i + (svgh/14/3 - 4)*2
                                })
                                .attr("width", function (d) {
                                  return o3_scale(d.Sample)
                                })
                            }
                        }
                      }

                      if(no2_check + o3_check + so2_check == 1) {
                        if (no2_check ==  1) {
                          d3.selectAll(".co_bar")
                            .transition()
                            .duration(1000)
                            .attr("height", svgh/14/2-7)
                            .attr("y", function (d,i) {
                              return svgh/14*i 
                            })
                            .attr("width", function (d) {
                              return no2_scale(d.Sample)
                            })

                          d3.selectAll(".no2_bar")
                            .transition()
                            .duration(1000)
                            .attr("height", svgh/14/2-7)
                            .attr("y", function (d,i) {
                              return svgh/14*i + (svgh/14/2 - 7)
                            }) 
                            .attr("width", function (d) {
                              return no2_scale(d.Sample)
                            })
                          } else {
                            if (o3_check == 1) {
                              d3.selectAll(".co_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/2-7)
                                .attr("y", function (d,i) {
                                  return svgh/14*i 
                                })
                                .attr("width", function (d) {
                                  return o3_scale(d.Sample)
                                })

                              d3.selectAll(".o3_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/2-7)
                                .attr("y", function (d,i) {
                                  return svgh/14*i + (svgh/14/2 - 7)
                                })
                                .attr("width", function (d) {
                                  return o3_scale(d.Sample)
                                })
                              } else {
                                d3.selectAll(".co_bar")
                                  .transition()
                                  .duration(1000)
                                  .attr("height", svgh/14/2-7)
                                  .attr("y", function (d,i) {
                                    return svgh/14*i 
                                  })
                                  .attr("width", function (d) {
                                    return so2_scale(d.Sample)
                                  })

                                d3.selectAll(".so2_bar")
                                  .transition()
                                  .duration(1000)
                                  .attr("height", svgh/14/2-7)
                                  .attr("y", function (d,i) {
                                    return svgh/14*i + (svgh/14/2 - 7)
                                  }) 
                                  .attr("width", function (d) {
                                    return so2_scale(d.Sample)
                                  })
                              }
                          }
                      }

                      if(no2_check + o3_check + so2_check == 0) {
                        d3.selectAll(".co_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/1-12)
                          .attr("y", function (d,i) {
                            return svgh/14*i
                          })
                          .attr("width", function (d) {
                            return co_scale(d.Sample)
                          })
                      }
                  })

              d3.select("#no2_on")
                  .on("click", function (d) {
                    no2_check = false

                    d3.selectAll("#no2_on")
                      .attr("height", 0)

                    d3.selectAll("#no2_off")
                      .attr("height", 20) 

                    d3.selectAll(".no2_bar")
                      .transition()
                      .duration(1000)
                      .attr("height", 0)

                    if(co_check + o3_check + so2_check == 3) {
                      d3.selectAll(".co_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/3-4)
                        .attr("y", function (d,i) {
                          return svgh/14*i
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })

                      d3.selectAll(".o3_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/3-4)
                        .attr("y", function (d,i) {
                          return svgh/14*i + (svgh/14/3 - 4)*1
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })

                      d3.selectAll(".so2_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/3-4)
                        .attr("y", function (d,i) {
                          return svgh/14*i + (svgh/14/3 - 4)*2
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })
                      }

                    if(co_check + o3_check + so2_check == 2) {
                      if (co_check ==  0) {
                        d3.selectAll(".o3_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/2-7)
                          .attr("y", function (d,i) {
                            return svgh/14*i 
                          })
                          .attr("width", function (d) {
                            return o3_scale(d.Sample)
                          })

                        d3.selectAll(".so2_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/2-7)
                          .attr("y", function (d,i) {
                            return svgh/14*i + (svgh/14/2 - 7)
                          })
                          .attr("width", function (d) {
                            return o3_scale(d.Sample)
                          })
                        } else {
                          if (o3_check == 0) {
                            d3.selectAll(".co_bar")
                              .transition()
                              .duration(1000)
                              .attr("height", svgh/14/2-7)
                              .attr("y", function (d,i) {
                                return svgh/14*i
                              })
                              .attr("width", function (d) {
                                return so2_scale(d.Sample)
                              })

                            d3.selectAll(".so2_bar")
                              .transition()
                              .duration(1000)
                              .attr("height", svgh/14/2-7)
                              .attr("y", function (d,i) {
                                return svgh/14*i + (svgh/14/2 - 7)
                              })
                              .attr("width", function (d) {
                                return so2_scale(d.Sample)
                              }) 
                            } else {
                              d3.selectAll(".co_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/2-7)
                                .attr("y", function (d,i) {
                                  return svgh/14*i
                                })
                                .attr("width", function (d) {
                                  return o3_scale(d.Sample)
                                })

                              d3.selectAll(".o3_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/2-7)
                                .attr("y", function (d,i) {
                                  return svgh/14*i + (svgh/14/2 - 7)
                                })
                                .attr("width", function (d) {
                                  return o3_scale(d.Sample)
                                })
                            }
                        }
                      }

                      if(co_check + o3_check + so2_check == 1) {
                        if (co_check ==  1) {
                          d3.selectAll(".co_bar")
                            .transition()
                            .duration(1000)
                            .attr("height", svgh/14/1-12)
                            .attr("y", function (d,i) {
                              return svgh/14*i
                            })
                            .attr("width", function (d) {
                                return co_scale(d.Sample)
                            })
                          } else {
                            if (o3_check == 1) {
                              d3.selectAll(".o3_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/1-12)
                                .attr("y", function (d,i) {
                                  return svgh/14*i 
                                })
                                .attr("width", function (d) {
                                  return o3_scale(d.Sample)
                                })
                              } else {
                                d3.selectAll(".so2_bar")
                                  .transition()
                                  .duration(1000)
                                  .attr("height", svgh/14/1-12)
                                  .attr("y", function (d,i) {
                                    return svgh/14*i
                                  })
                                  .attr("width", function (d) {
                                    return so2_scale(d.Sample)
                                  })
                              }
                          }
                        }
                  })

              d3.select("#no2_off")
                  .on("click", function (d) {
                    no2_check = true

                    d3.selectAll("#no2_off")
                      .attr("height", 0)

                    d3.selectAll("#no2_on")
                      .attr("height", 20) 

                    if(co_check + o3_check + so2_check == 3) {
                      d3.selectAll(".co_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/4-3)
                        .attr("y", function (d,i) {
                          return svgh/14*i
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })

                      d3.selectAll(".no2_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/4-3)
                        .attr("y", function (d,i) {
                          return svgh/14*i + (svgh/14/4 - 3)
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })

                      d3.selectAll(".o3_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/4-3)
                        .attr("y", function (d,i) {
                          return svgh/14*i + (svgh/14/4 - 3)*2
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })

                      d3.selectAll(".so2_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/4-3)
                        .attr("y", function (d,i) {
                          return svgh/14*i + (svgh/14/4 - 3)*3
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })
                    }

                    if(co_check + o3_check + so2_check == 2) {
                      if (co_check ==  0) {
                        d3.selectAll(".no2_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/3-4)
                          .attr("y", function (d,i) {
                            return svgh/14*i
                          })
                          .attr("width", function (d) {
                            return o3_scale(d.Sample)
                          })

                        d3.selectAll(".o3_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/3-4)
                          .attr("y", function (d,i) {
                            return svgh/14*i + (svgh/14/3 - 4)*1
                          })
                          .attr("width", function (d) {
                            return o3_scale(d.Sample)
                          })

                        d3.selectAll(".so2_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/3-4)
                          .attr("y", function (d,i) {
                            return svgh/14*i + (svgh/14/3 - 4)*2
                          })
                          .attr("width", function (d) {
                            return o3_scale(d.Sample)
                          })
                        } else {
                          if (o3_check == 0) {
                            d3.selectAll(".co_bar")
                              .transition()
                              .duration(1000)
                              .attr("height", svgh/14/3-4)
                              .attr("y", function (d,i) {
                                return svgh/14*i
                              })
                              .attr("width", function (d) {
                                return no2_scale(d.Sample)
                              })

                            d3.selectAll(".no2_bar")
                              .transition()
                              .duration(1000)
                              .attr("height", svgh/14/3-4)
                              .attr("y", function (d,i) {
                                return svgh/14*i + (svgh/14/3 - 4)*1
                              })
                              .attr("width", function (d) {
                                return no2_scale(d.Sample)
                              })

                            d3.selectAll(".so2_bar")
                              .transition()
                              .duration(1000)
                              .attr("height", svgh/14/3-4)
                              .attr("y", function (d,i) {
                                return svgh/14*i + (svgh/14/3 - 4)*2
                              })
                              .attr("width", function (d) {
                                return no2_scale(d.Sample)
                              })
                            } else {
                              d3.selectAll(".co_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/3-4)
                                .attr("y", function (d,i) {
                                  return svgh/14*i
                                })
                                .attr("width", function (d) {
                                  return o3_scale(d.Sample)
                                })

                              d3.selectAll(".no2_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/3-4)
                                .attr("y", function (d,i) {
                                  return svgh/14*i + (svgh/14/3 - 4)*1
                                })
                                .attr("width", function (d) {
                                  return o3_scale(d.Sample)
                                })

                              d3.selectAll(".o3_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/3-4)
                                .attr("y", function (d,i) {
                                  return svgh/14*i + (svgh/14/3 - 4)*2
                                })
                                .attr("width", function (d) {
                                  return o3_scale(d.Sample)
                                })
                            }
                        }
                      }

                      if(co_check + o3_check + so2_check == 1) {
                        if (co_check ==  1) {
                          d3.selectAll(".co_bar")
                            .transition()
                            .duration(1000)
                            .attr("height", svgh/14/2-7)
                            .attr("y", function (d,i) {
                              return svgh/14*i 
                            })
                            .attr("width", function (d) {
                              return no2_scale(d.Sample)
                            })

                          d3.selectAll(".no2_bar")
                            .transition()
                            .duration(1000)
                            .attr("height", svgh/14/2-7)
                            .attr("y", function (d,i) {
                              return svgh/14*i + (svgh/14/2 - 7)
                            }) 
                            .attr("width", function (d) {
                              return no2_scale(d.Sample)
                            })
                          } else {
                            if (o3_check == 1) {
                              d3.selectAll(".no2_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/2-7)
                                .attr("y", function (d,i) {
                                  return svgh/14*i 
                                })
                                .attr("width", function (d) {
                                  return o3_scale(d.Sample)
                                })

                              d3.selectAll(".o3_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/2-7)
                                .attr("y", function (d,i) {
                                  return svgh/14*i + (svgh/14/2 - 7)
                                })
                                .attr("width", function (d) {
                                  return o3_scale(d.Sample)
                                })
                              } else {
                                d3.selectAll(".no2_bar")
                                  .transition()
                                  .duration(1000)
                                  .attr("height", svgh/14/2-7)
                                  .attr("y", function (d,i) {
                                    return svgh/14*i 
                                  })
                                  .attr("width", function (d) {
                                    return no2_scale(d.Sample)
                                  })

                                d3.selectAll(".so2_bar")
                                  .transition()
                                  .duration(1000)
                                  .attr("height", svgh/14/2-7)
                                  .attr("y", function (d,i) {
                                    return svgh/14*i + (svgh/14/2 - 7)
                                  }) 
                                  .attr("width", function (d) {
                                    return no2_scale(d.Sample)
                                  })
                              }
                          }
                      }

                      if(co_check + o3_check + so2_check == 0) {
                        d3.selectAll(".no2_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/1-12)
                          .attr("y", function (d,i) {
                            return svgh/14*i
                          })
                          .attr("width", function (d) {
                            return no2_scale(d.Sample)
                          })
                      }
                  })

              d3.select("#o3_on")
                  .on("click", function (d) {
                    o3_check = false

                    d3.selectAll("#o3_on")
                      .attr("height", 0)

                    d3.selectAll("#o3_off")
                      .attr("height", 20) 

                    d3.selectAll(".o3_bar")
                      .transition()
                      .duration(1000)
                      .attr("height", 0)

                    if(co_check + no2_check + so2_check == 3) {
                      d3.selectAll(".co_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/3-4)
                        .attr("y", function (d,i) {
                          return svgh/14*i
                        })
                        .attr("width", function (d) {
                          return no2_scale(d.Sample)
                        })

                      d3.selectAll(".no2_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/3-4)
                        .attr("y", function (d,i) {
                          return svgh/14*i + (svgh/14/3 - 4)*1
                        })
                        .attr("width", function (d) {
                          return no2_scale(d.Sample)
                        })


                      d3.selectAll(".so2_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/3-4)
                        .attr("y", function (d,i) {
                          return svgh/14*i + (svgh/14/3 - 4)*2
                        })
                        .attr("width", function (d) {
                          return no2_scale(d.Sample)
                        })

                      }

                    if(co_check + no2_check + so2_check == 2) {
                      if (co_check ==  0) {
                        d3.selectAll(".no2_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/2-7)
                          .attr("y", function (d,i) {
                            return svgh/14*i 
                          })
                          .attr("width", function (d) {
                            return no2_scale(d.Sample)
                          })

                        d3.selectAll(".so2_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/2-7)
                          .attr("y", function (d,i) {
                            return svgh/14*i + (svgh/14/2 - 7)
                          }) 
                          .attr("width", function (d) {
                            return no2_scale(d.Sample)
                          })
                        } else {
                          if (no2_check == 0) {
                            d3.selectAll(".co_bar")
                              .transition()
                              .duration(1000)
                              .attr("height", svgh/14/2-7)
                              .attr("y", function (d,i) {
                                return svgh/14*i
                              })
                              .attr("width", function (d) {
                                return so2_scale(d.Sample)
                              })

                            d3.selectAll(".so2_bar")
                              .transition()
                              .duration(1000)
                              .attr("height", svgh/14/2-7)
                              .attr("y", function (d,i) {
                                return svgh/14*i + (svgh/14/2 - 7)
                              })
                              .attr("width", function (d) {
                                return so2_scale(d.Sample)
                              }) 
                            } else {
                              d3.selectAll(".co_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/2-7)
                                .attr("y", function (d,i) {
                                  return svgh/14*i
                                })
                                .attr("width", function (d) {
                                  return no2_scale(d.Sample)
                                })

                              d3.selectAll(".no2_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/2-7)
                                .attr("y", function (d,i) {
                                  return svgh/14*i + (svgh/14/2 - 7)
                                })
                                .attr("width", function (d) {
                                  return no2_scale(d.Sample)
                                })
                            }
                        }
                      }

                      if(co_check + no2_check + so2_check == 1) {
                        if (co_check ==  1) {
                          d3.selectAll(".co_bar")
                            .transition()
                            .duration(1000)
                            .attr("height", svgh/14/1-12)
                            .attr("y", function (d,i) {
                              return svgh/14*i
                            })
                            .attr("width", function (d) {
                                return co_scale(d.Sample)
                            })
                          } else {
                            if (no2_check == 1) {
                              d3.selectAll(".no2_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/1-12)
                                .attr("y", function (d,i) {
                                  return svgh/14*i 
                                })
                                .attr("width", function (d) {
                                  return no2_scale(d.Sample)
                                })
                              } else {
                                d3.selectAll(".so2_bar")
                                  .transition()
                                  .duration(1000)
                                  .attr("height", svgh/14/1-12)
                                  .attr("y", function (d,i) {
                                    return svgh/14*i
                                  })
                                  .attr("width", function (d) {
                                    return so2_scale(d.Sample)
                                  })
                              }
                          }
                        }
                  })

              d3.select("#o3_off")
                  .on("click", function (d) {
                    o3_check = true

                    d3.selectAll("#o3_off")
                      .attr("height", 0)

                    d3.selectAll("#o3_on")
                      .attr("height", 20) 

                    if(co_check + no2_check + so2_check == 3) {
                      d3.selectAll(".co_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/4-3)
                        .attr("y", function (d,i) {
                          return svgh/14*i
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })

                      d3.selectAll(".no2_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/4-3)
                        .attr("y", function (d,i) {
                          return svgh/14*i + (svgh/14/4 - 3)
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })

                      d3.selectAll(".o3_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/4-3)
                        .attr("y", function (d,i) {
                          return svgh/14*i + (svgh/14/4 - 3)*2
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })

                      d3.selectAll(".so2_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/4-3)
                        .attr("y", function (d,i) {
                          return svgh/14*i + (svgh/14/4 - 3)*3
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })
                    }

                    if(co_check + no2_check + so2_check == 2) {
                      if (co_check ==  0) {
                        d3.selectAll(".no2_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/3-4)
                          .attr("y", function (d,i) {
                            return svgh/14*i
                          })
                          .attr("width", function (d) {
                            return o3_scale(d.Sample)
                          })

                        d3.selectAll(".o3_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/3-4)
                          .attr("y", function (d,i) {
                            return svgh/14*i + (svgh/14/3 - 4)*1
                          })
                          .attr("width", function (d) {
                            return o3_scale(d.Sample)
                          })

                        d3.selectAll(".so2_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/3-4)
                          .attr("y", function (d,i) {
                            return svgh/14*i + (svgh/14/3 - 4)*2
                          })
                          .attr("width", function (d) {
                            return o3_scale(d.Sample)
                          }) 
                        } else {
                          if (no2_check == 0) {
                            d3.selectAll(".co_bar")
                              .transition()
                              .duration(1000)
                              .attr("height", svgh/14/3-4)
                              .attr("y", function (d,i) {
                                return svgh/14*i
                              })
                              .attr("width", function (d) {
                                return o3_scale(d.Sample)
                              })

                            d3.selectAll(".o3_bar")
                              .transition()
                              .duration(1000)
                              .attr("height", svgh/14/3-4)
                              .attr("y", function (d,i) {
                                return svgh/14*i + (svgh/14/3 - 4)*1
                              })
                              .attr("width", function (d) {
                                return o3_scale(d.Sample)
                              })

                            d3.selectAll(".so2_bar")
                              .transition()
                              .duration(1000)
                              .attr("height", svgh/14/3-4)
                              .attr("y", function (d,i) {
                                return svgh/14*i + (svgh/14/3 - 4)*2
                              })
                              .attr("width", function (d) {
                                return o3_scale(d.Sample)
                              })
                            } else {
                              d3.selectAll(".co_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/3-4)
                                .attr("y", function (d,i) {
                                  return svgh/14*i
                                })

                              d3.selectAll(".no2_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/3-4)
                                .attr("y", function (d,i) {
                                  return svgh/14*i + (svgh/14/3 - 4)*1
                                })

                              d3.selectAll(".o3_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/3-4)
                                .attr("y", function (d,i) {
                                  return svgh/14*i + (svgh/14/3 - 4)*2
                                })
                            }
                        }
                      }

                      if(co_check + no2_check + so2_check == 1) {
                        if (co_check ==  1) {
                          d3.selectAll(".co_bar")
                            .transition()
                            .duration(1000)
                            .attr("height", svgh/14/2-7)
                            .attr("y", function (d,i) {
                              return svgh/14*i 
                            })
                            .attr("width", function (d) {
                              return o3_scale(d.Sample)
                            })

                          d3.selectAll(".o3_bar")
                            .transition()
                            .duration(1000)
                            .attr("height", svgh/14/2-7)
                            .attr("y", function (d,i) {
                              return svgh/14*i + (svgh/14/2 - 7)
                            }) 
                            .attr("width", function (d) {
                              return o3_scale(d.Sample)
                            })
                          } else {
                            if (no2_check == 1) {
                              d3.selectAll(".no2_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/2-7)
                                .attr("y", function (d,i) {
                                  return svgh/14*i 
                                })
                                .attr("width", function (d) {
                                  return o3_scale(d.Sample)
                                })

                              d3.selectAll(".o3_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/2-7)
                                .attr("y", function (d,i) {
                                  return svgh/14*i + (svgh/14/2 - 7)
                                })
                                .attr("width", function (d) {
                                  return o3_scale(d.Sample)
                                })
                              } else {
                                d3.selectAll(".o3_bar")
                                  .transition()
                                  .duration(1000)
                                  .attr("height", svgh/14/2-7)
                                  .attr("y", function (d,i) {
                                    return svgh/14*i 
                                  })
                                  .attr("width", function (d) {
                                    return o3_scale(d.Sample)
                                  })

                                d3.selectAll(".so2_bar")
                                  .transition()
                                  .duration(1000)
                                  .attr("height", svgh/14/2-7)
                                  .attr("y", function (d,i) {
                                    return svgh/14*i + (svgh/14/2 - 7)
                                  }) 
                                  .attr("width", function (d) {
                                    return o3_scale(d.Sample)
                                  })
                              }
                          }
                      }

                      if(co_check + no2_check + so2_check == 0) {
                        d3.selectAll(".o3_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/1-12)
                          .attr("y", function (d,i) {
                            return svgh/14*i
                          })
                          .attr("width", function (d) {
                            return o3_scale(d.Sample)
                          })
                      }
                  })
              
              d3.select("#so2_on")
                  .on("click", function (d) {
                    so2_check = false

                    d3.selectAll("#so2_on")
                      .attr("height", 0)

                    d3.selectAll("#so2_off")
                      .attr("height", 20) 

                    d3.selectAll(".so2_bar")
                      .transition()
                      .duration(1000)
                      .attr("height", 0)

                    if(co_check + no2_check + o3_check == 3) {
                      d3.selectAll(".co_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/3-4)
                        .attr("y", function (d,i) {
                          return svgh/14*i
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })

                      d3.selectAll(".no2_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/3-4)
                        .attr("y", function (d,i) {
                          return svgh/14*i + (svgh/14/3 - 4)*1
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })

                      d3.selectAll(".o3_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/3-4)
                        .attr("y", function (d,i) {
                          return svgh/14*i + (svgh/14/3 - 4)*2
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })
                      }

                    if(co_check + no2_check + o3_check == 2) {
                      if (co_check ==  0) {
                        d3.selectAll(".no2_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/2-7)
                          .attr("y", function (d,i) {
                            return svgh/14*i 
                          })
                          .attr("width", function (d) {
                            return o3_scale(d.Sample)
                          })

                        d3.selectAll(".o3_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/2-7)
                          .attr("y", function (d,i) {
                            return svgh/14*i + (svgh/14/2 - 7)
                          }) 
                          .attr("width", function (d) {
                            return o3_scale(d.Sample)
                          })
                        } else {
                          if (no2_check == 0) {
                            d3.selectAll(".co_bar")
                              .transition()
                              .duration(1000)
                              .attr("height", svgh/14/2-7)
                              .attr("y", function (d,i) {
                                return svgh/14*i
                              })
                              .attr("width", function (d) {
                                return o3_scale(d.Sample)
                              })

                            d3.selectAll(".o3_bar")
                              .transition()
                              .duration(1000)
                              .attr("height", svgh/14/2-7)
                              .attr("y", function (d,i) {
                                return svgh/14*i + (svgh/14/2 - 7)
                              })
                              .attr("width", function (d) {
                                return o3_scale(d.Sample)
                              }) 
                            } else {
                              d3.selectAll(".co_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/2-7)
                                .attr("y", function (d,i) {
                                  return svgh/14*i
                                })
                                .attr("width", function (d) {
                                  return no2_scale(d.Sample)
                                })

                              d3.selectAll(".no2_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/2-7)
                                .attr("y", function (d,i) {
                                  return svgh/14*i + (svgh/14/2 - 7)
                                })
                                .attr("width", function (d) {
                                  return no2_scale(d.Sample)
                                })
                            }
                        }
                      }

                      if(co_check + no2_check + o3_check == 1) {
                        if (co_check ==  1) {
                          d3.selectAll(".co_bar")
                            .transition()
                            .duration(1000)
                            .attr("height", svgh/14/1-12)
                            .attr("y", function (d,i) {
                              return svgh/14*i
                            })
                            .attr("width", function (d) {
                                return co_scale(d.Sample)
                            })
                          } else {
                            if (no2_check == 1) {
                              d3.selectAll(".no2_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/1-12)
                                .attr("y", function (d,i) {
                                  return svgh/14*i 
                                })
                                .attr("width", function (d) {
                                  return no2_scale(d.Sample)
                                })
                              } else {
                                d3.selectAll(".o3_bar")
                                  .transition()
                                  .duration(1000)
                                  .attr("height", svgh/14/1-12)
                                  .attr("y", function (d,i) {
                                    return svgh/14*i
                                  })
                                  .attr("width", function (d) {
                                    return o3_scale(d.Sample)
                                  })
                              }
                          }
                        }
                  })

              d3.select("#so2_off")
                  .on("click", function (d) {
                    so2_check = true

                    d3.selectAll("#so2_off")
                      .attr("height", 0)

                    d3.selectAll("#so2_on")
                      .attr("height", 20) 

                    if(co_check + no2_check + o3_check == 3) {
                      d3.selectAll(".co_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/4-3)
                        .attr("y", function (d,i) {
                          return svgh/14*i
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })

                      d3.selectAll(".no2_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/4-3)
                        .attr("y", function (d,i) {
                          return svgh/14*i + (svgh/14/4 - 3)
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })

                      d3.selectAll(".o3_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/4-3)
                        .attr("y", function (d,i) {
                          return svgh/14*i + (svgh/14/4 - 3)*2
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })

                      d3.selectAll(".so2_bar")
                        .transition()
                        .duration(1000)
                        .attr("height", svgh/14/4-3)
                        .attr("y", function (d,i) {
                          return svgh/14*i + (svgh/14/4 - 3)*3
                        })
                        .attr("width", function (d) {
                          return o3_scale(d.Sample)
                        })
                    }

                    if(co_check + no2_check + o3_check == 2) {
                      if (co_check ==  0) {
                        d3.selectAll(".no2_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/3-4)
                          .attr("y", function (d,i) {
                            return svgh/14*i
                          })
                          .attr("width", function (d) {
                            return o3_scale(d.Sample)
                          })

                        d3.selectAll(".o3_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/3-4)
                          .attr("y", function (d,i) {
                            return svgh/14*i + (svgh/14/3 - 4)*1
                          })
                          .attr("width", function (d) {
                            return o3_scale(d.Sample)
                          })

                        d3.selectAll(".so2_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/3-4)
                          .attr("y", function (d,i) {
                            return svgh/14*i + (svgh/14/3 - 4)*2
                          })
                          .attr("width", function (d) {
                            return o3_scale(d.Sample)
                          })
                        } else {
                          if (no2_check == 0) {
                            d3.selectAll(".co_bar")
                              .transition()
                              .duration(1000)
                              .attr("height", svgh/14/3-4)
                              .attr("y", function (d,i) {
                                return svgh/14*i
                              })
                              .attr("width", function (d) {
                                return o3_scale(d.Sample)
                              })

                            d3.selectAll(".o3_bar")
                              .transition()
                              .duration(1000)
                              .attr("height", svgh/14/3-4)
                              .attr("y", function (d,i) {
                                return svgh/14*i + (svgh/14/3 - 4)*1
                              })
                              .attr("width", function (d) {
                                return o3_scale(d.Sample)
                              })

                            d3.selectAll(".so2_bar")
                              .transition()
                              .duration(1000)
                              .attr("height", svgh/14/3-4)
                              .attr("y", function (d,i) {
                                return svgh/14*i + (svgh/14/3 - 4)*2
                              })
                              .attr("width", function (d) {
                                return o3_scale(d.Sample)
                              })
                            } else {
                              d3.selectAll(".co_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/3-4)
                                .attr("y", function (d,i) {
                                  return svgh/14*i
                                })
                                .attr("width", function (d) {
                                  return no2_scale(d.Sample)
                                })

                              d3.selectAll(".no2_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/3-4)
                                .attr("y", function (d,i) {
                                  return svgh/14*i + (svgh/14/3 - 4)*1
                                })
                                .attr("width", function (d) {
                                  return no2_scale(d.Sample)
                                })

                              d3.selectAll(".so2_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/3-4)
                                .attr("y", function (d,i) {
                                  return svgh/14*i + (svgh/14/3 - 4)*2
                                })
                                .attr("width", function (d) {
                                  return no2_scale(d.Sample)
                                })
                            }
                        }
                      }

                      if(co_check + no2_check + o3_check == 1) {
                        if (co_check ==  1) {
                          d3.selectAll(".co_bar")
                            .transition()
                            .duration(1000)
                            .attr("height", svgh/14/2-7)
                            .attr("y", function (d,i) {
                              return svgh/14*i 
                            })
                            .attr("width", function (d) {
                              return so2_scale(d.Sample)
                            })

                          d3.selectAll(".so2_bar")
                            .transition()
                            .duration(1000)
                            .attr("height", svgh/14/2-7)
                            .attr("y", function (d,i) {
                              return svgh/14*i + (svgh/14/2 - 7)
                            }) 
                            .attr("width", function (d) {
                              return so2_scale(d.Sample)
                            })
                          } else {
                            if (no2_check == 1) {
                              d3.selectAll(".no2_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/2-7)
                                .attr("y", function (d,i) {
                                  return svgh/14*i 
                                })
                                .attr("width", function (d) {
                                  return no2_scale(d.Sample)
                                })

                              d3.selectAll(".so2_bar")
                                .transition()
                                .duration(1000)
                                .attr("height", svgh/14/2-7)
                                .attr("y", function (d,i) {
                                  return svgh/14*i + (svgh/14/2 - 7)
                                })
                                .attr("width", function (d) {
                                  return no2_scale(d.Sample)
                                })
                              } else {
                                d3.selectAll(".o3_bar")
                                  .transition()
                                  .duration(1000)
                                  .attr("height", svgh/14/2-7)
                                  .attr("y", function (d,i) {
                                    return svgh/14*i 
                                  })
                                  .attr("width", function (d) {
                                    return o3_scale(d.Sample)
                                  })

                                d3.selectAll(".so2_bar")
                                  .transition()
                                  .duration(1000)
                                  .attr("height", svgh/14/2-7)
                                  .attr("y", function (d,i) {
                                    return svgh/14*i + (svgh/14/2 - 7)
                                  }) 
                                  .attr("width", function (d) {
                                    return o3_scale(d.Sample)
                                  })
                              }
                          }
                      }

                      if(co_check + no2_check + o3_check == 0) {
                        d3.selectAll(".so2_bar")
                          .transition()
                          .duration(1000)
                          .attr("height", svgh/14/1-12)
                          .attr("y", function (d,i) {
                            return svgh/14*i
                          })
                          .attr("width", function (d) {
                            return so2_scale(d.Sample)
                          })
                      }
                  })

    /*          sort_co = function () {
                d3.selectAll(".co_bar")
                .sort(function (a,b) {
                  return d3.ascending(a.Sample, b.Sample)
                })
              }

              d3.selectAll("#co_sort")
                .on("click", function () {
                  console.log("apple")
                  sort_co()
                })*/

              d3.selectAll(".co_col")
                .attr("fill", "#af9b60")

              d3.selectAll(".no2_col")
                .attr("fill", "#806517")

              d3.selectAll(".o3_col")
                .attr("fill", "#C38C2B")

              d3.selectAll(".so2_col")
                .attr("fill", "#D5AE7F")
          })
}












