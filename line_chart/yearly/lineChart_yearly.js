var window_width = window.innerWidth;
var window_height = window.innerHeight;

var colorPick = {"so2": "steelblue", "no2": "red", "co": "green", "ozone": "orange"};
var countyList = ["Alameda", "Contra Costa", "Fresno", "Humboldt", "Imperial", "Los Angeles", "Orange", "Riverside", "Sacramento", "San Bernardino", "San Diego", "Santa Barbara", "Santa Clara", "Solano"];


margin_m = {top: 20, right: 20, bottom: 30, left: 50}; m_w = window_width / 2.7; m_h = window_height / 2.7;
margin_mon = {top: 20, right: 20, bottom: 30, left: 50}; mon_w = window_width / 5; mon_h = window_height / 5;
margin_tue = {top: 20, right: 20, bottom: 30, left: 50}; tue_w = window_width / 5; tue_h = window_height / 5;
margin_wed = {top: 20, right: 20, bottom: 30, left: 50}; wed_w = window_width / 5; wed_h = window_height / 5;
margin_thu = {top: 20, right: 20, bottom: 30, left: 50}; thu_w = window_width / 5; thu_h = window_height / 5;
margin_fri = {top: 20, right: 20, bottom: 30, left: 50}; fri_w = window_width / 5; fri_h = window_height / 5;
margin_sat = {top: 20, right: 20, bottom: 30, left: 50}; sat_w = window_width / 5; sat_h = window_height / 5;
margin_sun = {top: 20, right: 20, bottom: 30, left: 50}; sun_w = window_width / 5; sun_h = window_height / 5;



// default
county_select = "Alameda"

// main
createLineGraph("m", county_select, "main", "hour_county.json", m_w, m_h, margin_m);

createLineGraph("mon", county_select, "monday", "hour_dayofweek_county.json", mon_w, mon_h, margin_mon, "Mon");
createLineGraph("tue", county_select, "tuesday", "hour_dayofweek_county.json", tue_w, tue_h, margin_tue, "Tue");
createLineGraph("wed", county_select, "wednesday", "hour_dayofweek_county.json", wed_w, wed_h, margin_wed, "Wed");
createLineGraph("thu", county_select, "thursday", "hour_dayofweek_county.json", thu_w, thu_h, margin_thu, "Thu");
createLineGraph("fri", county_select, "friday", "hour_dayofweek_county.json", fri_w, fri_h, margin_fri, "Fri");
createLineGraph("sat", county_select, "saturday", "hour_dayofweek_county.json", sat_w, sat_h, margin_sat, "Sat");
createLineGraph("sun", county_select, "sunday", "hour_dayofweek_county.json", sun_w, sun_h, margin_sun, "Sun");

d3.select("#inds").on("change", function() {
	var sect = document.getElementById("inds");
	var section = sect.options[sect.selectedIndex].value;
	county_select = section;
	d3.select("#m").remove();
	d3.select("#mon").remove();
	d3.select("#tue").remove();
	d3.select("#wed").remove();
	d3.select("#thu").remove();
	d3.select("#fri").remove();
	d3.select("#sat").remove();
	d3.select("#sun").remove();
	createLineGraph("m", county_select, "main", "hour_county.json", m_w, m_h, margin_m);
	createLineGraph("mon", county_select, "monday", "hour_dayofweek_county.json", mon_w, mon_h, margin_mon, "Mon");
	createLineGraph("tue", county_select, "tuesday", "hour_dayofweek_county.json", tue_w, tue_h, margin_tue, "Tue");
	createLineGraph("wed", county_select, "wednesday", "hour_dayofweek_county.json", wed_w, wed_h, margin_wed, "Wed");
	createLineGraph("thu", county_select, "thursday", "hour_dayofweek_county.json", thu_w, thu_h, margin_thu, "Thu");
	createLineGraph("fri", county_select, "friday", "hour_dayofweek_county.json", fri_w, fri_h, margin_fri, "Fri");
	createLineGraph("sat", county_select, "saturday", "hour_dayofweek_county.json", sat_w, sat_h, margin_sat, "Sat");
	createLineGraph("sun", county_select, "sunday", "hour_dayofweek_county.json", sun_w, sun_h, margin_sun, "Sun");
})





function createLineGraph(graphId, county, placeId, data, w, h, margin, dayofweek, season) {

	d3.json(data, function(json) {

		if (dayofweek != null && season != null) {
			no2 = parseAirDataOneDayPerPt(json, county, "2017-01-01", "NO2", dayofweek, season);
			so2 = parseAirDataOneDayPerPt(json, county, "2017-01-01", "SO2", dayofweek, season);
			co = parseAirDataOneDayPerPt(json, county, "2017-01-01", "CO", dayofweek, season);
			ozone = parseAirDataOneDayPerPt(json, county, "2017-01-01", "Ozone", dayofweek, season);

			createLine(so2, placeId, "so2", graphId, w, h, margin); //

			d3.select("#" + graphId + "_co").on("change", function(){
				update(data, graphId, w, h, margin, county, dayofweek, season);
			})

			d3.select("#" + graphId + "_no2").on("change", function() {
				update(data, graphId, w, h, margin, county, dayofweek, season);
			});
	        d3.select("#" + graphId + "_so2").on("change", function() {
	        	update(data, graphId, w, h, margin, county, dayofweek, season);
	        });
	        d3.select("#" + graphId + "_ozone").on("change", function() {
	        	update(data, graphId, w, h, margin, county, dayofweek, season);
	        });

		}
		else if (dayofweek != null) {
			no2 = parseAirDataOneDayPerPt(json, county, "2017-01-01", "NO2", dayofweek);
			so2 = parseAirDataOneDayPerPt(json, county, "2017-01-01", "SO2", dayofweek);
			co = parseAirDataOneDayPerPt(json, county, "2017-01-01", "CO", dayofweek);
			ozone = parseAirDataOneDayPerPt(json, county, "2017-01-01", "Ozone", dayofweek);

			createLine(so2, placeId, "so2", graphId, w, h, margin); //

			d3.select("#" + graphId + "_co").on("change", function(){
				update(data, graphId, w, h, margin, county, dayofweek);
			})

			d3.select("#" + graphId + "_no2").on("change", function() {
				update(data, graphId, w, h, margin, county, dayofweek);
			});
	        d3.select("#" + graphId + "_so2").on("change", function() {
	        	update(data, graphId, w, h, margin, county, dayofweek);
	        });
	        d3.select("#" + graphId + "_ozone").on("change", function() {
	        	update(data, graphId, w, h, margin, county, dayofweek);
	        });
		}
		else {
			no2 = parseAirDataOneDayPerPt(json, county, "2017-01-01", "NO2");
			so2 = parseAirDataOneDayPerPt(json, county, "2017-01-01", "SO2");
			co = parseAirDataOneDayPerPt(json, county, "2017-01-01", "CO");
			ozone = parseAirDataOneDayPerPt(json, county, "2017-01-01", "Ozone");

			createLine(so2, placeId, "so2", graphId, w, h, margin); //

			d3.select("#" + graphId + "_co").on("change", function(){
				update(data, graphId, w, h, margin, county);
			})

			d3.select("#" + graphId + "_no2").on("change", function() {
				update(data, graphId, w, h, margin, county);
			});
	        d3.select("#" + graphId + "_so2").on("change", function() {
	        	update(data, graphId, w, h, margin, county);
	        });
	        d3.select("#" + graphId + "_ozone").on("change", function() {
	        	update(data, graphId, w, h, margin, county);
	        });
		}

    });
}

function update(data, graphId, w, h, margin, county, dayofweek, season) {


	d3.select("#" + graphId + "_no2_line").remove();
	d3.select("#" + graphId + "_so2_line").remove();
	d3.select("#" + graphId + "_co_line").remove();
	d3.select("#" + graphId + "_ozone_line").remove();

	no2_on = false;
	so2_on = false;
	co_on = false;
	ozone_on = false;

	if (d3.select("#" + graphId + "_no2").property("checked")) {no2_on = true;}
	if (d3.select("#" + graphId + "_so2").property("checked")) {so2_on = true;}
	if (d3.select("#" + graphId + "_co").property("checked")) {co_on = true;}
	if (d3.select("#" + graphId + "_ozone").property("checked")) {ozone_on = true;}

	// reload corresponding data
	d3.json(data, function(json) {

		if (dayofweek != null && season != null) {
			no2 = parseAirDataOneDayPerPt(json, county, "2017-01-01", "NO2", dayofweek, season);
			so2 = parseAirDataOneDayPerPt(json, county, "2017-01-01", "SO2", dayofweek, season);
			co = parseAirDataOneDayPerPt(json, county, "2017-01-01", "CO", dayofweek, season);
			ozone = parseAirDataOneDayPerPt(json, county, "2017-01-01", "Ozone", dayofweek, season);

		}
		else if (dayofweek != null) {
			no2 = parseAirDataOneDayPerPt(json, county, "2017-01-01", "NO2", dayofweek);
			so2 = parseAirDataOneDayPerPt(json, county, "2017-01-01", "SO2", dayofweek);
			co = parseAirDataOneDayPerPt(json, county, "2017-01-01", "CO", dayofweek);
			ozone = parseAirDataOneDayPerPt(json, county, "2017-01-01", "Ozone", dayofweek);
		}
		else {
			no2 = parseAirDataOneDayPerPt(json, county, "2017-01-01", "NO2");
			so2 = parseAirDataOneDayPerPt(json, county, "2017-01-01", "SO2");
			co = parseAirDataOneDayPerPt(json, county, "2017-01-01", "CO");
			ozone = parseAirDataOneDayPerPt(json, county, "2017-01-01", "Ozone");
		}

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
	      .select("#y_axis_" + graphId)
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
	      .select("#x_axis_" + graphId)
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
		      .attr("id", graphId + "_so2_line")
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
		      .attr("id", graphId + "_no2_line")
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
		      .attr("id", graphId + "_co_line")
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
		      .attr("id", graphId + "_ozone_line")
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
		temp = data[point][point2][point3][pol];
	}
	else if (point2 != null) {
		temp = data[point][point2][pol];
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
      .attr("id", "x_axis_" + graphId)
      .attr("class", "x_axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    var yAxis = d3.axisLeft()
    				.scale(y)

    g.append("g")
      .attr("id", "y_axis_" + graphId)
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
      .attr("id", graphId + "_so2_line") //
      .attr("fill", "none")
      .attr("stroke", colorPick[className])
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 2.5);

}