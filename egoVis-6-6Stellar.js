//<![CDATA[

// system conf and gloabal constancts

// global varebles
var selEgo = null;
// ntype: type,
/* 0: ego;
   1: innet out alter;           4: outnet out alter;
   2: innet bi-direction alter;  5: outnet bi-direction alter;
   3: innet in alter;            3: outnet in alter;
*/
var layer_Color = d3.scale.quantize()
                           .domain([1,2,3])
                           .range(["#7bccc4","#a8ddb5","#ccebc5"])
/*var node_Color1 = d3.scale.quantize()
                          .domain([0,1,2,3,4,5,6])
                          .range(["#d95f02","#386cb0","#66a61e","#e6ab02","#386cb0","#66a61e","#e6ab02"])*/
var node_Color1 = d3.scale.quantize()
                          .domain([0,1,2,3,4,5,6])
                          .range(["#d95f02","#386cb0","#66a61e","#e6ab02","#77A0D4","#99DE4A","#FDCF4E"])

var node_Color2 = d3.scale.quantize()
                          .domain([0,1,2,3,4,5,6])
                          .range(["#fc8d62","#8da0cb","#a6d854","#fff2ae","#8da0cb","#a6d854","#fff2ae"])
/*var node_Color2 = d3.scale.quantize()
                          .domain([0,1,2,3,4,5,6])
                          .range(["#fc8d62","#8da0cb","#a6d854","#fff2ae","#D2D9EA","#D1EBA8","#FFFBE5"])*/

var tip_stellar1 = d3.tip()
            .attr('class', 'd3-tip')
            .offset([0, 0])
            .html(function(d) {
                return "id: <span style='color:orangered'>" + d.name + " " +d.ntype +" " + "</span>\n" + "  ofreq: <span style='color:orangered'>" + d.outf + "</span>\n"+"  odura: <span style='color:orangered'>" + d.outd + "</span>" +"  ifreq: <span style='color:orangered'>" + d.inf + "</span>\n"+"  idura: <span style='color:orangered'>" + d.ind + "</span>";
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

var l1_stellar = 0.4; var l2_stellar = 0.7; lego_stellar = 0.3;
var width_stellar = 947, height_stellar = 720;
var r_stellar = Math.min(width_stellar,height_stellar) / 2;
var arc_bg = [{radius_in: r_stellar*l1_stellar, radius_out: r_stellar*l1_stellar, startAngle: 0, endAngle: 2*Math.PI},
              {radius_in: r_stellar*l2_stellar, radius_out: r_stellar*l2_stellar, startAngle: 0, endAngle: 2*Math.PI}];
var node_Size = d3.scale.quantize()
                        .domain([0,1,2,3,4,5,6])
                        .range([r_stellar*0.16,r_stellar*0.05,r_stellar*0.08,r_stellar*0.05,r_stellar*0.05,r_stellar*0.08,r_stellar*0.05]);
var node_font_Size = d3.scale.quantize()
                       .domain([0,1,2,3,4,5,6])
                       .range([30,20,20,20,20,20,20]);
var link_length_stellar = d3.scale.quantize()
                            .domain([1,2,3,4,5,6])
                            .range([r_stellar*0.7,r_stellar*0.4,r_stellar*0.7,r_stellar*0.7,r_stellar*0.4,r_stellar*0.7])
var node_charge_stellar = d3.scale.quantize()
                            .domain([0,1,2,3,4,5,6])
                            .range([-5000,-50,-50,-50,-50,-50,-50])
var layer_mid_stellar = d3.scale.quantize()
                          .domain([1,2,3,4,5,6])
                          .range([0.3*r_stellar,0.6*r_stellar,0.9*r_stellar,0.3*r_stellar,0.6*r_stellar,0.9*r_stellar])
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
var svgStellar  = d3.select("#mainVis")
                    .append("svg")
                    .attr("width",width_stellar)
                    .attr("height",height_stellar);

/*//BubleVis
var svgBulbel = d3.select("#mainVis").append("svg").attr("width",widthBuble).attr("height",heightBuble);*/

/*//ChordVis
var svgChord  = d3.select("#ChordVis").append("svg").attr("width",widthChord).attr("height",heightChord);*/

/*//StatVis
var svgStat   = d3.select("#statVis").append("svg").attr("width",widthStat).attr("height",heightStat);*/

// tooltips

// function definition

// Reading data and Vis
d3.json("data/ego500.json",  
	function(error,data) {
        if (error) {return console.log(error);}
        else {

// StellarVis
// Select Ego
        var n = 124;
      
        selEgo = data.egos[n].nodes;
        selEgolinks = data.egos[n].links;
        
        selEgo.sort(function(a,b){return a.outf < b.outf ? 1 : -1;})
        var nodes_data_stellar = selEgo;
        var edges_data_stellar = new Array();
        edges_data_stellar = selEgo.filter( function(d) {return d.ntype != 0});
        edges_data_stellar.map(function (d) {
                                 d.source = 0;
                                 d.target = d.name;
                               });
        // console.log(edges_data_stellar)

        var nodes_d_ego_stellar = selEgo.filter( function(d) {return d.ntype == 0});
        var nodes_d_i_o_stellar = selEgo.filter( function(d) {return d.ntype == 1});
        var nodes_d_i_b_stellar = selEgo.filter( function(d) {return d.ntype == 2});
        var nodes_d_i_i_stellar = selEgo.filter( function(d) {return d.ntype == 3});
        var nodes_d_o_o_stellar = selEgo.filter( function(d) {return d.ntype == 4});
        var nodes_d_o_b_stellar = selEgo.filter( function(d) {return d.ntype == 5});
        var nodes_d_o_i_stellar = selEgo.filter( function(d) {return d.ntype == 6});
        
        var len_i_o_stellar = nodes_d_i_o_stellar.length
        var len_i_b_stellar = nodes_d_i_b_stellar.length
        var len_i_i_stellar = nodes_d_i_i_stellar.length
        var len_o_o_stellar = nodes_d_o_o_stellar.length
        var len_o_b_stellar = nodes_d_o_b_stellar.length
        var len_o_i_stellar = nodes_d_o_i_stellar.length
        
        var angle_i_stellar = Math.PI / (len_i_o_stellar+len_i_b_stellar+len_i_i_stellar+3);
        var angle_o_stellar = Math.PI / (len_o_o_stellar+len_o_b_stellar+len_o_i_stellar+3);
        
        var nodes_d_i_stellar = nodes_d_i_o_stellar.concat(nodes_d_i_b_stellar, nodes_d_i_i_stellar);
        var nodes_d_o_stellar = nodes_d_o_o_stellar.concat(nodes_d_o_b_stellar, nodes_d_o_i_stellar);

        var nodes_d_ego_stellar = new Array( {} );
        nodes_d_ego_stellar[0].ntype = nodes_data_stellar[0].ntype;
        nodes_d_ego_stellar[0].name  = nodes_data_stellar[0].name;
        nodes_d_ego_stellar[0].outd  = nodes_data_stellar[0].outd;
        nodes_d_ego_stellar[0].outf  = nodes_data_stellar[0].outf;
        nodes_d_ego_stellar[0].ind   = nodes_data_stellar[0].ind;
        nodes_d_ego_stellar[0].inf   = nodes_data_stellar[0].inf;
        nodes_d_ego_stellar[0].layer = nodes_data_stellar[0].layer;
        nodes_d_ego_stellar[0].r =  r_stellar*lego_stellar;
        nodes_d_ego_stellar[0].xx = 0;
        nodes_d_ego_stellar[0].yy = 0;
        console.log(r_stellar*lego_stellar)
        nodes_d_i_stellar.map ( 
                    function(d,i){
                        d.angle = 2*Math.PI - angle_i_stellar * (i + 1/2);
                        if (d.ntype == 2) {d.r = Math.abs(r_stellar*l1_stellar*Math.sin(angle_i_stellar/2))} else {d.r = Math.abs(r_stellar*l2_stellar*Math.sin(angle_i_stellar/2))};
                        if (d.ntype == 2) {d.xx = r_stellar*l1_stellar*Math.cos(d.angle)} else {d.xx = r_stellar*l2_stellar*Math.cos(d.angle)};
                        if (d.ntype == 2) {d.yy = r_stellar*l1_stellar*Math.sin(d.angle)} else {d.yy = r_stellar*l2_stellar*Math.sin(d.angle)};
                      });
        
        nodes_d_o_stellar.map ( 
                    function(d,i){
                        d.angle = angle_o_stellar * (i + 1/2);
                        if (d.ntype == 5) {d.r = Math.abs(r_stellar*l1_stellar*Math.sin(angle_i_stellar/2))} else {d.r = Math.abs(r_stellar*l2_stellar*Math.sin(angle_i_stellar/2))};
                        if (d.ntype == 5) {d.xx = r_stellar*l1_stellar*Math.cos(d.angle)} else {d.xx = r_stellar*l2_stellar*Math.cos(d.angle)};
                        if (d.ntype == 5) {d.yy = r_stellar*l1_stellar*Math.sin(d.angle)} else {d.yy = r_stellar*l2_stellar*Math.sin(d.angle)};
                      });
        

        nodes_d_all_stellar = nodes_d_ego_stellar.concat(nodes_d_i_stellar, nodes_d_o_stellar)
        //console.log(nodes_d_all_stellar)
        //console.log(nodes_d_all_stellar)

// Stellar Background
        svgStellar.append("rect")
                  .attr("width",width_stellar)
                  .attr("height",height_stellar)
                  .attr("fill","k")
        var orbit_center = [width_stellar / 2,height_stellar / 2]
        var arc_stellar = d3.svg.arc()
                            .innerRadius(function (d) {return d.radius_in;})
                            .outerRadius(function (d) {return d.radius_out;});
        var layers_path = svgStellar.selectAll("path")
                                    .data(arc_bg).enter()
                                    .append("path")
                                    .attr("d", function (d) {return arc_stellar(d);})
                                    .attr("transform", "translate(" + orbit_center[0] + "," + orbit_center[1] + ")")
                                    .attr("fill", "k")
                                    .attr("stroke","#bdbdbd")
                                    .attr("stroke-width",3)
                                    .attr("stroke-dasharray", 5,5);
// Ego force layout 
        svgStellar.call(tip_stellar1);
      //  console.log(tip_stellar1)

        var force_stellar = d3.layout.force()
                      .nodes(nodes_d_all_stellar)
                      .links(edges_data_stellar)
                      .size([width_stellar,height_stellar])
                      .linkDistance(function(d) {return 300;})
                      //function(d) {return node_position_stellar(d.ntype);}
                      .charge(function(d) {return node_charge_stellar(d.ntype);})
                      .friction(0.2)
                      .gravity(0.3)
                      .theta(0.5)
                      .on("tick",tick_stellar)
                      .start(); 

        var drag_hold = force_stellar.drag().on("dragstart",function(d,i){ d.fixed = true;}); 
        var links_stellar = svgStellar.selectAll(".link")
                             .data(edges_data_stellar)
                             .enter().append("line")
                             .attr("class", "link")
                             .style("stroke",function (d) { return node_Color2(d.ntype);})
                             .style("stroke-width", 5)
                             .style("opacity",1)
                             .attr("transform", "translate(" + width_stellar / 2 + "," + height_stellar / 2 + ")  rotate (-90)");
        //console.log(edges_data_stellar)
//bond nodes                                
// Alter nodes initialize
        var nodes_stellar = svgStellar.selectAll(".node")
                            .data(nodes_d_all_stellar).enter()
                            .append("circle")
                            .attr("r",function (d) {return d.r;})
                            .attr("fill",function (d) {return node_Color1(d.ntype);})
                            .attr("transform", "translate(" + width_stellar / 2 + "," + height_stellar / 2 + ") rotate (-90)")
                            .on("mouseover", function(d,i) {
                                              tip_stellar1.show(d);
                                              //if (d.ntype!=0) {
                                              //links_stellar.style("opacity", function(edge) { if( edge.target == d ) {return 1.0;} else {return 0; }});}
                                              })
                            .on("mouseout" , function(d,i) {
                                              tip_stellar1.hide(d);
                            //                  if (d.ntype!=0){
                           //                   tip_stellar1.hide;
                            //                  links_stellar.style("opacity", function(edge) { if( edge.target == d ) {return 0.0;} else {return 0;}});}
                                             })
                            .on("dblclick",function(d,i){ d.fixed = false;})  
                            .call(drag_hold);
//console.log(nodes_stellar.attr(ntype()))
// Node lable initialize
        var nlabel_stellar = svgStellar.selectAll("text")
                                  .data(nodes_data_stellar)
                                  .enter().append("text")
                                  .style("fill","snow")
                                  .style("font-family","Agency FB")
                                  .style("font-weight","bold")
                                  .style("font-size",function(d) {return d.r;})
                                  .attr("opacity",function(d) {if (d.layer == 3) {return 0;} else {return 1;}})
                                  .attr("text-anchor","middle")
                                  .attr("transform", "translate(" + width_stellar / 2 + "," + height_stellar / 2 + ") rotate (-90)")
                                  .text(function(d){ return d.name;});
// layout computing 

        console.log(nodes_d_all_stellar)
// update positions of all elements in force layout               
            function tick_stellar (){ 
                    // set nodes bordaries
                     nodes_stellar.attr("cx",function(d) { return d.xx;})
                                  .attr("cy",function(d) { return d.yy;});

                     nlabel_stellar.attr("x", function(d) { return d.xx;})
                                   .attr("y", function(d) { return d.yy;});

                     links_stellar.attr("x1",function(d) { return d.source.xx;})
                                  .attr("y1",function(d) { return d.source.yy;})
                                  .attr("x2",function(d) { return d.target.xx;})
                                  .attr("y2",function(d) { return d.target.yy;});
                     //orbit_center = [nodes_stellar[0].cx, nodes_stellar[0].cy]
                     
                     //layers_path.attr("transform", "translate(" + nodes_d_all_stellar[0].x + "," + nodes_d_all_stellar[0].y + ") ")


                     /*nodes_stellar.attr("cx",function(d) { if (d.ntype == 0) {return 0;} else {return d.x - width_stellar / 2;}})
                                  .attr("cy",function(d) { if (d.ntype == 0) {return 0;} else {return d.y - height_stellar / 2;}});

                     nlabel_stellar.attr("x", function(d) { if (d.ntype == 0) {return 0;} else {return d.x - width_stellar / 2;}})
                                   .attr("y", function(d) { if (d.ntype == 0) {return 0;} else {return d.y - height_stellar / 2;}});

                     links_stellar.attr("x1",function(d) { return 0;})
                                  .attr("y1",function(d) { return 0;})
                                  .attr("x2",function(d) { return d.target.x - width_stellar / 2; })
                                  .attr("y2",function(d) { return d.target.y - height_stellar / 2; });

                     nodes_data_stellar.forEach(function(d,i){
                                       if (d.ntype != 0) {
                                       var r = layer_mid_stellar(d.ntype);
                                       var c = Math.sqrt(Math.pow(d.x,2) + Math.pow(d.y,2));
                                       d.x = r * d.x / c   + width_stellar / 2 ;
                                       d.y = r * d.y / c   + height_stellar / 2;};});*/
                     };

// BubleVis

// ChordVis

// StatVis

}});
// ]]>