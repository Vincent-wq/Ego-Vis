// system conf and gloabal constancts

// global varebles
var selEgo = null;
// ntype: type,
/* 0: ego,
   1: out alter, 
   2: bi-direction alter,
   3: in alter.

*/
var layer_Color = d3.scale.quantize()
                           .domain([1,2,3])
                           .range(["#7bccc4","#a8ddb5","#ccebc5"])
var node_Color1 = d3.scale.quantize()
                          .domain([0,1,2,3])
                          .range(["#d95f02","#386cb0","#66a61e","#e6ab02"])
var node_Color2 = d3.scale.quantize()
                          .domain([0,1,2,3])
                          .range(["#fc8d62","#8da0cb","#a6d854","#fff2ae"])

var tip_stellar1 = d3.tip()
            .attr('class', 'd3-tip')
            .offset([0, 0])
            .html(function(d) {
                return d.name + " weight: <span style='color:orangered'>" + d.w1 + "</span>";
             });

var tip_stellar2 = d3.tip()
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

/*// Aster Vis
var widthAster = 947, heightAster = 680;
var radius_Aster = Math.min(widthAster,heightAster)/2;
var inner_Radius_Aster = radius_Aster*0.3;
var mid_Radius_Aster1 = radius_Aster*0.49;
var mid_Radius_Aster2 = radius_Aster*0.51;
var egoSize = radius_Aster*0.28;*/

// StellarVis
var width_stellar = 947, height_stellar = 680;
var radius_stellar = Math.min(width_stellar,height_stellar) / 2;
var arc_bg = [{radius_in: radius_stellar*0.16, radius_out: radius_stellar*0.49, startAngle: 0, endAngle: 2*Math.PI},
              {radius_in: radius_stellar*0.51, radius_out: radius_stellar*0.79, startAngle: 0, endAngle: 2*Math.PI},
              {radius_in: radius_stellar*0.81, radius_out: radius_stellar*1.00, startAngle: 0, endAngle: 2*Math.PI}];
var node_Size = d3.scale.quantize()
                        .domain([0,1,2,3])
                        .range([radius_stellar*0.14,radius_stellar*0.08,radius_stellar*0.08,radius_stellar*0.08]);
var node_font_Size = d3.scale.quantize()
                        .domain([0,1,2,3])
                        .range([30,20,20,20]);
var node_position_stellar = d3.scale.quantize()
                              .domain([1,2,3])
                              .range([radius_stellar*0.25,radius_stellar*0.5,radius_stellar*0.8])
var node_charge_stellar = d3.scale.quantize()
                              .domain([0,1,2,3])
                              .range([-1500,-1000,-1000,-1000])
console.log(radius_stellar)
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

/*//AsterVis
var svgAster = d3.select("#mainVis").append("svg").attr("width",widthAster).attr("height",heightAster)*/

// StellarVis
var svgStellar  = d3.select("#mainVis").append("svg").attr("width",width_stellar).attr("height",height_stellar);

/*//BubleVis
var svgBulbel = d3.select("#mainVis").append("svg").attr("width",widthBuble).attr("height",heightBuble);*/

/*//ChordVis
var svgChord  = d3.select("#ChordVis").append("svg").attr("width",widthChord).attr("height",heightChord);*/

/*//StatVis
var svgStat   = d3.select("#statVis").append("svg").attr("width",widthStat).attr("height",heightStat);*/

// tooltips



// function definition

// Reading data and Vis
d3.json("data/egoTemplate.json",  
	function(error,data) {
        if (error) {return console.log(error);}
        else {

// StellarVis

// Select Ego
        selEgo = data.egos[0].nodes;
        selEgo.sort(function(a,b){return a.w1 < b.w1 ? 1 : -1;})
        var nodes_data_stellar = selEgo;
        var edges_data_stellar = selEgo.filter( function(d) {return d.ntype != 0});
        for (var t in edges_data_stellar)  {console.log(t);edges_data_stellar[t].source = parseInt(0); edges_data_stellar[t].target = parseInt(t)+1;};
        console.log("node:");
        console.log(nodes_data_stellar);
        console.log("edge:");
        console.log(edges_data_stellar);

// Stellar Background
        var arc_stellar = d3.svg.arc()
                            .innerRadius(function (d) {return d.radius_in;})
                            .outerRadius(function (d) {return d.radius_out;});
        
        var layers_path = svgStellar.selectAll("path")
                                    .data(arc_bg).enter()
                                    .append("path")
                                    .attr("d", function (d) {return arc_stellar(d);})
                                    .attr("transform", "translate(" + width_stellar / 2 + "," + height_stellar / 2 + ")")
                                    .attr("fill", function (d,i) {return layer_Color(i+1);})
                                    .attr("stroke","gray");
// Ego force layout 
        

        svgStellar.call(tip_stellar1);
        svgStellar.call(tip_stellar2);

        var force_stellar = d3.layout.force()
                      .nodes(nodes_data_stellar)
                      .links(edges_data_stellar)
                      .size([width_stellar,height_stellar])
                      .linkDistance(function(d) {return node_position_stellar(d.ntype);})
                      .charge(function(d) {return node_charge_stellar(d.ntype);})
                      //.chargeDistance(120)
                      .friction(0.9)
                      .gravity(0)
                      .theta(0.1)
                      .on("tick",tick_stellar)
                      .start();                  
        
        var link_stellar = svgStellar.selectAll(".link")
                             .data(edges_data_stellar)
                             .enter().append("line")
                             .attr("class", "link")
                             .style("stroke",function (d) { return node_Color2(d.ntype);})
                             .style("stroke-width", 10);
//bond nodes                                
// Alter nodes initialize
        var nodes_stellar = svgStellar.selectAll(".node")
                            .data(nodes_data_stellar).enter()
                            .append("circle")
                            .attr("r",function (d) {return node_Size(d.ntype);})
                            .attr("fill",function (d) {return node_Color1(d.ntype);})
                            .on('mouseover', tip_stellar1.show)
                            .on('mouseout' , tip_stellar1.hide)
                            .call(force_stellar.drag);
                      console.log("nodes:");
                      console.log(nodes_stellar);

// Node lable initialize
        var nlabel_stellar = svgStellar.selectAll("text")
                                  .data(nodes_data_stellar)
                                  .enter().append("text")
                                  .style("fill","k")
                                  .style("font-size",function(d) {return node_font_Size(d.ntype);})
                                  .attr("text-anchor","middle")
                                  .text(function(d){ return d.name;});
                                //console.log("node_label")
                                //console.log(n_label);
// update positions of all elements in force layout               
            function tick_stellar (){ 

                    // set nodes bordaries
                     nodes_data_stellar.forEach(function(d,i){
                                       d.x = d.x - 40/2 < 0     ? 40/2 : d.x ;
                                       d.x = d.x + 40/2 > width_stellar ? width_stellar - 40/2 : d.x ;
                                       d.y = d.y - 40/2 < 0      ? 40/2 : d.y ;
                                       d.y = d.y + 40/2 + 40 > height_stellar ? height_stellar - 40/2 - 40 : d.y ;
                                     });
                     nodes_stellar.attr("cx",function(d) { if (d.ntype==0 ) {return width_stellar/2;}  else {return d.x;}})
                                  .attr("cy",function(d) { if (d.ntype==0 ) {return height_stellar/2;} else {return d.y;}});

                     nlabel_stellar.attr("x", function(d) { if (d.ntype==0 ) {return width_stellar/2;}  else {return d.x;}})
                                   .attr("y", function(d) { if (d.ntype==0 ) {return height_stellar/2;} else {return d.y;}});

                     link_stellar.attr("x1",function(d) { return width_stellar/2;} )
                                 .attr("y1",function(d) { return height_stellar/2;})
                                 .attr("x2",function(d) { return d.target.x; })
                                 .attr("y2",function(d) { return d.target.y; });
                     };


// BubleVis

// ChordVis

// StatVis

}});