var location_n_county = {"['37.743649', '-121.934188']": 'Contra Costa', "['35.02083', '-120.56388']": 'San Luis Obispo', "['34.402773', '-119.458454']": 'Santa Barbara', "['37.281598', '-120.434992']": 'Merced', "['36.48324', '-121.15688']": 'San Benito', "['36.209286', '-121.126371']": 'Monterey', "['38.339905', '-120.763515']": 'Amador', "['37.97231', '-122.520004']": 'Marin', "['38.102507', '-122.237976']": 'Solano', "['39.0327', '-122.92229']": 'Lake', "['37.482934', '-122.20337']": 'San Mateo', "['34.210154', '-118.870496']": 'Ventura', "['40.17093', '-122.25556']": 'Tehama', "['38.201852', '-120.681567']": 'Calaveras', "['35.050551', '-118.147294']": 'Kern', "['37.981582', '-120.379611']": 'Tuolumne', "['40.452913', '-122.298866']": 'Shasta', "['37.682512', '-121.443324']": 'San Joaquin', "['38.302591', '-121.420838']": 'Sacramento', "['41.726892', '-122.633579']": 'Siskiyou', "['39.234331', '-121.056591']": 'Nevada', "['38.53445', '-121.7734']": 'Yolo', "['37.487981', '-120.837005']": 'Stanislaus', "['40.71528', '-124.20139']": 'Humboldt', "['37.654456', '-122.031547']": 'Alameda', "['36.999571', '-121.574684']": 'Santa Clara', "['37.765946', '-122.399044']": 'San Francisco', "['36.233274', '-119.766212']": 'Kings', "['39.533761', '-122.191903']": 'Glenn', "['33.8025', '-118.22']": 'Los Angeles', "['39.138773', '-121.618549']": 'Sutter', "['33.63003', '-117.67593']": 'Orange', "['36.983921', '-121.989328']": 'Santa Cruz', "['33.447867', '-117.088649']": 'Riverside', "['38.745726', '-121.266312']": 'Placer', "['32.676186', '-115.484144']": 'Imperial', "['36.867125', '-120.010158']": 'Madera', "['38.725282', '-120.821916']": 'El Dorado', "['34.030833', '-117.61722']": 'San Bernardino', "['39.14566', '-123.20298']": 'Mendocino', "['36.59745', '-119.504569']": 'Fresno', "['39.714041', '-121.618836']": 'Butte', "['38.403765', '-122.818294']": 'Sonoma', "['37.549928', '-119.844591']": 'Mariposa', "['39.202935', '-122.017728']": 'Colusa', "['38.310942', '-122.296189']": 'Napa', "['36.508611', '-116.847778']": 'Inyo', "['36.031831', '-119.055018']": 'Tulare', "['32.579361', '-116.929486']": 'San Diego'}
var colorPick = {"so2": "steelblue", "no2": "red", "co": "green", "ozone": "orange"};
var dash_line_margin = {top: 20, right: 20, bottom: 30, left: 50};
var dash_line_w = 400;
var dash_line_h = 300;

// console.log(d3.select("#dash_pie").attr("width"))

function createLineGraph(graphId, county, placeId, data, w, h, margin, season, pollutant) {
    // pollutant is no2, so2, co, ozone
    // pollutant is certain, season is certain
    // data used is hour_season_location

    if (season == "y") {
        season = "3";
    }

    d3.json(data, function(json) {

        if (season != null) {
            // get data of all four pollutants
            no2 = parseAirDataOneDayPerPt(json, county, "2016-01-01", "NO2", null, season);
            so2 = parseAirDataOneDayPerPt(json, county, "2016-01-01", "SO2", null, season);
            co = parseAirDataOneDayPerPt(json, county, "2016-01-01", "CO", null, season);
            ozone = parseAirDataOneDayPerPt(json, county, "2016-01-01", "Ozone", null, season);

            // create initial line and graph framework
            if (pollutant == "so2") {
                createLine(so2, placeId, pollutant, graphId, w, h, margin); 
            } else if (pollutant == "co") {
                createLine(co, placeId, pollutant, graphId, w, h, margin); 
            } else if (pollutant == "no2") {
                createLine(no2, placeId, pollutant, graphId, w, h, margin); 
            } else {
                createLine(ozone, placeId, pollutant, graphId, w, h, margin); 
            }
            
            d3.select("#" + graphId + "_co_dashboard").on("change", function(){
                update(data, graphId, w, h, margin, county, null, season);
            });

            d3.select("#" + graphId + "_no2_dashboard").on("change", function() {
                update(data, graphId, w, h, margin, county, null, season);
            });
            d3.select("#" + graphId + "_so2_dashboard").on("change", function() {
                update(data, graphId, w, h, margin, county, null, season);
            });
            d3.select("#" + graphId + "_ozone_dashboard").on("change", function() {
                update(data, graphId, w, h, margin, county, null, season);
            });
        }
        else {
            no2 = parseAirDataOneDayPerPt(json, county, "2016-01-01", "NO2");
            so2 = parseAirDataOneDayPerPt(json, county, "2016-01-01", "SO2");
            co = parseAirDataOneDayPerPt(json, county, "2016-01-01", "CO");
            ozone = parseAirDataOneDayPerPt(json, county, "2016-01-01", "Ozone");

            createLine(so2, placeId, "so2", graphId, w, h, margin); //

            d3.select("#" + graphId + "_co_dashboard").on("change", function(){
                update(data, graphId, w, h, margin, county);
            });

            d3.select("#" + graphId + "_no2_dashboard").on("change", function() {
                update(data, graphId, w, h, margin, county);
            });
            d3.select("#" + graphId + "_so2_dashboard").on("change", function() {
                update(data, graphId, w, h, margin, county);
            });
            d3.select("#" + graphId + "_ozone_dashboard").on("change", function() {
                update(data, graphId, w, h, margin, county);
            });
        }

    });
}

function update(data, graphId, w, h, margin, county, dayofweek, season) {


    d3.select("#" + graphId + "_no2_line_dashboard").remove();
    d3.select("#" + graphId + "_so2_line_dashboard").remove();
    d3.select("#" + graphId + "_co_line_dashboard").remove();
    d3.select("#" + graphId + "_ozone_line_dashboard").remove();

    no2_on = false;
    so2_on = false;
    co_on = false;
    ozone_on = false;

    if (d3.select("#" + graphId + "_no2_dashboard").property("checked")) {no2_on = true;}
    if (d3.select("#" + graphId + "_so2_dashboard").property("checked")) {so2_on = true;}
    if (d3.select("#" + graphId + "_co_dashboard").property("checked")) {co_on = true;}
    if (d3.select("#" + graphId + "_ozone_dashboard").property("checked")) {ozone_on = true;}
    
    // reload corresponding data
    d3.json(data, function(json) {

        no2 = parseAirDataOneDayPerPt(json, county, "2016-01-01", "NO2", null, season);
        so2 = parseAirDataOneDayPerPt(json, county, "2016-01-01", "SO2", null, season);
        co = parseAirDataOneDayPerPt(json, county, "2016-01-01", "CO", null, season);
        ozone = parseAirDataOneDayPerPt(json, county, "2016-01-01", "Ozone", null, season);

        // update axis upper and lower limit into yExtent
        minPool = [];
        maxPool = [];

        if(so2_on) {
            ye = d3.extent(so2, function(d) {return d[1];});
            minPool.push(ye[0]);
            maxPool.push(ye[1]);
        }
        if(no2_on) {
            ye = d3.extent(no2, function(d) {return d[1];});
            minPool.push(ye[0]);
            maxPool.push(ye[1]);
        }
        if(co_on) {
            ye = d3.extent(co, function(d) {return d[1];});
            minPool.push(ye[0]);
            maxPool.push(ye[1]);
        }
        if(ozone_on) {
            ye = d3.extent(ozone, function(d) {return d[1];});
            minPool.push(ye[0]);
            maxPool.push(ye[1]);
        }

        currYMin = Math.min.apply(null, minPool);
        currYMax = Math.max.apply(null, maxPool);
        yExtent = [currYMin, currYMax];

        // prepare y axis
        width = w - margin.left - margin.right;
        height = h - margin.top - margin.bottom;

        var y = d3.scaleLinear()
                    .domain(yExtent)
                    .rangeRound([height, 0]);

        var yAxis = d3.axisLeft()
                        .scale(y)

        d3.select("#" + graphId)
            .select("#y_axis_" + graphId + "_dashboard")
            .transition()
            .duration(1000)
            .call(d3.axisLeft(y))

        // prepare x axis
        var x = d3.scaleTime()
                    .domain(d3.extent(no2, function(d) {return d[0];}))
                    .rangeRound([0, width]);

        var xAxis = d3.axisBottom()
                        .scale(x);

        d3.select("#" + graphId)
            .select("#x_axis_" + graphId + "_dashboard")
            .transition()
            .duration(1000)
            .call(xAxis);

        var line = d3.line()
                        .x(function(d) {return x(d[0])})
                        .y(function(d) {return y(+d[1])});

        // add lines
        if(so2_on) {
            d3.select("#" + graphId)
                .append("path")
                .datum(so2)
                .attr("d", line)
                .classed("so2", true)
                .attr("id", graphId + "_so2_line_dashboard")
                .attr("fill", "none")
                .attr("stroke", colorPick["so2"])
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                .attr("stroke-width", 2.5);
        }
        if(no2_on) {
            d3.select("#" + graphId)
                .append("path")
                .datum(no2)
                .attr("d", line)
                .classed("no2", true)
                .attr("id", graphId + "_no2_line_dashboard")
                .attr("fill", "none")
                .attr("stroke", colorPick["no2"])
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                .attr("stroke-width", 2.5);
        }
        if(co_on) {
            d3.select("#" + graphId)
                .append("path")
                .datum(co)
                .attr("d", line)
                .classed("co", true)
                .attr("id", graphId + "_co_line_dashboard")
                .attr("fill", "none")
                .attr("stroke", colorPick["co"])
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                .attr("stroke-width", 2.5);
        }
        if(ozone_on) {
            d3.select("#" + graphId)
                .append("path")
                .datum(ozone)
                .attr("d", line)
                .classed("ozone", true)
                .attr("id", graphId + "_ozone_line_dashboard")
                .attr("fill", "none")
                .attr("stroke", colorPick["ozone"])
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                .attr("stroke-width", 2.5);
        }


    });

}


function parseAirDataOneDayPerPt(data, point, date, pol, point2, point3) {

    var parseTime = d3.timeParse("%Y-%m-%d %H:%M")

    var temp;
    if (point2 != null && point3 != null) {
        temp = data[point][point3][point2][pol];
    }
    else if (point2 != null) {
        temp = data[point][point2][pol];
    }
    else if (point3 != null) {
        temp = data[point][point3][pol];
    }
    else {
        temp = data[point][pol];
    }

    timeAndVal = [];
    for (i in temp) {
        timeAndVal.push([i, parseFloat(temp[i])]);
    }
    timeAndVal.sort();

    dateTimeAndVal = [];
    for (var i = 0; i < timeAndVal.length; i++) {
        dateTimeAndVal.push([parseTime(date + " "+ timeAndVal[i][0]), timeAndVal[i][1]]);
    }
    

    return dateTimeAndVal;
    
}


function createLine(data, placeId, className, graphId, w, h, margin) {

    width = w - margin.left - margin.right;
    height = h - margin.top - margin.bottom;
    
    yExtent = d3.extent(data, function(d) {return d[1];});

    svg = d3.select("body")
                .select("#" + placeId)
                .append("svg")
                .attr("width", w)
                .attr("height", h)
                .attr("id", graphId)

    g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x = d3.scaleTime()
                .domain(d3.extent(data, function(d) {return d[0];}))
                .rangeRound([0, width]);

    y = d3.scaleLinear()
                .domain(yExtent)
                .rangeRound([height, 0]);

    var line = d3.line()
                    .x(function(d) {return x(d[0])})
                    .y(function(d) {return y(+d[1])});

    var xAxis = d3.axisBottom()
                    .scale(x);

    g.append("g")
        .attr("id", "x_axis_" + graphId + "_dashboard")
        .attr("class", "x_axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    var yAxis = d3.axisLeft()
                    .scale(y)

    g.append("g")
        .attr("id", "y_axis_" + graphId + "_dashboard")
        .attr("class", "y_axis")
        .call(yAxis)
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("read");


    g.append("path")
        .datum(data)
        .attr("d", line)
        .classed(className, true) //
        .attr("id", graphId + "_so2_line_dashboard") //
        .attr("fill", "none")
        .attr("stroke", colorPick[className])
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 2.5);

}