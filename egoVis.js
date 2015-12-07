// system conf and gloabal constancts

// global varebles
var selEgo = null;

var color = d3.scale.category20();

// svg attributes


// BulbVis
var widthBuble = 720, heightBuble = 947;
var padddingBuble = 100;

var ego_node_fill    = "#e34a33";
var alter_node_fill  = "#2b8cbe";
var node_onclick_fill= "#de2d26";

var link_in_stroke  = "#a6bddb";
var link_out_stroke = "#fdbb84";
var link_io_stroke  = "#addd8e";    

// ForceVis
var widthForce = 720, heightForce = 947;
var padddingForce = 100;

// ChordVis
var widthChord = 273, heightChord = 307;
var padddingChord = 100;

// StatVis
var widthStat = 273, heightStat = 307;
var padddingStat = 100;


//SVG initialization
var svgForce  = d3.select("#mainVis").append("svg").attr("width",widthForce).attr("height",heightForce);
var svgBulbel = d3.select("#mainVis").append("svg").attr("width",widthBuble).attr("height",heightBuble);
var svgChord  = d3.select("#ChordVis").append("svg").attr("width",widthChord).attr("height",heightChord);
var svgStat   = d3.select("#statVis").append("svg").attr("width",widthStat).attr("height",heightStat);

// Reading data and Vis
d3.json("data/egoTemplate.json", 
	function(error,data) {
        if (error) {return console.log(error);}
        else {
            selEgo = data.egos[0]

            //console.log(selEgo.nodes);
            //console.log("link data");
            //console.log(selEgo.link_ego2alter);
    function createSvgEl(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);};
// tooltips
            var tooltip = d3.select("#mainVis").append("div").attr("class","tooltip").style("opacity",0);
// BubleVis


// ForceVis 
            var force = d3.layout.force()
				          .nodes(selEgo.nodes)
				          .links(selEgo.link_ego2alter)
			              .size([widthForce,heightForce])
				          .linkDistance(300)
				          .charge(-500)
				          .start();

            var link = svgForce.selectAll(".link")
                               .data(selEgo.link_ego2alter)
                               .enter().append("line")
                               .attr("class", "link")
                               .style("stroke",function (d) {if (d.ltype == 0) {return link_io_stroke;} 
                               	                            else if (d.ltype == 1) {return link_out_stroke;}
                               	                            else if (d.ltype == 2) {return link_in_stroke;} })
                               .style("stroke-width",function(d){return d.w+4;})
                               .text(function(d){return d.w;});
            
            //var nodes = svgForce.selectAll(".nodes").data(selEgo).enter();
                                
           var nodes= svgForce.selectAll(".node")
                              .data(selEgo.nodes)
                              .enter()
                              .append(function(d, i) { if (d.ntype == 1) {return createSvgEl("circle");} 
               	                                       else {return createSvgEl("rect"); }  });

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
					            .call(force.drag);
                                console.log("ego:")
                                console.log(nodes)

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

/*	        var nodes = ego.conact(alters)
	                       .call(force.drag);*/

/*            var nodes = svgForce.selectAll(".node")
                                .data(selEgo.nodes)
                                .enter().append( "circle" )
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
*/

/*						        console.log("nodes")
						        console.log(nodes)*/

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
								
            force.on("tick", function(){ 
            	     ego.attr("x", function(d) {return d.x-50;})
            	        .attr("y", function(d) {return d.y-40;});

                     alters.attr("cx",function(d){ return d.x; })
                          .attr("cy",function(d){ return d.y; });

                     n_label.attr("x", function(d){ return d.x; })
                            .attr("y", function(d){ return d.y; });

                     link.attr("x1",function(d){ return d.source.x; })
                         .attr("y1",function(d){ return d.source.y; })
                         .attr("x2",function(d){ return d.target.x; })
                         .attr("y2",function(d){ return d.target.y; });
                     });
// ChordVis


// StatVis


                   
}});
