// var color = {CO:"#bdbdbd", Ozone:"#9ecae1", NO2:"#bcbddc", SO2:"#fa9fb5"};

// var county = "Los Angeles";
// var season = "4";
// piechart(county, season);

// function piechart(county, season){

// 	width = 500;
// 	height = 500;

// 	var svg = d3.select("body")
// 				.select("#dash_pie")
// 	            .append("svg")
// 	            .attr("width", width)
// 	            .attr("height", height);

// 	var radius = Math.min(width, height) / 2 - 15,
// 	    g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// 		var pie = d3.pie()
// 			.sort(null)
// 	    	.value(function(d) { 
// 	    		return d[county][season]
// 	    	});
	    	
// 		var path = d3.arc()
// 			.outerRadius(radius - 10)
// 		    .innerRadius(0);

// 	d3.json("dataofPie.json", function(error, data) {
// 	  if (error) throw error;

// 		var arc = g.selectAll(".arc")
// 			.data(pie(data))
// 	      	.enter().append("g")
// 	      	.attr("class", "arc");

// 	    arc.append("path")
// 	    	.attr("d", path)
// 	        .attr("fill", function(d) { return color[d.data.pollutant]; });
		

// 		console.log(pie(data))

// 		var legend = svg.selectAll(".legend")
// 	        .data(pie(data))
// 	        .enter().append("g")
// 	        .attr("class", "legend")
// 	        .attr("transform", function(d, i) { return "translate(10," + i * 25 + ")"; });

// 		legend.append("rect")
// 			.attr("x", width - 180)
// 			.attr("y", 10)
// 	        .attr("width", 18)
// 	        .attr("height", 18)
// 	        .style("fill", function (d) {
// 	        	return color[d.data.pollutant]});

// 	    // draw legend text
// 	    legend.append("text")
// 	        .attr("x", width - 150)
// 	        .attr("y", 20)
// 	        .attr("dy", ".35em")
// 	        .style("text-anchor", "start")
// 	        .text(function(d) { return d.data.pollutant;});

// 	});
// }