county_select = "Alameda";
var colorPick = {"so2": "#839192", "no2": "#A93226", "co": "#AF601A", "ozone": "#6D4C41"};
var countyList = ["Alameda", "Contra Costa", "Fresno", "Humboldt", "Imperial", "Los Angeles", "Orange", "Riverside", "Sacramento", "San Bernardino", "San Diego", "Santa Barbara", "Santa Clara", "Solano"];
var no2_r = [0, 0.2889];
var so2_r = [0, 0.0410];
var ozone_r = [0, 0.8183];
var co_r = [0, 0.0701];

redraw();

function redraw() {
	
	var window_width = window.innerWidth;
	var window_height = window.innerHeight;

	margin_m = {top: 20, right: 20, bottom: 30, left: 50}; m_w = window_width / 2.7; m_h = window_height / 2.7;
	margin_mon = {top: 20, right: 20, bottom: 30, left: 50}; mon_w = window_width / 5; mon_h = window_height / 8;
	margin_tue = {top: 20, right: 20, bottom: 30, left: 50}; tue_w = window_width / 5; tue_h = window_height / 8;
	margin_wed = {top: 20, right: 20, bottom: 30, left: 50}; wed_w = window_width / 5; wed_h = window_height / 8;
	margin_thu = {top: 20, right: 20, bottom: 30, left: 50}; thu_w = window_width / 5; thu_h = window_height / 8;
	margin_fri = {top: 20, right: 20, bottom: 30, left: 50}; fri_w = window_width / 5; fri_h = window_height / 8;
	margin_sat = {top: 20, right: 20, bottom: 30, left: 50}; sat_w = window_width / 5; sat_h = window_height / 8;
	margin_sun = {top: 20, right: 20, bottom: 30, left: 50}; sun_w = window_width / 5; sun_h = window_height / 8;


	// no2
	createLineGraph("no2", "mon_no2_s", county_select, "mon_no2", "hour_dayofweek_county.json", mon_w, mon_h, margin_mon, "Mon");
	createLineGraph("no2", "tue_no2_s", county_select, "tue_no2", "hour_dayofweek_county.json", tue_w, tue_h, margin_tue, "Tue");
	createLineGraph("no2", "wed_no2_s", county_select, "wed_no2", "hour_dayofweek_county.json", wed_w, wed_h, margin_wed, "Wed");
	createLineGraph("no2", "thu_no2_s", county_select, "thu_no2", "hour_dayofweek_county.json", thu_w, thu_h, margin_thu, "Thu");
	createLineGraph("no2", "fri_no2_s", county_select, "fri_no2", "hour_dayofweek_county.json", fri_w, fri_h, margin_fri, "Fri");
	createLineGraph("no2", "sat_no2_s", county_select, "sat_no2", "hour_dayofweek_county.json", sat_w, sat_h, margin_sat, "Sat");
	createLineGraph("no2", "sun_no2_s", county_select, "sun_no2", "hour_dayofweek_county.json", sun_w, sun_h, margin_sun, "Sun");

	// so2
	createLineGraph("so2", "mon_so2_s", county_select, "mon_so2", "hour_dayofweek_county.json", mon_w, mon_h, margin_mon, "Mon");
	createLineGraph("so2", "tue_so2_s", county_select, "tue_so2", "hour_dayofweek_county.json", tue_w, tue_h, margin_tue, "Tue");
	createLineGraph("so2", "wed_so2_s", county_select, "wed_so2", "hour_dayofweek_county.json", wed_w, wed_h, margin_wed, "Wed");
	createLineGraph("so2", "thu_so2_s", county_select, "thu_so2", "hour_dayofweek_county.json", thu_w, thu_h, margin_thu, "Thu");
	createLineGraph("so2", "fri_so2_s", county_select, "fri_so2", "hour_dayofweek_county.json", fri_w, fri_h, margin_fri, "Fri");
	createLineGraph("so2", "sat_so2_s", county_select, "sat_so2", "hour_dayofweek_county.json", sat_w, sat_h, margin_sat, "Sat");
	createLineGraph("so2", "sun_so2_s", county_select, "sun_so2", "hour_dayofweek_county.json", sun_w, sun_h, margin_sun, "Sun");

	// co
	createLineGraph("co", "mon_co_s", county_select, "mon_co", "hour_dayofweek_county.json", mon_w, mon_h, margin_mon, "Mon");
	createLineGraph("co", "tue_co_s", county_select, "tue_co", "hour_dayofweek_county.json", tue_w, tue_h, margin_tue, "Tue");
	createLineGraph("co", "wed_co_s", county_select, "wed_co", "hour_dayofweek_county.json", wed_w, wed_h, margin_wed, "Wed");
	createLineGraph("co", "thu_co_s", county_select, "thu_co", "hour_dayofweek_county.json", thu_w, thu_h, margin_thu, "Thu");
	createLineGraph("co", "fri_co_s", county_select, "fri_co", "hour_dayofweek_county.json", fri_w, fri_h, margin_fri, "Fri");
	createLineGraph("co", "sat_co_s", county_select, "sat_co", "hour_dayofweek_county.json", sat_w, sat_h, margin_sat, "Sat");
	createLineGraph("co", "sun_co_s", county_select, "sun_co", "hour_dayofweek_county.json", sun_w, sun_h, margin_sun, "Sun");

	// ozone
	createLineGraph("ozone", "mon_ozone_s", county_select, "mon_ozone", "hour_dayofweek_county.json", mon_w, mon_h, margin_mon, "Mon");
	createLineGraph("ozone", "tue_ozone_s", county_select, "tue_ozone", "hour_dayofweek_county.json", tue_w, tue_h, margin_tue, "Tue");
	createLineGraph("ozone", "wed_ozone_s", county_select, "wed_ozone", "hour_dayofweek_county.json", wed_w, wed_h, margin_wed, "Wed");
	createLineGraph("ozone", "thu_ozone_s", county_select, "thu_ozone", "hour_dayofweek_county.json", thu_w, thu_h, margin_thu, "Thu");
	createLineGraph("ozone", "fri_ozone_s", county_select, "fri_ozone", "hour_dayofweek_county.json", fri_w, fri_h, margin_fri, "Fri");
	createLineGraph("ozone", "sat_ozone_s", county_select, "sat_ozone", "hour_dayofweek_county.json", sat_w, sat_h, margin_sat, "Sat");
	createLineGraph("ozone", "sun_ozone_s", county_select, "sun_ozone", "hour_dayofweek_county.json", sun_w, sun_h, margin_sun, "Sun");
}


function createLineGraph(inipoll, graphId, county, placeId, data, w, h, margin, dayofweek) {

	d3.json(data, function(json) {

		no2 = parseAirDataOneDayPerPt(json, county, "2017-01-01", "NO2", dayofweek);
		so2 = parseAirDataOneDayPerPt(json, county, "2017-01-01", "SO2", dayofweek);
		co = parseAirDataOneDayPerPt(json, county, "2017-01-01", "CO", dayofweek);
		ozone = parseAirDataOneDayPerPt(json, county, "2017-01-01", "Ozone", dayofweek);

		var init_pollutant;
		if (inipoll == "co") {
			init_pollutant = co;
		} else if (inipoll == "so2") {
			init_pollutant = so2;
		} else if (inipoll == "ozone") {
			init_pollutant = ozone;
		} else {
			init_pollutant = no2;
		}

		createLine(init_pollutant, placeId, inipoll, graphId, w, h, margin);

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
	

	if (className == "no2") {
		yExtent = no2_r;
	}
	if (className == "so2") {
		yExtent = so2_r;
	}
	if (className == "co") {
		yExtent = co_r;
	}
	if (className == "ozone") {
		yExtent = ozone_r;
	}

	// yExtent = d3.extent(data, function(d) {return d[1];});

	svg = d3.select("body")
    			.select("#" + placeId)
    			.append("svg")
    			.attr("width", w)
    			.attr("height", h)
				.attr("id", graphId)
				.style("padding-left", "25px")

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
					.ticks(5)

    g.append("g")
      .attr("id", "y_axis_" + graphId)
      .attr("class", "y_axis")
      .call(yAxis)
      .append("text")
      .attr("fill", "#000")
      .attr("y", 0)
      .attr("x", 60)
      .attr("text-anchor", "end")
      .text("Pollution Index");


  g.append("path")
      .datum(data)
      .attr("d", line)
      .classed(className, true) //
      .attr("id", graphId + "_" + className + "_line") //
      .attr("fill", "none")
      .attr("stroke", colorPick[className])
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 3.5);

}



d3.select("#inds").on("change", function() {
	var sect = document.getElementById("inds");
	var section = sect.options[sect.selectedIndex].value;
	county_select = section;

	// remove all graphs
	d3.select("#mon_no2_s").remove();
	d3.select("#tue_no2_s").remove();
	d3.select("#wed_no2_s").remove();
	d3.select("#thu_no2_s").remove();
	d3.select("#fri_no2_s").remove();
	d3.select("#sat_no2_s").remove();
	d3.select("#sun_no2_s").remove();

	d3.select("#mon_so2_s").remove();
	d3.select("#tue_so2_s").remove();
	d3.select("#wed_so2_s").remove();
	d3.select("#thu_so2_s").remove();
	d3.select("#fri_so2_s").remove();
	d3.select("#sat_so2_s").remove();
	d3.select("#sun_so2_s").remove();

	d3.select("#mon_co_s").remove();
	d3.select("#tue_co_s").remove();
	d3.select("#wed_co_s").remove();
	d3.select("#thu_co_s").remove();
	d3.select("#fri_co_s").remove();
	d3.select("#sat_co_s").remove();
	d3.select("#sun_co_s").remove();

	d3.select("#mon_ozone_s").remove();
	d3.select("#tue_ozone_s").remove();
	d3.select("#wed_ozone_s").remove();
	d3.select("#thu_ozone_s").remove();
	d3.select("#fri_ozone_s").remove();
	d3.select("#sat_ozone_s").remove();
	d3.select("#sun_ozone_s").remove();
	
	// no2
	createLineGraph("no2", "mon_no2_s", county_select, "mon_no2", "hour_dayofweek_county.json", mon_w, mon_h, margin_mon, "Mon");
	createLineGraph("no2", "tue_no2_s", county_select, "tue_no2", "hour_dayofweek_county.json", tue_w, tue_h, margin_tue, "Tue");
	createLineGraph("no2", "wed_no2_s", county_select, "wed_no2", "hour_dayofweek_county.json", wed_w, wed_h, margin_wed, "Wed");
	createLineGraph("no2", "thu_no2_s", county_select, "thu_no2", "hour_dayofweek_county.json", thu_w, thu_h, margin_thu, "Thu");
	createLineGraph("no2", "fri_no2_s", county_select, "fri_no2", "hour_dayofweek_county.json", fri_w, fri_h, margin_fri, "Fri");
	createLineGraph("no2", "sat_no2_s", county_select, "sat_no2", "hour_dayofweek_county.json", sat_w, sat_h, margin_sat, "Sat");
	createLineGraph("no2", "sun_no2_s", county_select, "sun_no2", "hour_dayofweek_county.json", sun_w, sun_h, margin_sun, "Sun");

	// so2
	createLineGraph("so2", "mon_so2_s", county_select, "mon_so2", "hour_dayofweek_county.json", mon_w, mon_h, margin_mon, "Mon");
	createLineGraph("so2", "tue_so2_s", county_select, "tue_so2", "hour_dayofweek_county.json", tue_w, tue_h, margin_tue, "Tue");
	createLineGraph("so2", "wed_so2_s", county_select, "wed_so2", "hour_dayofweek_county.json", wed_w, wed_h, margin_wed, "Wed");
	createLineGraph("so2", "thu_so2_s", county_select, "thu_so2", "hour_dayofweek_county.json", thu_w, thu_h, margin_thu, "Thu");
	createLineGraph("so2", "fri_so2_s", county_select, "fri_so2", "hour_dayofweek_county.json", fri_w, fri_h, margin_fri, "Fri");
	createLineGraph("so2", "sat_so2_s", county_select, "sat_so2", "hour_dayofweek_county.json", sat_w, sat_h, margin_sat, "Sat");
	createLineGraph("so2", "sun_so2_s", county_select, "sun_so2", "hour_dayofweek_county.json", sun_w, sun_h, margin_sun, "Sun");

	// co
	createLineGraph("co", "mon_co_s", county_select, "mon_co", "hour_dayofweek_county.json", mon_w, mon_h, margin_mon, "Mon");
	createLineGraph("co", "tue_co_s", county_select, "tue_co", "hour_dayofweek_county.json", tue_w, tue_h, margin_tue, "Tue");
	createLineGraph("co", "wed_co_s", county_select, "wed_co", "hour_dayofweek_county.json", wed_w, wed_h, margin_wed, "Wed");
	createLineGraph("co", "thu_co_s", county_select, "thu_co", "hour_dayofweek_county.json", thu_w, thu_h, margin_thu, "Thu");
	createLineGraph("co", "fri_co_s", county_select, "fri_co", "hour_dayofweek_county.json", fri_w, fri_h, margin_fri, "Fri");
	createLineGraph("co", "sat_co_s", county_select, "sat_co", "hour_dayofweek_county.json", sat_w, sat_h, margin_sat, "Sat");
	createLineGraph("co", "sun_co_s", county_select, "sun_co", "hour_dayofweek_county.json", sun_w, sun_h, margin_sun, "Sun");

	// ozone
	createLineGraph("ozone", "mon_ozone_s", county_select, "mon_ozone", "hour_dayofweek_county.json", mon_w, mon_h, margin_mon, "Mon");
	createLineGraph("ozone", "tue_ozone_s", county_select, "tue_ozone", "hour_dayofweek_county.json", tue_w, tue_h, margin_tue, "Tue");
	createLineGraph("ozone", "wed_ozone_s", county_select, "wed_ozone", "hour_dayofweek_county.json", wed_w, wed_h, margin_wed, "Wed");
	createLineGraph("ozone", "thu_ozone_s", county_select, "thu_ozone", "hour_dayofweek_county.json", thu_w, thu_h, margin_thu, "Thu");
	createLineGraph("ozone", "fri_ozone_s", county_select, "fri_ozone", "hour_dayofweek_county.json", fri_w, fri_h, margin_fri, "Fri");
	createLineGraph("ozone", "sat_ozone_s", county_select, "sat_ozone", "hour_dayofweek_county.json", sat_w, sat_h, margin_sat, "Sat");
	createLineGraph("ozone", "sun_ozone_s", county_select, "sun_ozone", "hour_dayofweek_county.json", sun_w, sun_h, margin_sun, "Sun");
});


// window.addEventListener("resize", redraw);

