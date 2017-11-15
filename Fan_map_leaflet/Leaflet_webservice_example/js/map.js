var info;
var geoJson;

window.onload = function() {
    var map = L.map('mapid').setView([45, 100], 8);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 10,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiY2hlbmpseSIsImEiOiJjajlmemNscGQycTU2MzNtcW51ZGJoZ2ViIn0.Gf3W96-E5bA7JX2dz56QWw',
        noWrap: true
    }).addTo(map);

    d3.json("js/hydro.json", function(error, hydrodata) {
        // console.log(error);
        geoJson = L.geoJson(hydrodata, {
            style: style,
            onEachFeature: onEachFeature
        }).addTo(map);


        var legend = L.control({position: 'bottomright'});

        legend.onAdd = function (map) {
            var div = L.DomUtil.create('div', 'info legend'),
                grades = [0, 2, 4, 7, 10, 15, 20],
                labels = [];
            // loop through our density intervals and generate a label with a colored square for each interval
            for (var i = 0; i < grades.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                    grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
            }

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
            // console.log(props.Hydro2010);
            if (props) {
                console.log(props.Hydro2010);
            }
            this._div.innerHTML = '<h4>HydroElectricity Consumption</h4>' +  (props ?
                ('<b>' + props.CNTRY_NAME + '</b><br />' + (props.Hydro2010 != 0 ? props.Hydro2010 + ' Mtoe ': 'No Data'))
                : 'Hover over a state');
        };

        info.addTo(map);
    });
}

function getColor(d) {

    return d > 20 ? '#800026' :
           d > 15  ? '#BD0026' :
           d > 10  ? '#E31A1C' :
           d > 7  ? '#FC4E2A' :
           d > 4   ? '#FD8D3C' :
           d > 2   ? '#FEB24C' :
           d > 0   ? '#FED976' :
                      '#FFFFFF';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.Hydro2010),
        weight: 1,
        opacity: 1,
        color: '#666',
        dashArray: '3',
        fillOpacity: 0.7
    };
}


function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 3,
        color: '#CCFF99',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    geoJson.resetStyle(e.target);
    // alert(e.target);
    info.update();
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
    });
}
