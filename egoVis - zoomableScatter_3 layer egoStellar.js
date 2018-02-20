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
/*var node_Color1 = d3.scale.quantize()
                          .domain([0,1,2,3,4,5,6])
                          .range(["#d95f02","#386cb0","#66a61e","#e6ab02","#386cb0","#66a61e","#e6ab02"])*/
var c0 = "black"
var c25i= d3.scale.quantize().domain([0.01,0.03,0.08,0.1]).range(["#fdd0a2","#fdae6b","#fd8d3c","#f16913","#d94801"])
var c25o= d3.scale.quantize().domain([0.01,0.03,0.08,0.1]).range(["#dadaeb","#bcbddc","#9e9ac8","#807dba","#6a51a3"])
var c14= d3.scale.quantize().domain([2.1,4.1,9]).range(["#bdd7e7","#6baed6","#3182bd","#08519c"])
var c36= d3.scale.quantize().domain([2.1,4.1,9]).range(["#b8e186","#7fbc41","#4d9221","#276419"])

/*
var c1= d3.scale.quantize().domain([2,3.5,9]).range(["#eff3ff","#bdd7e7","#6baed6","#2171b5"])
var c2= d3.scale.quantize().domain([2,3.5,9]).range(["#fee5d9","#fcae91","#fb6a4a","#cb181d"])
var c3= d3.scale.quantize().domain([2,3.5,9]).range(["#edf8e9","#bae4b3","#74c476","#238b45"])
var c4= d3.scale.quantize().domain([2,3.5,9]).range(["#eff3ff","#bdd7e7","#6baed6","#2171b5"])
var c5= d3.scale.quantize().domain([2,3.5,9]).range(["#feedde","#fdbe85","#fd8d3c","#d94701"])
var c6= d3.scale.quantize().domain([2,3.5,9]).range(["#edf8e9","#bae4b3","#74c476","#238b45"])
*/

function nodeColorDic (ntype,w) {
                           switch (ntype) {
                            case 0: return c0;     break; case 1: return c14(w); break; case 3: return c36(w); break;
                            case 4: return c14(w); break; case 6: return c36(w); break; default: return "snow"; break;
                           }; };                         
var node_Color2 = d3.scale.quantize()
                          .domain([0,1,2,3,4,5,6])
                          .range(["#fc8d62","#8da0cb","#a6d854","#fff2ae","#8da0cb","#a6d854","#fff2ae"])
var node_Color3 = d3.scale.quantize()
                          .domain([0,1,2,3,4,5,6])
                          .range(["#fc8d62","#8da0cb","#a6d854","#fff2ae","#8da0cb","#a6d854","#fff2ae"])
/*var node_Color2 = d3.scale.quantize()
                          .domain([0,1,2,3,4,5,6])
                          .range(["#fc8d62","#8da0cb","#a6d854","#fff2ae","#D2D9EA","#D1EBA8","#FFFBE5"])*/
var scatterNum = d3.scale.threshold()
                   .domain([3,5,10,25,50,100,200,3000,30000])
                   .range(["#a50026","#d73027","#f46d43","#fdae61","#fee08b","#d9ef8b","#a6d96a","#66bd63","#1a9850","#006837"]);

var tip_stellar1 = d3.tip()
            .attr('class', 'd3-tip')
            .offset([0, 0])
            .html(function(d) {
                return "id: <span style='color:orangered'>" + d.name + " " +d.ntype +" " + "</span>\n" + "  ofreq: <span style='color:orangered'>" + d.outf + "</span>\n"+"  odura: <span style='color:orangered'>" + d.outd + "</span>" +"  ifreq: <span style='color:orangered'>" + d.inf + "</span>\n"+"  idura: <span style='color:orangered'>" + d.ind + "</span>";
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
var width_stellar = 960, height_stellar = 720;
var padding_stellar = {"top": 0, "right": 0, "bottom": 0, "left": 240}
var axisW_stellar = width_stellar-padding_stellar.right-padding_stellar.left; var axisH_stellar = height_stellar-padding_stellar.top-padding_stellar.bottom;

var l1_stellar = 0.6; var l2_stellar = 0.75; var l3_stellar = 0.9; lego_stellar = 0.1;
var r_stellar = Math.min(width_stellar,height_stellar) / 2;

var arc_bg = [{radius_in: r_stellar*l1_stellar, radius_out: r_stellar*l1_stellar, startAngle: 0, endAngle: 2*Math.PI},
              {radius_in: r_stellar*l2_stellar, radius_out: r_stellar*l2_stellar, startAngle: 0, endAngle: 2*Math.PI},
              {radius_in: r_stellar*l3_stellar, radius_out: r_stellar*l3_stellar, startAngle: 0, endAngle: 2*Math.PI}];

var node_charge_stellar = d3.scale.quantize()
                            .domain([0,1,2,3,4,5,6])
                            .range([-5000,-50,-50,-50,-50,-50,-50])

// StatVis
var width_sts = 960, height_sts = 720;
var padding_sts = {"top": 80, "right": 140, "bottom": 140, "left": 120}
var axisWidth_sts = width_sts-padding_sts.right-padding_sts.left; var axisHeight_sts = height_sts-padding_sts.top-padding_sts.bottom;

// wholeVis
var width_whole = 1920; var height_whole = 720;
var padding_whole = {"top": 100, "right": 140, "bottom": 60, "left": 120}
var xAxisWidth_whole = width_whole-padding_whole.right-padding_whole.left; var yAxisHeight_whole = height_whole-padding_whole.top-padding_whole.bottom;

/*// ChordVis
var widthChord = 307, heightChord = 273;
var padddingChord = 100;*/

//SVG initialization
// Vis Areas
/*// ForceVis
var svgForce  = d3.select("#mainVis").append("svg").attr("width",widthForce).attr("height",heightForce);*/

/*//DonutVis
var svgDonut  = d3.select("#mainVis").append("svg").attr("width",widthDonut).attr("height",heightDonut)*/

/*//AsterVis
var svgAster = d3.select("#mainVis").append("svg").attr("width",widthAster).attr("height",heightAster)*/

// StellarVis
var svgStellar  = d3.select("#stellarVis")
                    .append("svg")
                    .attr("width",width_stellar)
                    .attr("height",height_stellar);
//StatVis
var svgSts  = d3.select("#scatterVis")
                .append("svg")
                .attr("width", width_sts)
                .attr("height",height_sts);
// whole Vis
var svgWhole  = d3.select("#wholeVis")
                  .append("svg")
                  .attr("width", width_whole)
                  .attr("height",height_whole);
/*//BubleVis
var svgBulbel = d3.select("#mainVis").append("svg").attr("width",widthBuble).attr("height",heightBuble);*/

/*//ChordVis
var svgChord  = d3.select("#ChordVis").append("svg").attr("width",widthChord).attr("height",heightChord);*/

/*//StatVis
var svgStat   = d3.select("#statVis").append("svg").attr("width",widthStat).attr("height",heightStat);*/

// tooltips

// function definition
var totalN = 100;

// Reading data and Vis

d3.json("data/ego3000_6500.json",  
	function(error,data) {
        if (error) {return console.log(error);}
        else {
        
//console.log(scatter_plot)
// Stellar Vis
// ego specified n
        var n = Math.round(Math.random()*totalN);
// statistical specifications
        var k =0;

// Stellar 
   // back-ground ( Space and Orbit )
        svgStellar.append("rect")
                  .attr("width",width_stellar)
                  .attr("height",height_stellar)
                  .attr("fill","k");

        var arc_stellar = d3.svg.arc()
                            .innerRadius(function (d) {return d.radius_in;})
                            .outerRadius(function (d) {return d.radius_out;});
        var layers_path = svgStellar.selectAll("path")
                                    .data(arc_bg).enter()
                                    .append("path")
                                    .attr("d", function (d) {return arc_stellar(d);})
                                    .attr("transform", "translate(" + (axisW_stellar / 2 + padding_stellar.left) +"," + (axisH_stellar / 2 + padding_stellar.top) + ")")
                                    .attr("stroke","#bdbdbd")
                                    .attr("stroke-width",1)
                                    .attr("stroke-dasharray", 5,5);
// Scatter 
   //back-ground
        svgSts.append("rect")
              .attr("width",width_sts)
              .attr("height",height_sts)
              .attr("fill","k");
   // legends
        var  legend_sts =  svgSts.selectAll("g").data(scatterNum.range()).enter()
                                 .append("rect")
                                 .attr("width",50)
                                 .attr("height",30)
                                 .attr("x", width_sts-100)
                                 .attr("y",  function (d,i) { return height_sts-padding_sts.bottom-260-32*i;})
                                 .attr("fill", function (d) { return d;})
                                 .attr("opacity", 1.0);

        var legTextData = []; var orileg = scatterNum.domain();
        for (i=0; i<(orileg.length+1); i++) {
             if (i == 0) 
                {legTextData.push("<"+orileg[i]); } 
             else if (i==orileg.length)  
                {legTextData.push(">"+orileg[i-1]); }
             else 
                {legTextData.push(orileg[i-1]+"-"+orileg[i]); }; };
        //console.log(legTextData)

        var  legtxt_sts =  svgSts.selectAll("g").data(legTextData).enter()
                                 .append("text")
                                 .attr("x", function (d) {return width_sts-210;})
                                 //.attr("dx",function (d,i) {return -Math.round(Math.log10(d))*10;})
                                 .attr("y",  function (d,i) {return height_sts-padding_sts.bottom-240-32*i;})
                                 .attr("fill", "snow")
                                 .style("font-size", 18)
                                 .text(function (d) {return d;}) 
// Whole vis 
   // back-ground
        svgWhole.append("rect")
                .attr("width",width_whole)
                .attr("height",height_whole)
                .attr("fill","k");



// Scatter Vis draw
        drawScatter(k,data);
// Star and Planet Vis draw
        drawStellar(n,data);
     
// BubleVis

// ChordVis

}});

function drawScatter(k,data){
  // Scatter Vis 
        // StatVis
// sts- [ Bi, o_ind, o_ofreq, o_odura, oAW, Theta ]
        var dataSts = {};
        dataSts.name = ["inD", "ofreq", "odura", "Bi", "oAW","SBD"];
        dataSts.data = [data.sts.o_ind, data.sts.o_ofreq, data.sts.o_odura, data.sts.Bi, data.sts.oAW, data.sts.Theta];
        var targetData = dataSts.data[k]; var targetName = dataSts.name[k];
        //console.log(targetData)
// deleting old elements
        var oldNodes =  svgSts.selectAll(".scatter_c"); oldNodes.remove();
        var oldXaxis =  svgSts.selectAll(".xAxis"); oldXaxis.remove();
        var oldYaxis =  svgSts.selectAll(".yAxis"); oldYaxis.remove();
        var oldinfotext =  svgSts.selectAll(".infotext"); oldinfotext.remove();
// parameters 
        var rX = 1.0; rY = 1.0; var bandPos = [-1, -1]; var pos;
        var scatterXdomain = [0, rX*d3.max(targetData,function (d) {return d[0];})];
        var scatterYdomain = [0, rY*d3.max(targetData,function (d) {return d[1];})];
        // d3.min(targetData,function (d) {return d[0];})    d3.min(targetData,function (d) {return d[1];})
        var scatterZarea = {x1: scatterXdomain[0], y1: scatterYdomain[0], x2: scatterXdomain[1], y2: scatterYdomain[1]};
        var scatterDrag = d3.behavior.drag();
// info Texts        
        var  infoTextSts = svgSts.append("text").attr("class","infotext").attr("x",160).attr("y",padding_sts.top*1.5)
                                 .attr("font-family","Agency FB" ).attr("font-size",80).attr("fill","snow").attr("font-weight","bold").text(targetName);

        var button_rect_sts  =  svgSts.selectAll(".inforect").data(dataSts.name).enter()
                                 .append("rect")
                                 .attr("class","inforect")
                                 .attr("width",80)
                                 .attr("height",50)
                                 .attr("opacity",1)
                                 .attr("x",function (d,i) {return padding_sts.left+100+i*((axisWidth_sts+20.0)/6-20); })
                                 .attr("y",function (d) {return height_sts-0.5*padding_sts.bottom;});

        var button_text_sts  =  svgSts.selectAll("g").data(dataSts.name).enter()
                                 .append("text")
                                 .attr("class","infotext")
                                 .attr("font_Size",64)
                                 .attr("x",function (d,i) {return padding_sts.left+140+i*((axisWidth_sts+20.0)/6-20); })
                                 .attr("dx",function (d) {return -d.length/2*10;})
                                 .attr("y",function (d) {return height_sts-0.22*padding_sts.bottom;})
                                 .text(function (d) {return d;});
        
        var button_func_sts  =  svgSts.selectAll("g").data(dataSts.name).enter()
                                 .append("rect")
                                 .attr("class","inforect")
                                 .attr("width",80)
                                 .attr("height",50)
                                 .attr("opacity",0)
                                 .attr("x",function (d,i) {return padding_sts.left+100+i*((axisWidth_sts+20.0)/6-20); })
                                 .attr("y",function (d) {return height_sts-0.5*padding_sts.bottom;})
                                 .on("click",function (d,i) { console.log(i);k = i; drawScatter(k,data);});

        var button_zoom_sts  =  svgSts.append("circle")
                                      .attr("class","inforect")
                                      .attr("r", 50)
                                      .attr("cx", width_sts - 0.5*padding_sts.right)
                                      .attr("cy", height_sts- 0.5*padding_sts.bottom)
                                      ;
    
        var button_zoomtext_sts  =  svgSts.append("text")
                                      .attr("class","infotext")
                                      .attr("width", 80)
                                      .attr("height", 50)
                                      .attr("x", width_sts  - 0.775*padding_sts.right)
                                      .attr("y", height_sts - 0.45*padding_sts.bottom)
                                      .text("Zoom Out");

        var button_zoomf_sts  =  svgSts.append("circle")
                                      .attr("class","inforect")
                                      .attr("r", 50)
                                      .attr("opacity",0)
                                      .attr("cx", width_sts - 0.5*padding_sts.right)
                                      .attr("cy", height_sts- 0.5*padding_sts.bottom)
                                      .on("click", function () { zoomOut(); } )
                                      ;
                                
// axies
    // scale        
        var xScale_sts = d3.scale.linear().domain(scatterXdomain).range([0,axisWidth_sts]);
        var yScale_sts = d3.scale.linear().domain(scatterYdomain).range([axisHeight_sts,0]);

    // axis    
        var xAxis_sts = d3.svg.axis().scale(xScale_sts).orient("bottom").outerTickSize(4.5).tickPadding(6);
        var yAxis_sts = d3.svg.axis().scale(yScale_sts).orient("left").outerTickSize(4.5).tickPadding(6);
        
        var band = svgSts.append("rect")
                         .attr("width", 0)
                         .attr("height", 0)
                         .attr("x", 0)
                         .attr("y", 0)
                         .attr("class", "band");

        var scatter_xaxis = svgSts.append("g")
                                  .attr("transform","translate("+padding_sts.left+","+(height_sts-padding_sts.bottom+10)+")")
                                  .attr("class","xAxis")
                                  .call(xAxis_sts);
        
        var scatter_yaxis = svgSts.append("g")
                                  .attr("transform","translate("+(padding_sts.left-10)+","+padding_sts.top+")")
                                  .attr("class","yAxis")
                                  .call(yAxis_sts);
// scatter plot    
        var scatter_plot = svgSts.selectAll("g")
                                 .data(targetData).enter()
                                 .append("circle")
                                 .attr("class","scatter_c")
                                 .attr("fill",function (d) { return scatterNum(d[2]);})
                                 .attr("cx", padding_sts.left)
                                 .attr("cy", height_sts - padding_sts.bottom)
                                 .attr("r",  3)
                                 .attr("opacity",1)
                                 .transition()
                                 .ease("cubic")
                                 .duration(3000)
                                 .attr("cx",  function (d) { return padding_sts.left + xScale_sts(d[0]);})
                                 .attr("cy",  function (d) { return padding_sts.top  + yScale_sts(d[1]);})
                                 ;


        var zOverlay = svgSts.append("rect")
                             .attr("x",padding_sts.left-10)
                             .attr("y",padding_sts.top+10)
                             .attr("width", axisWidth_sts)
                             .attr("height", axisHeight_sts)
                             .attr("class", "zoomOverlay")
                             .call(scatterDrag);

        //zoom();
    
        scatterDrag.on("dragend", function () {
          var pos = d3.mouse(this);
          var x1 = xScale_sts.invert(bandPos[0]-padding_sts.left); var x2 = xScale_sts.invert(pos[0]-padding_sts.left);
          var y1 = yScale_sts.invert(pos[1]-padding_sts.top); var y2 = yScale_sts.invert(bandPos[1]-padding_sts.top);
          //var x1 = bandPos[0]; var x2 = pos[0];

          if (x1 < x2) { scatterZarea.x1 = x1; scatterZarea.x2 = x2; }
                  else { scatterZarea.x1 = x2; scatterZarea.x2 = x1; }
          if (x1 < x2) { scatterZarea.y1 = y1; scatterZarea.y2 = y2; } 
                  else { scatterZarea.y1 = y2; scatterZarea.y2 = y1; }

        bandPos = [-1, -1];
        d3.select(".band").transition()
            .attr("width", 0)
            .attr("height", 0)
            .attr("x", bandPos[0])
            .attr("y", bandPos[1]) ;
        zoom();}
        );
    
        scatterDrag.on("drag", function () {
          
          var pos = d3.mouse(this);
          
          if (pos[0] < bandPos[0]) {d3.select(".band").attr("transform", "translate(" + (pos[0]) + "," + bandPos[1] + ")"); }
          if (pos[1] < bandPos[1]) {d3.select(".band").attr("transform", "translate(" + (pos[0]) + "," + pos[1] + ")"); }
          if (pos[1] < bandPos[1] && pos[0] > bandPos[0]) {d3.select(".band").attr("transform", "translate(" + (bandPos[0]) + "," + pos[1] + ")"); }
    
          //set new position of band when user initializes drag
          if (bandPos[0] == -1) {bandPos = pos; d3.select(".band").attr("transform", "translate(" + bandPos[0] + "," + bandPos[1] + ")"); }

          d3.select(".band").transition().duration(1)
                            .attr("width",  Math.abs(bandPos[0] - pos[0]))
                            .attr("height", Math.abs(bandPos[1] - pos[1]));}
        );
    
    function zoom() {
      //recalculate domains
        if(scatterZarea.x1 > scatterZarea.x2) {xScale_sts.domain([scatterZarea.x2, scatterZarea.x1]); } else {xScale_sts.domain([scatterZarea.x1, scatterZarea.x2]);}
        if(scatterZarea.y1 > scatterZarea.y2) {yScale_sts.domain([scatterZarea.y2, scatterZarea.y1]); } else {yScale_sts.domain([scatterZarea.y1, scatterZarea.y2]);}
        //update axis and redraw lines

        var scatterTrans = svgSts.transition().duration(500);
        scatterTrans.select(".xAxis").call(xAxis_sts);
        scatterTrans.select(".yAxis").call(yAxis_sts);
        d3.selectAll(".scatter_c").filter(function (d) {return d[0] < scatterZarea.x1 || d[0] > scatterZarea.x2 || d[1] < scatterZarea.y1 || d[1] > scatterZarea.y2; })
                                  .attr("opacity",0);

        d3.selectAll(".scatter_c").filter(function (d) {return d[0] >= xScale_sts.domain()[0] && d[0] <= xScale_sts.domain()[1] && d[1] >= yScale_sts.domain()[0] && d[1] <= yScale_sts.domain()[1]; })
                           .attr("fill",function (d) { return scatterNum(d[2]);})
                           .attr("r",  3)
                           .attr("opacity",1)
                           .attr("cx",  function (d) { return padding_sts.left + xScale_sts(d[0]);})
                           .attr("cy",  function (d) { return padding_sts.top  + yScale_sts(d[1]);})
                           ;
        }
    
    var zoomOut = function () {
      xScale_sts.domain(scatterXdomain); yScale_sts.domain(scatterYdomain);
      var scatterTrans = svgSts.transition().duration(750);
          scatterTrans.select(".xAxis").call(xAxis_sts);
          scatterTrans.select(".yAxis").call(yAxis_sts);
        
        d3.selectAll(".scatter_c")
                           .attr("fill",function (d) { return scatterNum(d[2]);})
                           .attr("r",  3)
                           .attr("opacity",1)
                           .attr("cx",  function (d) { return padding_sts.left + xScale_sts(d[0]);})
                           .attr("cy",  function (d) { return padding_sts.top  + yScale_sts(d[1]);})
                           ;
    };
    var sts_g = svgSts.selectAll("g").call(zoom);
};

function drawStellar(n,data){
   
// deleting old elements
        var oldNodes =  svgStellar.selectAll(".node")
        var oldLinks =  svgStellar.selectAll(".link")
        var oldLabels = svgStellar.selectAll(".nl_text")
        var oldInfoTexts = svgStellar.selectAll(".infotext")
        //console.log(oldNodes)
        oldNodes.remove()
        oldLinks.remove()
        oldLabels.remove()
        oldInfoTexts.remove()
// info Texts        
        var visText = data.egos[n].nodeSts;

         svgStellar.append("rect").attr("width",180)
                                  .attr("height",50)
                                  .attr("x",50)
                                  .attr("y",30)
                                  .attr("opacity",1)
                                  .attr("fill","royalblue")
         svgStellar.append("text").attr("x",60)
                                  .attr("y",74)
                                  .text("RandNode")
                                  .attr("fill","snow")
                                  .style("font-family","Agency FB")
                                  .style("font-weight","bold")
                                  .attr("opacity",1)
                                  .attr("font-size",48);
         svgStellar.append("rect").attr("width",180)
                                  .attr("height",50)
                                  .attr("x",50)
                                  .attr("y",30)
                                  .attr("opacity",0)
                                  .attr("fill","royalblue")
                                  .on("click",function () { n = Math.round(Math.random()*totalN); drawStellar(n,data);});

         svgStellar.selectAll(".infotext").data(visText)
                                    .enter().append("text")
                                    .attr("class","infotext")
                                    .attr("x",40)
                                    .attr("y",function (d,i)  {return 250+60*i;} )
                                    .attr("opacity",1)
                                    .text(function (d,i) {return d.name+" : "+d.value;})
                                    .style("fill","snow")
                                    .style("font-family","Agency FB")
                                    .style("font-weight","Bold")
                                    .style("font-size",36)
                                    .attr("infotext");

                        svgStellar.append("text")
                                  .attr("class","infotext")
                                  .attr("x",260)
                                  .attr("y",74)
                                  .text(n)
                                  .attr("fill","royalblue")
                                  .style("font-family","Agency FB")
                                  .style("font-weight","bold")
                                  .attr("opacity",1)
                                  .attr("font-size",40);
// Stellar Vis
        selEgo = data.egos[n].nodes;
        selEgolinks = data.egos[n].links;
        selEgo.sort(function(a,b){return a.outf < b.outf ? 1 : -1;});
        // console.log(edges_data_stellar)
        var nodes_d_ego_stellar = selEgo.filter( function(d) {return d.ntype == 0});

        var nodes_l1i_stellar  = selEgo.filter( function(d) {return d.ntype == 2 });
        var nodes_l1o_stellar  = selEgo.filter( function(d) {return d.ntype == 5 });

        var nodes_l2io_stellar = selEgo.filter( function(d) {return (d.ntype == 1 && (d.outf+d.inf) >= 2);});
        var nodes_l2ii_stellar = selEgo.filter( function(d) {return (d.ntype == 3 && (d.outf+d.inf) >= 2);});
        nodes_l2ii_stellar.sort(function(a,b){return a.inf < b.inf ? 1 : -1;});
        var nodes_l2oo_stellar = selEgo.filter( function(d) {return (d.ntype == 4 && (d.outf+d.inf) >= 2);});
        var nodes_l2oi_stellar = selEgo.filter( function(d) {return (d.ntype == 6 && (d.outf+d.inf) >= 2);});
        nodes_l2oi_stellar.sort(function(a,b){return a.inf < b.inf ? 1 : -1;});

        var nodes_l3io_stellar = selEgo.filter( function(d) {return (d.ntype == 1 && (d.outf+d.inf) <  2);});
        var nodes_l3ii_stellar = selEgo.filter( function(d) {return (d.ntype == 3 && (d.outf+d.inf) <  2);});
        var nodes_l3oo_stellar = selEgo.filter( function(d) {return (d.ntype == 4 && (d.outf+d.inf) <  2);});
        var nodes_l3oi_stellar = selEgo.filter( function(d) {return (d.ntype == 6 && (d.outf+d.inf) <  2);});

        var angle_2    = Math.PI / nodes_l1i_stellar.length;  var angle_5    = Math.PI / nodes_l1o_stellar.length;
        var angle_l2_1 = Math.PI / 2.0 / nodes_l2io_stellar.length; var angle_l2_3 = Math.PI / 2.0 / nodes_l2ii_stellar.length ;
        var angle_l2_4 = Math.PI / 2.0 / nodes_l2oo_stellar.length; var angle_l2_6 = Math.PI / 2.0 / nodes_l2oi_stellar.length ;
        var angle_l3_1 = Math.PI / 2.0 / nodes_l3io_stellar.length; var angle_l3_3 = Math.PI / 2.0 / nodes_l3ii_stellar.length ;
        var angle_l3_4 = Math.PI / 2.0 / nodes_l3oo_stellar.length; var angle_l3_6 = Math.PI / 2.0 / nodes_l3oi_stellar.length ;
        
        nodes_d_ego_stellar[0].r =  r_stellar*lego_stellar;
        nodes_d_ego_stellar[0].xx = 0;
        nodes_d_ego_stellar[0].yy = 0;
        var ofsum = nodes_d_ego_stellar[0].outf; var ifsum = nodes_d_ego_stellar[0].inf

        nodes_l1i_stellar.map ( 
                    function(d,i){
                        d.angle = -angle_2 * (i + 1/2) - Math.PI/2;
                        var r_l1i = Math.abs(r_stellar*l1_stellar*Math.sin(angle_2/2))-4;
                        if (r_l1i > 27) {d.r = 27;} else if (r_l1i < 2) {d.r = 2;} else d.r = r_l1i; 
                        d.xx = r_stellar*l1_stellar*Math.cos(d.angle);
                        d.yy = r_stellar*l1_stellar*Math.sin(d.angle);
                        d.cc = c25o(d.outf*1.0/ofsum);
                        d.cc1= c25i(d.inf*1.0 /ifsum);
                      });

        nodes_l1o_stellar.map ( 
                    function(d,i){
                        d.angle = angle_5 * (i + 1/2) - Math.PI/2 ;
                        var r_l1o = Math.abs(r_stellar*l1_stellar*Math.sin(angle_5/2))-4;
                        if (r_l1o > 27) {d.r = 27;} else if (r_l1o < 2) {d.r = 2;} else d.r = r_l1o; 
                        d.xx = r_stellar*l1_stellar*Math.cos(d.angle);
                        d.yy = r_stellar*l1_stellar*Math.sin(d.angle);
                        var w5 = -d.inf/ifsum/2.0 + d.outf/ofsum/2.0;
                        d.cc = c25o(d.outf*1.0/ofsum);
                        d.cc1= c25i(d.inf*1.0 /ifsum);
                      });

        nodes_l2io_stellar.map ( 
                    function(d,i){
                        d.angle = -angle_l2_1 * (i + 1/2) - Math.PI/2;
                        var r_l2io = Math.abs(r_stellar*l2_stellar*Math.sin(angle_l2_1/2))-1;
                        if (r_l2io > 21) {d.r = 21;} else if (r_l2io < 2) {d.r = 2;} else d.r = r_l2io; 
                        d.xx = r_stellar*l2_stellar*Math.cos(d.angle);
                        d.yy = r_stellar*l2_stellar*Math.sin(d.angle);
                        d.cc = nodeColorDic(d.ntype,d.outf);
                      });

        nodes_l2ii_stellar.map ( 
                    function(d,i){
                        d.angle = -angle_l2_3 * (i + 1/2) - Math.PI;
                        var r_l2ii = Math.abs(r_stellar*l2_stellar*Math.sin(angle_l2_3/2))-1;
                        if (r_l2ii > 21) {d.r = 21;} else if (r_l2ii < 2) {d.r = 2;} else d.r = r_l2ii; 
                        d.xx = r_stellar*l2_stellar*Math.cos(d.angle);
                        d.yy = r_stellar*l2_stellar*Math.sin(d.angle);
                        d.cc = nodeColorDic(d.ntype,d.inf);
                      });

        nodes_l2oo_stellar.map ( 
                    function(d,i){
                        d.angle = angle_l2_4 * (i + 1/2) - Math.PI/2;
                        var r_l2oo = Math.abs(r_stellar*l2_stellar*Math.sin(angle_l2_4/2))-1;
                        if (r_l2oo > 21) {d.r = 21;} else if (r_l2oo < 2) {d.r = 2;} else d.r = r_l2oo; 
                        d.xx = r_stellar*l2_stellar*Math.cos(d.angle);
                        d.yy = r_stellar*l2_stellar*Math.sin(d.angle);
                        d.cc = nodeColorDic(d.ntype,d.outf);
                      });

        nodes_l2oi_stellar.map ( 
                    function(d,i){
                        d.angle = angle_l2_6 * (i + 1/2);
                        var r_l2oi = Math.abs(r_stellar*l2_stellar*Math.sin(angle_l2_6/2))-1;
                        if (r_l2oi > 21) {d.r = 21;} else if (r_l2oi < 2) {d.r = 2;} else d.r = r_l2oi; 
                        d.xx = r_stellar*l2_stellar*Math.cos(d.angle);
                        d.yy = r_stellar*l2_stellar*Math.sin(d.angle);
                        d.cc = nodeColorDic(d.ntype,d.inf);
                      });

        nodes_l3io_stellar.map ( 
                    function(d,i){
                        d.angle = -angle_l3_1 * (i + 1/2) - Math.PI/2;
                        var r_l3io = Math.abs(r_stellar*l3_stellar*Math.sin(angle_l3_1/2))-1;
                        if (r_l3io > 15) {d.r = 15;} else if (r_l3io < 2) {d.r = 2;} else d.r = r_l3io; 
                        d.xx = r_stellar*l3_stellar*Math.cos(d.angle);
                        d.yy = r_stellar*l3_stellar*Math.sin(d.angle);
                        d.cc ="snow";
                      });

        nodes_l3ii_stellar.map ( 
                    function(d,i){
                        d.angle = -angle_l3_3 * (i + 1/2) - Math.PI;
                        var r_l3ii = Math.abs(r_stellar*l3_stellar*Math.sin(angle_l3_3/2))-1;
                        if (r_l3ii > 15) {d.r = 15;} else if (r_l3ii < 2) {d.r = 2;} else d.r = r_l3ii; 
                        d.xx = r_stellar*l3_stellar*Math.cos(d.angle);
                        d.yy = r_stellar*l3_stellar*Math.sin(d.angle);
                        d.cc ="snow";
                      });
        
        nodes_l3oo_stellar.map ( 
                    function(d,i){
                        d.angle = angle_l3_4 * (i + 1/2) - Math.PI/2;
                        var r_l3oo = Math.abs(r_stellar*l3_stellar*Math.sin(angle_l3_4/2))-1;
                        if (r_l3oo > 15) {d.r = 15;} else if (r_l3oo < 2) {d.r = 2;} else d.r = r_l3oo; 
                        d.xx = r_stellar*l3_stellar*Math.cos(d.angle);
                        d.yy = r_stellar*l3_stellar*Math.sin(d.angle);
                        d.cc ="snow";
                      });

        nodes_l3oi_stellar.map ( 
                    function(d,i){
                        d.angle = angle_l3_6 * (i + 1/2);
                        var r_l3oi = Math.abs(r_stellar*l3_stellar*Math.sin(angle_l3_6/2))-1;
                        if (r_l3oi > 15) {d.r = 15;} else if (r_l3oi < 2) {d.r = 2;} else d.r = r_l3oi; 
                        d.xx = r_stellar*l3_stellar*Math.cos(d.angle);
                        d.yy = r_stellar*l3_stellar*Math.sin(d.angle);
                        d.cc ="snow";
                      });

        nodes_d_all_stellar = nodes_d_ego_stellar.concat(nodes_l1i_stellar, nodes_l1o_stellar, 
                                                         nodes_l2io_stellar, nodes_l2ii_stellar, nodes_l2oo_stellar, nodes_l2oi_stellar,
                                                         nodes_l3io_stellar, nodes_l3ii_stellar, nodes_l3oo_stellar, nodes_l3oi_stellar)
        //.map(function (d) { d.name = nodes_d_all_stellar.indexOf(d);})
        var transCode = {};
        for (i =0; i < nodes_d_all_stellar.length; i++) {transCode[nodes_d_all_stellar[i].name] = i}
        //console.log(nodes_d_all_stellar)                                         //.map(function (d) {console.log(d);d.name = d.index;})
        var links_d_alt_stellar = selEgolinks.map( function (d) { d.source = transCode[d.source]; d.target = transCode[d.target]})
        
//console.log(selEgolinks)
// Ego force layout 
        svgStellar.call(tip_stellar1);

        var force_stellar = d3.layout.force()
                      .nodes(nodes_d_all_stellar)
                      .links(selEgolinks)
                      .size([axisW_stellar,axisH_stellar])
                      .linkDistance(function(d) {return 300;})
                      .charge(function(d) {return node_charge_stellar(d.ntype);})
                      .friction(0.2)
                      .gravity(0.3)
                      .theta(0.5)
                      .on("tick",tick_stellar)
                      .start(); 

        var drag_hold = force_stellar.drag().on("dragstart",function(d,i){ d.fixed = true;}); 

        var links_stellar = svgStellar.selectAll(".link")
                             .data(selEgolinks)
                             .enter().append("line")
                             .attr("class","link")
                             .attr("transform", "translate(" + (axisW_stellar / 2 + padding_stellar.left) +"," + (axisH_stellar / 2 + padding_stellar.top) + ")")
                             ;
//bond nodes                                
// Alter nodes initialize
        var nodes_stellar = svgStellar.selectAll(".node")
                            .data(nodes_d_all_stellar)
                            .enter().append("circle")
                            .attr("class","node")
                            .attr("r",function(d) {return d.r;})
                            // if ((d.inf+d.outf)>1) {return d.r;} else {return 3;}
                            .attr("fill",function (d) { return d.cc;})
                            //function (d) {if ((d.inf+d.outf)>1) {return node_Color1(d.ntype);} else {return "snow";}}
                            .attr("opacity", function (d) { if (d.ntype==0) {return 0;} else {return 1;}})
                            .attr("stroke", function (d) {if (d.ntype == 2 || d.ntype == 5) {return d.cc1;}})
                            .attr("stroke-width", function (d) {return 0.3*d.r})
                            .attr("transform", "translate(" + (axisW_stellar / 2 + padding_stellar.left) +"," + (axisH_stellar / 2 + padding_stellar.top) + ")")
                            .on("mouseover", function(d,i) { tip_stellar1.show(d); })
                            .on("mouseout" , function(d,i) { tip_stellar1.hide(d); })
                            .on("dblclick",function(d,i){ d.fixed = false;})  
                            .call(drag_hold)
                            ;
                            //.call(force_stellar.drag)
//console.log(svgStellar.selectAll(".node"))
// Node lable initialize
        /*var nlabel_stellar = svgStellar.selectAll(".nl_text")
                                  .data(nodes_d_all_stellar)
                                  .enter().append("text")
                                  .attr("class","nl_text")
                                  .style("fill","snow")
                                  .style("font-family","Agency FB")
                                  .style("font-weight","bold")
                                  .style("font-size",function (d) {if (d.r<3) {return 3;} else {return d.r;}})
                                  //.attr("dx",5)
                                  //.attr("dy",5)
                                  //.attr("rotate",function (d) {return Math.atan(d.yy/d.xx)*180/Math.PI;})
                                  .attr("opacity",function(d) {if (d.layer == 3) {return 0;} else {return 1;}})
                                  .attr("text-anchor","middle")
                                  .attr("transform", "translate(" + (axisW_stellar / 2 + padding_stellar.left) +"," + (axisH_stellar / 2 + padding_stellar.top) + ")")
                                  .text( function(d) { if ((d.outf+d.inf)>1) { if (d.ntype!=0) {return d.name;} }  } )
                                  ;*/
// layout computing 

        //console.log(nodes_d_all_stellar)
// update positions of all elements in force layout               
            function tick_stellar (){ 
                    // set nodes bordaries
                     nodes_stellar.attr("cx",function(d) { return d.xx;})
                                  .attr("cy",function(d) { return d.yy;});

                    /* nlabel_stellar.attr("x", function(d) { return d.xx;})
                                   .attr("y", function(d) { return d.yy;});*/
                     links_stellar.attr("x1",function(d) { return d.source.xx;})
                                  .attr("y1",function(d) { return d.source.yy;})
                                  .attr("x2",function(d) { return d.target.xx; })
                                  .attr("y2",function(d) { return d.target.yy; });

                     };
            
                   };














// ]]>