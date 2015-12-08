// system conf and gloabal constancts

// global varebles
var selEgo = null;

var color = d3.scale.category20();

// svg attributes


// BulbVis
var widthBuble = 680, heightBuble = 947;
var padddingBuble = 100;

// ForceVis
var widthForce = 947, heightForce = 680;
var padddingForce = 100;
var ego_node_fill    = "#e34a33";
var alter_node_fill  = "#2b8cbe";
var node_onclick_fill= "#de2d26";
var link_in_stroke  = "#a6bddb";
var link_out_stroke = "#fdbb84";
var link_io_stroke  = "#addd8e";    

// DonutVis
var widthDonut = 947, heightDonut = 680;
var padddingDonut = 100;
var radiusDonut = Math.min(widthDonut,heightDonut)/2;
var outRadiusDonut = radiusDonut-40,
    inRadiusDonut = radiusDonut-120;
var egoSize = 200
var egoFill = "#727194"
var colorDonut = d3.scale.ordinal().range(["#98abc5", "#8a89a6", "#7b6888"]);

// ChordVis
var widthChord = 307, heightChord = 273;
var padddingChord = 100;

// StatVis
var widthStat = 307, heightStat = 273;
var padddingStat = 100;


//SVG initialization
// Vis Areas
/*var svgForce  = d3.select("#mainVis").append("svg").attr("width",widthForce)
                                                   .attr("height",heightForce);*/

var svgDonut  = d3.select("#mainVis").append("svg").attr("width",widthDonut)
                                                   .attr("height",heightDonut)
                                                   .append("g")
                                                   .attr("transform", "translate(" + widthDonut / 2 + "," + heightDonut / 2 + ")");
var arcDonut = d3.svg.arc()
                 .outerRadius(outRadiusDonut)
                 .innerRadius(inRadiusDonut);

var pieDonut = d3.layout.pie()
                        .sort(null)
                        .value(function(d) { return d.w; });


var svgBulbel = d3.select("#mainVis").append("svg").attr("width",widthBuble)
                                                   .attr("height",heightBuble);

var svgChord  = d3.select("#ChordVis").append("svg").attr("width",widthChord)
                                                    .attr("height",heightChord);

var svgStat   = d3.select("#statVis").append("svg").attr("width",widthStat)
                                                   .attr("height",heightStat);
// tooltips
var tooltip = d3.select("#mainVis").append("div").attr("class","tooltip").style("opacity",0);


// function definition
// Force Layout append different shapes
function createSvgEl(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);};

// Reading data and Vis
d3.json("data/egoTemplate.json",  
	function(error,data) {
        if (error) {return console.log(error);}
        else {
                   
// BubleVis

/*// ForceVis 
            selEgo = data.egos[0] 
            var force = d3.layout.force()
				          .nodes(selEgo.nodes)
				          .links(selEgo.link_ego2alter)
			              .size([widthForce,heightForce])
				          .linkDistance(200)
				          .charge(-100)
				          .chargeDistance(120)
				          .friction(0.2)
				          .gravity(0.2)
				          .theta(0.8)
				          .start();
// bond links and initialize
            var link = svgForce.selectAll(".link")
                               .data(selEgo.link_ego2alter)
                               .enter().append("line")
                               .attr("class", "link")
                               .style("stroke",function (d) {if (d.ltype == 0) {return link_io_stroke;} 
                               	                            else if (d.ltype == 1) {return link_out_stroke;}
                               	                            else if (d.ltype == 2) {return link_in_stroke;} })
                               .style("stroke-width",function(d){return d.w+4;})
                               .text(function(d){return d.w;});
//bond nodes                                
            var nodes= svgForce.selectAll(".node")
                               .data(selEgo.nodes)
                               .enter()
                               .append(function(d, i) { if (d.ntype == 1) {return createSvgEl("circle");} 
               	                                       else {return createSvgEl("rect"); }  });
// ego node initialize
            var ego   =  svgForce.selectAll("rect")
                                 .attr("width",100)
                                 .attr("height",80)
                                 .attr("rx",5)
                                 .attr("ry",5)
                                 .attr("fill",ego_node_fill)
                                 .on("mouseover",function(d){ 
					             	d3.select(this).attr("fill",node_onclick_fill);
					                tooltip.html("Size  "+"<br />="+d.w).style("left", (d3.event.pageX)+"px")
					                                           .style("top", (d3.event.pageY+20)+"px")
					                                           .style("opacity",1.0)})
					             .on("mousemove", function(d) {
					            	tooltip.style("left", (d3.event.pageX)+"px")
					                       .style("top", (d3.event.pageY+20)+"px")
					                })
					             .on("mouseout",function(d) {
					            	  d3.select(this).attr("fill",function (d) {if (d.ntype == 0) {return ego_node_fill;} else {return alter_node_fill;} });
					            	  tooltip.style("opacity",0)})
					           // .call(force.drag);
                                  console.log("ego:")
                                  console.log(nodes)
// Alter nodes initialize
           var alters = svgForce.selectAll("circle")
                                .attr("r",function (d) {if (d.ntype == 0) {return 120;} else {return 40;}})
                                .attr("fill",function (d) {if (d.ntype == 0) {return ego_node_fill;} else {return alter_node_fill;}})
					            .on("mouseover",function(d){ 
					            	d3.select(this).attr("fill",node_onclick_fill);
					                tooltip.html("Size  "+"<br />="+d.w).style("left", (d3.event.pageX)+"px")
					                                           .style("top", (d3.event.pageY+20)+"px")
					                                           .style("opacity",1.0)})
					            .on("mousemove", function(d) {
					            	tooltip.style("left", (d3.event.pageX)+"px")
					                       .style("top", (d3.event.pageY+20)+"px")
					            })
					            .on("mouseout",function(d) {
					            	d3.select(this).attr("fill",function (d) {if (d.ntype == 0) {return ego_node_fill;} else {return alter_node_fill;} });
					            	tooltip.style("opacity",0)})
					            .call(force.drag);
					            console.log("alters:");
					            console.log(nodes);
// Node lable initialize
		    var n_label = svgForce.selectAll("text")
                                  .data(selEgo.nodes)
                                  .enter().append("text")
                                  .style("fill","k")
                                  .style("font-size",function(d){if (d.ntype == 0) {return 48;} else {return 30;}})
                                  .attr("dx", 0)
                                  .attr("dy", 0)
                                  .attr("text-anchor","middle")
                                  .text(function(d){ return d.name;});
                                //console.log("node_label")
                                //console.log(n_label);
// update positions of all elements in force layout								
            force.on("tick", function(){ 
            	     ego.attr("x", function(d) {return d.x-50;})
            	        .attr("y", function(d) {return d.y-40;});

                     alters.attr("cx",function(d){ return d.x; })
                           .attr("cy",function(d){ return d.y; });

                     n_label.attr("x", function(d){  return d.x; })
                            .attr("y", function(d){  return d.y; });

                     link.attr("x1",function(d){ return d.source.x; })
                         .attr("y1",function(d){ return d.source.y; })
                         .attr("x2",function(d){ return d.target.x; })
                         .attr("y2",function(d){ return d.target.y; });
                     });*/

// DonutVis 
            selEgo = data.egos[0].nodes

            var ego    = selEgo.filter(function(d){return d.ntype == 0})
            var alters = selEgo.filter(function(d){return d.ntype == 1})

            console.log(ego)
            var gDonutAlters = svgDonut.selectAll(".arcDonut")
                                       .data(pieDonut(alters))
                                       .enter().append("g")
                                       .attr("class","arcDonut")

            var egoDonut = svgDonut.selectAll(".circleDonut")
                                   .data(ego).enter().append("g")
                                   .append("circle")
                                   .attr("class","circleDonut")
                                   .attr("r", egoSize)
                                   .attr("cx", 0)
                                   .attr("cy", 0)
                                   .attr("fill",egoFill)

            var egoText =  svgDonut.selectAll(".egoTextDonut")
                                   .data(ego).enter().append("g")
                                   .append("text")
                                   .attr("font-size",48)
                                   .attr("font-family", "sans-serif")
                                   .attr("text-anchor","middle")
                                   .text(function (d) {return d.name;})
                                 

            console.log(gDonutAlters)

                gDonutAlters.append("path")
                      .attr("d",arcDonut)
                      .style("fill", function(d) {return colorDonut(d.data.ntype);});

                gDonutAlters.append("text")
                      .attr("transform", function(d) { return "translate(" + arcDonut.centroid(d) + ")"; })
                      .attr("dy", ".35em")
                      .text( function(d) {return d.data.name;} );



// ChordVis


// StatVis

           }
                
               
}
);