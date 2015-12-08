// system conf and gloabal constancts

// global varebles
var selEgo = null;

var node_Color1 = d3.scale.quantize()
                          .domain([0,1,2,3])
                          .range(["#d95f02","#386cb0","#66a61e","#e6ab02"])
var node_Color2 = d3.scale.quantize()
                          .domain([0,1,2,3])
                          .range(["#fc8d62","#8da0cb","#a6d854","#fff2ae"])

var tip1 = d3.tip()
            .attr('class', 'd3-tip')
            .offset([0, 0])
            .html(function(d) {
                return d.data.name + " weight: <span style='color:orangered'>" + d.data.w1 + "</span>";
             });
var tip2 = d3.tip()
            .attr('class', 'd3-tip')
            .offset([0, 0])
            .html(function(d) {
                return d.data.name + " total weights: <span style='color:orangered'>" + d.data.w2 + "</span>";
             });
// svg attributes


/*// BulbVis
var widthBuble = 680, heightBuble = 947;
var padddingBuble = 100;*/

/*// ForceVis
var widthForce = 947, heightForce = 680;
var ego_node_fill    = "#e34a33";
var alter_node_fill  = "#2b8cbe";
var node_onclick_fill= "#de2d26";
var link_in_stroke  = "#a6bddb";
var link_out_stroke = "#fdbb84";
var link_io_stroke  = "#addd8e";    */

/*// DonutVis
var widthDonut = 947, heightDonut = 680;
var radiusDonut = Math.min(widthDonut,heightDonut)/2;
var outRadiusDonut = radiusDonut*0.6,
    inRadiusDonut = radiusDonut*0.54;
var egoSize = radiusDonut*0.5
var egoFill = "#727194"
var colorDonut = d3.scale.ordinal().range(["#98abc5", "#8a89a6", "#7b6888"]);
*/

// Aster Vis
var widthAster = 947, heightAster = 680;
var radius_Aster = Math.min(widthAster,heightAster)/2;
var inner_Radius_Aster = radius_Aster*0.3;
var mid_Radius_Aster1 = radius_Aster*0.49;
var mid_Radius_Aster2 = radius_Aster*0.51;
var egoSize = radius_Aster*0.28;
var colorDonut = d3.scale.ordinal().range(["#98abc5", "#8a89a6", "#7b6888"]);

/*// ChordVis
var widthChord = 307, heightChord = 273;
var padddingChord = 100;*/

/*// StatVis
var widthStat = 307, heightStat = 273;
var padddingStat = 100;*/


//SVG initialization
// Vis Areas
/*// ForceVis
var svgForce  = d3.select("#mainVis").append("svg").attr("width",widthForce).attr("height",heightForce);*/
/*//DonutVis
var svgDonut  = d3.select("#mainVis").append("svg").attr("width",widthDonut).attr("height",heightDonut)*/


//AsterVis
var svgAster = d3.select("#mainVis").append("svg").attr("width",widthAster).attr("height",heightAster)

/*//BubleVis
var svgBulbel = d3.select("#mainVis").append("svg").attr("width",widthBuble).attr("height",heightBuble);*/

/*//ChordVis
var svgChord  = d3.select("#ChordVis").append("svg").attr("width",widthChord).attr("height",heightChord);*/

/*//StatVis
var svgStat   = d3.select("#statVis").append("svg").attr("width",widthStat).attr("height",heightStat);*/

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
                               .style("stroke-width",function(d){return d.w1+4;})
                               .text(function(d){return d.w1;});
//bond nodes                                
            var nodes= svgForce.selectAll(".node")
                               .data(selEgo.nodes)
                               .enter()
                               .append(function(d, i) { if (d.ntype == 0) {return createSvgEl("rect");} 
               	                                       else {return createSvgEl("circle"); }  });
// ego node initialize
            var ego   =  svgForce.selectAll("rect")
                                 .attr("width",100)
                                 .attr("height",80)
                                 .attr("rx",5)
                                 .attr("ry",5)
                                 .attr("fill",ego_node_fill)
                                 .on("mouseover",function(d){ 
					             	d3.select(this).attr("fill",node_onclick_fill);
					                tooltip.html("Size  "+"<br />="+d.w1).style("left", (d3.event.pageX)+"px")
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
					                tooltip.html("Size  "+"<br />="+d.w1).style("left", (d3.event.pageX)+"px")
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

                     alters.attr("cx",function(d) { return d.x; })
                           .attr("cy",function(d) { return d.y; });

                     n_label.attr("x", function(d) { return d.x; })
                            .attr("y", function(d) { return d.y; });

                     link.attr("x1",function(d) { return d.source.x; })
                         .attr("y1",function(d) { return d.source.y; })
                         .attr("x2",function(d) { return d.target.x; })
                         .attr("y2",function(d) { return d.target.y; });
                     });*/

/*// DonutVis 
            selEgo = data.egos[0].nodes
            var alter_w1 = new Array,
                alter_w2 = new Array,
                alter_w21 = new Array;
            for (var t in selEgo) {alter_w1.push(selEgo[t].w1);alter_w2.push(selEgo[t].w2);};
            for (var t in selEgo) {alter_w21.push(selEgo[t].w1/selEgo[t].w2);};

            var scale100_1 = d3.scale.linear()
                                     .domain([0,Math.max.apply(null, alter_w2)])
                                     .range([0,0.5])
            //console.log(alter_w21);

            var arcDonut = d3.svg.arc()
                             .outerRadius(outRadiusDonut)
                             .innerRadius(inRadiusDonut);

            var pieDonut = d3.layout.pie()
                                    .sort(d3.descending)
                                    .value(function(d) { return d.w1;});

            var ego    = selEgo.filter(function(d){return d.ntype == 0})
            var alters = selEgo.filter(function(d){return d.ntype != 0})
// pie layout
            var altersDonut = svgDonut.selectAll(".arcDonut")
                                       .data(pieDonut(alters))
                                       .enter().append("g")
                                       .attr("class","arcDonut")
                                       .attr("transform", "translate(" + widthDonut / 2 + "," + heightDonut / 2 + ")");
// outer line
                            altersDonut.append("line")
                                       .attr("stroke","#F38D49")
                                       .attr("stroke-width", 150)
                                       .attr("x1", function(d) {return arcDonut.centroid(d)[0]*1.01;})
                                       .attr("y1", function(d) {return arcDonut.centroid(d)[1]*1.01;})
                                       .attr("x2", function(d) {return arcDonut.centroid(d)[0]*(1.01+(scale100_1(d.data.w2)));})
                                       .attr("y2", function(d) {return arcDonut.centroid(d)[1]*(1.01+(scale100_1(d.data.w2)));});
// ego circle
                            svgDonut.selectAll(".circleDonut")
                                    .data(ego).enter().append("g")
                                    .append("circle")
                                    .attr("class","circleDonut")
                                    .attr("r", egoSize)
                                    .attr("cx", widthDonut/2)
                                    .attr("cy", heightDonut/2)
                                    .attr("fill",egoFill);
// alters arcs
                            altersDonut.append("line")
                                       .attr("stroke","#F38D49")
                                       .attr("stroke-width", 150)
                                       .attr("x1", function(d) {return arcDonut.centroid(d)[0]*1;})
                                       .attr("y1", function(d) {return arcDonut.centroid(d)[1]*1;})
                                       .attr("x2", function(d) {return arcDonut.centroid(d)[0]*(1-(scale100_1(d.data.w1)));})
                                       .attr("y2", function(d) {return arcDonut.centroid(d)[1]*(1-(scale100_1(d.data.w1)));});
// ego labels
                            svgDonut.selectAll(".egoTextDonut")
                                    .data(ego).enter().append("g")
                                    .append("text")
                                    .attr("dx",widthDonut/2)
                                    .attr("dy",heightDonut/2)
                                    .attr("font-size",48)
                                    .attr("font-family", "sans-serif")
                                    .attr("text-anchor","middle")
                                    .text(function (d) {return d.name;});
// aler arc coloring
            var alterArc  =  altersDonut.append("path")
                      .attr("d",arcDonut)
                      .style("fill", function(d) {return colorDonut(d.data.ntype);});
            //console.log(alterArc)
// alter label formating
            var altersText=  altersDonut.append("text")
                      .attr("transform", function(d) { return "translate(" + arcDonut.centroid(d) + ")"; })
                      .attr("dy", ".35em")
                      .text( function(d) {return d.data.name;} );

                      console.log(altersDonut);*/

//Aster Plot

        
        selEgo = data.egos[0].nodes;
        var alter_w21 = new Array;
        for (var t in selEgo) {alter_w21.push(selEgo[t].w2/selEgo[t].w1);};
        var MAXW2 = Math.max.apply(null, alter_w21);


        var ego    = selEgo.filter(function(d){return d.ntype == 0})
        var alters = selEgo.filter(function(d){return d.ntype != 0})

        var pie = d3.layout.pie()
                           .sort(d3.descending)
                           .value(function(d) { return d.w1; });

        var out_Arc_Aster = d3.svg.arc()
                              .innerRadius(mid_Radius_Aster2)
                              .outerRadius(function (d) { return (radius_Aster - mid_Radius_Aster2) * (d.data.w2/MAXW2/12) + mid_Radius_Aster2; });

        var in_Arc_Aster = d3.svg.arc()
                                 .innerRadius(inner_Radius_Aster)
                                 .outerRadius(mid_Radius_Aster1);

        var altersAster = svgAster.selectAll(".arcAster")
                                  .data(pie(alters))
                                  .enter().append("gAster")
                                  .attr("transform", "translate(" + widthAster / 2 + "," + heightAster / 2 + ")");
        svgAster.call(tip1);
        svgAster.call(tip2);

        var path = svgAster.selectAll(".solidArc")
                      .data(pie(alters))
                      .enter().append("path")
                      .attr("fill", function(d) { return node_Color1(d.data.ntype); })
                      .attr("class", "solidArc")
                      .attr("stroke", "gray")
                      .attr("d", in_Arc_Aster)
                      .on('mouseover', tip1.show)
                      .on('mouseout', tip1.hide).attr("transform", "translate(" + widthAster / 2 + "," + heightAster / 2 + ")");

        var outerPath = svgAster.selectAll(".outlineArc")
                           .data(pie(alters))
                           .enter().append("path")
                           .attr("fill", function(d) { return node_Color2(d.data.ntype); })
                           .attr("stroke", "gray")
                           .attr("class", "outlineArc")
                           .on('mouseover', tip2.show)
                           .on('mouseout', tip2.hide)
                           .attr("d", out_Arc_Aster).attr("transform", "translate(" + widthAster / 2 + "," + heightAster / 2 + ")");  

                            svgAster.selectAll(".circleDonut")
                                    .data(ego).enter().append("g")
                                    .append("circle")
                                    .attr("class","circleDonut")
                                    .attr("r", egoSize)
                                    .attr("cx", widthAster/2)
                                    .attr("cy", heightAster/2)
                                    .attr("fill",node_Color1(0));
// ego labels
                            svgAster.selectAll(".egoTextDonut")
                                    .data(ego).enter().append("g")
                                    .append("text")
                                    .attr("dx",widthAster/2)
                                    .attr("dy",heightAster/2)
                                    .attr("font-size",40)
                                    .attr("font-style", "bold")
                                    .attr("font-family", "sans-serif")
                                    .attr("text-anchor","middle")
                                    .text(function (d) {return d.name;});
// ChordVis


// StatVis

           }
                
               
}
);