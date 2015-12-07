// system conf and gloabal constancts
var width=window.screen.width*0.7 , height=window.screen.availHeight*0.7;
var widthForce = 720, heightForce = 947;
var paddding = 100;
var color = d3.scale.category20();

// global varebles
var selEgo = null;

//SVG initialization
var svgForce  = d3.select("#mainVis").append("svg").attr("width",width).attr("height",height);
var svgBulbel = d3.select("#xx").append("svg").attr("width",width).attr("height",height);
var svgChord  = d3.select("#xx").append("svg").attr("width",width).attr("height",height);
var svgStat   = d3.select("#xx").append("svg").attr("width",width).attr("height",height);

// Reading data and Vis
d3.json("data/egoTemplate.json", 
	function(error,data) {
        if (error) {return console.log(error);}
        else {
            selEgo = data.egos[0]

            //console.log(selEgo.nodes);
            console.log("link data");
            console.log(selEgo.link_ego2alter);

            var tooltip = d3.select("#mainVis").append("div").attr("class","tooltip").style("opacity",0);
  
// force layout 
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
                               .style("stroke",function (d) {if (d.ltype == 0) {return "coral";} else {return "steelblue";}})
                               .style("stroke-width",function(d){return d.w+4;})
                               .text(function(d){return d.w;});

            var nodes = svgForce.selectAll(".node")
                                .data(selEgo.nodes)
                                .enter().append( "circle" )
                                .attr("r",function (d) {if (d.ntype == 0) {return 120;} else {return 40;}})
                                .attr("fill",function (d) {if (d.ntype == 0) {return "coral";} else {return "steelblue";}})
					            .on("mouseover",function(d){ 
					            	d3.select(this).attr("fill","red");
					                tooltip.html("Size  "+"<br />="+d.w).style("left", (d3.event.pageX)+"px")
					                                           .style("top", (d3.event.pageY+20)+"px")
					                                           .style("opacity",1.0)})
					            .on("mousemove", function(d) {
					            	tooltip.style("left", (d3.event.pageX)+"px")
					                       .style("top", (d3.event.pageY+20)+"px")
					            })
					            .on("mouseout",function(d) {
					            	tooltip.style("opacity",0)})
						        .call(force.drag);
						        console.log("nodes")
						        console.log(nodes)

		    var n_label = svgForce.selectAll("text")
                                  .data(selEgo.nodes)
                                  .enter().append("text")
                                  .style("fill","k")
                                  .style("font-size",function(d){if (d.ntype == 0) {return 48;} else {return 30;}})
                                  .attr("dx", 0)
                                  .attr("dy", 0)
                                  .attr("text-anchor","middle")
                                  .text(function(d){ return d.name;});
                                console.log("node_label")
                                console.log(n_label);
								
            force.on("tick", function(){ 
                     nodes.attr("cx",function(d){ return d.x; })
                          .attr("cy",function(d){ return d.y; });
                     n_label.attr("x", function(d){ return d.x; })
                            .attr("y", function(d){ return d.y; });
                     link.attr("x1",function(d){ return d.source.x; })
                         .attr("y1",function(d){ return d.source.y; })
                         .attr("x2",function(d){ return d.target.x; })
                         .attr("y2",function(d){ return d.target.y; });
                     });
                   
}});
