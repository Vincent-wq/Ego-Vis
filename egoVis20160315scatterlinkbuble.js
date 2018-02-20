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
var c14= d3.scale.quantize().domain([2.1,4.1,9]).range(["#bdd7e7","#6baed6","#3182bd","#08519c"]);
var c36= d3.scale.quantize().domain([2.1,4.1,9]).range(["#b8e186","#7fbc41","#4d9221","#276419"]);
        // 3: in net, large weight
        // 2: in net, small weight
        // 0: outNet, large weight
        // 1: outNet, small weight 
var arc_Color = d3.scale.quantize()
                          .domain([0,1,2,3])
                          .range(["#c7eae5","#c7eae5","#f6e8c3","#f6e8c3"])
var node_Color = d3.scale.quantize()
                          .domain([0,1,2,3])
                          .range(["#35978f","#80cdc1","#bf812d","#8c510a"])

var scatterNum = d3.scale.threshold()
                   .domain([3,5,10,25,50,100,200,3000,30000])
                   .range(["#a50026","#d73027","#f46d43","#fdae61","#fee08b","#d9ef8b","#a6d96a","#66bd63","#1a9850","#006837"]);

var tip_stellar1 = d3.tip()
                     .attr('class', 'd3-tip')
                     .offset([0, 0])
                     .html(function(d) {
                      return "id: <span style='color:orangered'>" + d.name + " t: " +d.ntype +" " + "</span>\n" + "  ofreq: <span style='color:orangered'>" + d.outf + "</span>\n"+"  odura: <span style='color:orangered'>" + d.outd + "</span>" +"  ifreq: <span style='color:orangered'>" + d.inf + "</span>\n"+"  idura: <span style='color:orangered'>" + d.ind + "</span>";
                     });

//scaterVis
var width_sts = 720, height_sts = 920;
var padding_sts = {"top": 80, "right": 140, "bottom": 140, "left": 120}
var axisWidth_sts = width_sts-padding_sts.right-padding_sts.left; var axisHeight_sts = height_sts-padding_sts.top-padding_sts.bottom;

//stellarVis
var width_stellar = 720, height_stellar = 920;
var padding_stellar = {"top": 20, "right": 10, "bottom": 10, "left": 10}
var axisW_stellar = width_stellar-padding_stellar.right-padding_stellar.left; var axisH_stellar = height_stellar-padding_stellar.top-padding_stellar.bottom;

var r_stellar = Math.min(width_stellar,height_stellar) / 2;
var rL1_stellar = 0.5; var rL2_stellar = 0.8;

var node_charge_stellar = d3.scale.quantize()
                            .domain([0,1,2,3,4,5,6])
                            .range([-5000,-50,-50,-50,-50,-50,-50])
// bubleVis
var width_buble = 720; var height_buble = 920;
var padding_buble = {"top": 5, "right": 5, "bottom": 5, "left": 5}
var xAxisWidth_buble = width_buble-padding_buble.right-padding_buble.left; var yAxisHeight_buble = height_buble-padding_buble.top-padding_buble.bottom;
//stellarVis
var svgStellar  = d3.select("#stellarVis")
                    .append("svg")
                    .attr("width",width_stellar)
                    .attr("height",height_stellar);
//scatterVis
var svgSts  = d3.select("#scatterVis")
                .append("svg")
                .attr("width", width_sts)
                .attr("height",height_sts);
//bubleVis
var svgBuble  = d3.select("#wholeVis")
                  .append("svg")
                  .attr("width", width_buble)
                  .attr("height",height_buble);
// function definition
var totalN = 100;

// Reading data and Vis
d3.json("data/ego3000_6500.json",  
	function(error,data) {
    if (error) {return console.log(error);}
      else {
        var n = Math.round(Math.random()*totalN);
// statistical specifications
        var k =0;
// Stellar 
   // back-ground ( Space and Orbit )
        svgStellar.append("rect")
                  .attr("width",width_stellar)
                  .attr("height",height_stellar)
                  .attr("fill","k");
   // legends
       
// Scatter 
   //back-ground
        svgSts.append("rect")
              .attr("width",width_sts)
              .attr("height",height_sts)
              .attr("fill","k");
   // Buble Vis draw 
   // back-ground
        svgBuble.append("rect")
                .attr("width",width_buble)
                .attr("height",height_buble)
                .attr("fill","k");
   // legends
        var  legend_sts =  svgSts.selectAll("g").data(scatterNum.range()).enter()
                                 .append("rect")
                                 .attr("width",50)
                                 .attr("height",30)
                                 .attr("x", width_sts-100)
                                 .attr("y",  function (d,i) { return height_sts*0.4-32*i;})
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

        var  legtxt_sts =  svgSts.selectAll("g").data(legTextData).enter()
                                 .append("text")
                                 .attr("x", function (d) {return width_sts-210;})
                                 //.attr("dx",function (d,i) {return -Math.round(Math.log10(d))*10;})
                                 .attr("y",  function (d,i) {return height_sts*0.42-32*i;})
                                 .attr("fill", "snow")
                                 .style("font-size", 18)
                                 .text(function (d) {return d;}) 
// legends
//scatterVis 
  //draw
        drawScatter(k, data);
//stellarVis
  //draw
        drawStellar(n, data);

}});
function drawStellar(n,data){
  // deleting old elements
  var oldArcs =  svgStellar.selectAll(".arcPath"); oldArcs.remove();
  var oldNodes =  svgStellar.selectAll(".node"); oldNodes.remove();
  var oldLinks =  svgStellar.selectAll(".link"); oldLinks.remove();
  var oldLabels = svgStellar.selectAll(".nl_text"); oldLabels.remove();
  var oldInfoTexts = svgStellar.selectAll(".infotext"); oldInfoTexts.remove();
  var oldChordNodes = svgStellar.selectAll(".outerPath"); oldChordNodes.remove();
  var oldChordChords= svgStellar.selectAll(".innerPath"); oldChordChords.remove();
  // info Texts
  var visText = data.egos[n].nodeSts;
  svgStellar.append("rect")
            .attr("width",180)
            .attr("height",50)
            .attr("x",50)
            .attr("y",30)
            .attr("opacity",1)
            .attr("fill","royalblue");
  svgStellar.append("text")
            .attr("x",60)
            .attr("y",74)
            .text("RandNode")
            .attr("fill","snow")
            .style("font-family","Agency FB")
            .style("font-weight","bold")
            .attr("opacity",1)
            .attr("font-size",48);
  svgStellar.append("rect")
            .attr("width",180)
            .attr("height",50)
            .attr("x",50)
            .attr("y",30)
            .attr("opacity",0)
            .attr("fill","royalblue")
            .on("click",function () { n = Math.round(Math.random()*totalN); drawStellar(n,data);})
            ;
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

  svgStellar.selectAll(".infotext").data(visText).enter()
            .append("text")
            .attr("class","infotext")
            .attr("x",40)
            .attr("y",function (d,i)  {return height_sts*0.6+60*i;} )
            .attr("opacity",1)
            .text(function (d,i) {return d.name+":  "+d.value;})
            .style("fill","snow")
            .style("font-family","Agency FB")
            .style("font-weight","Bold")
            .style("font-size",36)
            .attr("infotext");
// Stellar Vis
    // data preparation
  var interAngleL0 = 20*Math.PI/180;
  var widthL1 = 0.2/2; var widthL2 = 0.2/2;

  selEgo = data.egos[n].nodes;
  // ego node
  var nodes_d_ego_stellar = selEgo.filter( function(d) {return d.ntype == 0});
  nodes_d_ego_stellar[0].r  =  r_stellar*0.3;
  nodes_d_ego_stellar[0].xx = 0;
  nodes_d_ego_stellar[0].yy = 0;
  // number of different alters
  var n1_stellar  = selEgo.filter( function(d) {return d.ntype == 1 }); var n2_stellar  = selEgo.filter( function(d) {return d.ntype == 2 });
  var n3_stellar  = selEgo.filter( function(d) {return d.ntype == 3 }); var n4_stellar  = selEgo.filter( function(d) {return d.ntype == 4 });
  var n5_stellar  = selEgo.filter( function(d) {return d.ntype == 5 }); var n6_stellar  = selEgo.filter( function(d) {return d.ntype == 6 });
  
  var dataA1 = n3_stellar.map(function (d) {return d.inf;});  var dataA2 = n6_stellar.map(function (d) {return d.inf;});
  var dataB1 = n1_stellar.map(function (d) {return d.outf;}); var dataB2 = n4_stellar.map(function (d) {return d.outf;});
  var dataC  = n2_stellar.map(function (d) {return d.outf;}); var dataD  = n5_stellar.map(function (d) {return d.outf;});
  //console.log(dataA1,dataA2,dataB1,dataB2,dataC,dataD);
  var border = d3.min([width_stellar,height_stellar]);
  var radiusScale = d3.scale.log().domain([1,10000]).range([45,180]);
  var rA = radiusScale(dataA1.length+dataA2.length); var rB = radiusScale(dataB1.length+dataB2.length);
  var rC = radiusScale(dataC.length); var rD = radiusScale(dataD.length);
  
  var offSetA = [border/2-d3.max([rC,rD])*1.1,border/2];var offSetB = [border/2+d3.max([rC,rD])*1.1,border/2];
  var offSetC = [border/2,border/2-rC*1.1]; var offSetD = [border/2,border/2+rD*1.1];

  var angleA = [Math.PI, 2*Math.PI]; var angleB = [0,Math.PI]; var angleC = [-Math.PI/2, Math.PI/2]; var angleD = [Math.PI/2, Math.PI*3/2];
  
  var colorScaleA = d3.scale.linear().domain([,]).range([,]);
  var colorScaleC
  //semiCircle2(svgStellar, dataA1, dataA2, offSetA, angleA, rA, colorScaleA);
  //semiCircle2(svgStellar, dataB1, dataB2, offSetB, angleB, rB, colorScaleB);
  semiCircle1(svgStellar, dataC, offSetC, angleC, rC, colorScaleC);
  semiCircle1(svgStellar, dataD, offSetD, angleD, rD, colorScaleD);

  function semiCircle1(svg,data,offSet,angle,radius,colorScale) {
    //var 
    //back-ground
    //lines
    var semiCircle = svg.select(".xline")
                        .data(data).enter()
                        .append("line")
                        .attr("x1",0)
                        .attr("y1",0)
                        .attr("x2",function (d,i) {return;})
                        .attr("y2",function (d,i) {return;})
                        .attr("stroke",function (d) {return colorScale(d);})
                        .attr("stroke-width",2)
 
  };
  function semiCircle2(svg,data1,data2,offSet,angle,radius) {
    
  };





    };

function drawScatter(k,data){
// Scatter Vis 
// deleting old elements
    var oldNodes =  svgSts.selectAll(".scatter_c"); oldNodes.remove();
    var oldXaxis =  svgSts.selectAll(".xAxis"); oldXaxis.remove();
    var oldYaxis =  svgSts.selectAll(".yAxis"); oldYaxis.remove();
    var oldinfotext =  svgSts.selectAll(".infotext"); oldinfotext.remove();
    var oldBubles = svgSts.selectAll(".buble"); oldBubles.remove();
//data formating
// sts- [ Bi, o_ind, o_ofreq, o_odura, oAW, Theta ]
    var dataSts = {};
    dataSts.name = ["inD", "ofreq", "odura", "Bi", "oAW","SBD"];
    dataSts.data = [data.sts.o_ind, data.sts.o_ofreq, data.sts.o_odura, data.sts.Bi, data.sts.oAW, data.sts.Theta];
    var targetData = dataSts.data[k]; var targetName = dataSts.name[k];
// parameters 
    var bandPos = [-1, -1]; var pos;
    var scatterXdomain = [d3.min(targetData,function (d) {return d[0];}), d3.max(targetData,function (d) {return d[0];})];
    var scatterYdomain = [d3.min(targetData,function (d) {return d[1];}), d3.max(targetData,function (d) {return d[1];})];
    var scatterZarea = {x1: scatterXdomain[0], y1: scatterYdomain[0], x2: scatterXdomain[1], y2: scatterYdomain[1]};
    var scatterDrag = d3.behavior.drag();
// info Texts        
    var infoTextSts = svgSts.append("text").attr("class","infotext").attr("x",160).attr("y",padding_sts.top*1.5)
                            .attr("font-family","Agency FB" ).attr("font-size",80).attr("fill","snow").attr("font-weight","bold").text(targetName);

    var button_rect_sts  =  svgSts.selectAll(".inforect").data(dataSts.name).enter()
                                  .append("rect")
                                  .attr("class","inforect")
                                  .attr("width",80)
                                  .attr("height",50)
                                  .attr("opacity",1)
                                  .attr("x",function (d,i) {return width_sts*0.06+i*((axisWidth_sts+padding_sts.right)/6-10); })
                                  .attr("y",function (d) {return height_sts-0.5*padding_sts.bottom;});

    var button_text_sts  =  svgSts.selectAll("g").data(dataSts.name).enter()
                                  .append("text")
                                  .attr("class","infotext")
                                  .attr("font_Size",64)
                                  .attr("x",function (d,i) {return width_sts*0.11+i*((axisWidth_sts+padding_sts.right)/6-10); })
                                  .attr("dx",function (d) {return -d.length/2*10;})
                                  .attr("y",function (d) {return height_sts-0.22*padding_sts.bottom;})
                                  .text(function (d) {return d;});
        
    var button_func_sts  =  svgSts.selectAll("g").data(dataSts.name).enter()
                                  .append("rect")
                                  .attr("class","inforect")
                                  .attr("width",80)
                                  .attr("height",50)
                                  .attr("opacity",0)
                                  .attr("x",function (d,i) {return width_sts*0.06+i*((axisWidth_sts+padding_sts.right)/6-10); })
                                  .attr("y",function (d) {return height_sts-0.5*padding_sts.bottom;})
                                  .on("click",function (d,i) {k = i; drawScatter(k,data);});

    var button_zoom_sts  =  svgSts.append("circle")
                                  .attr("class","inforect")
                                  .attr("r", 50)
                                  .attr("cx", width_sts - 0.5*padding_sts.right)
                                  .attr("cy", height_sts- 0.5*padding_sts.bottom);
    
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
                                   .on("click", function () { zoomOut(); } );
// axies
    // scale        
    var xScale_sts = d3.scale.linear().domain(scatterXdomain).range([0,axisWidth_sts]);
    var yScale_sts = d3.scale.linear().domain(scatterYdomain).range([axisHeight_sts,0]);

    // axis    
    var xAxis_sts = d3.svg.axis().scale(xScale_sts).orient("bottom").tickPadding(6);
    var yAxis_sts = d3.svg.axis().scale(yScale_sts).orient("left").tickPadding(6);
    //.tickSize([6,6])
        
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
    var scatter_plot = svgSts.selectAll(".xxx")
                             .data(targetData).enter()
                             .append("circle")
                             .attr("class","scatter_c")
                             .attr("fill",function (d) { return scatterNum(d[2]);})
                             .attr("cx", padding_sts.left)
                             .attr("cy", height_sts - padding_sts.bottom)
                             .attr("r",  4)
                             .attr("opacity",1)
                             .transition()
                             .ease("cubic")
                             .duration(3000)
                             .attr("cx",  function (d,i) {return padding_sts.left + xScale_sts(d[0]);})
                             .attr("cy",  function (d,i) {return padding_sts.top  + yScale_sts(d[1]);})
                             ;
// overlay 
    var zOverlay = svgSts.append("rect")
                         .attr("x",padding_sts.left-10)
                         .attr("y",padding_sts.top+10)
                         .attr("width", axisWidth_sts)
                         .attr("height", axisHeight_sts)
                         .attr("class", "zoomOverlay")
                         .call(scatterDrag);
    
    scatterDrag.on("dragend", function () {
      var pos = d3.mouse(this);
      var x1 = xScale_sts.invert(bandPos[0]-padding_sts.left); var x2 = xScale_sts.invert(pos[0]-padding_sts.left);
      var y1 = yScale_sts.invert(pos[1]-padding_sts.top); var y2 = yScale_sts.invert(bandPos[1]-padding_sts.top);

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

  var targetBuble = dataSts.data[k]; var targetName = dataSts.name[k];
  var rScale = d3.scale.linear()
                       .domain(d3.extent(targetBuble , function (d) {return d[2]; }))
                       .range([12, 50]);

  targetBuble.map( function (d)  {
    d.rr  = rScale(d[2]);
  });

  var xMM = d3.extent(targetBuble , function (d) {return Math.abs(d[1]-1); });
  var xRange = scatterNum.range().concat();
  var xColor = d3.scale.threshold().domain([0,0.1,0.2,0.3,0.5,0.7,1.0,2.0,5.0]).range(xRange.reverse());

  var force_buble = d3.layout.force()
                      .charge(-1)
                      .gravity(0.02)
                      .theta(0.9)
                      .size([xAxisWidth_buble , yAxisHeight_buble]);
  
  force_buble.nodes(targetBuble).start();
// force circle
  var circles = svgBuble.selectAll("circle")
           .data(targetBuble)
           .enter()
           .append("circle")
           .attr("class","buble")
           .attr({"r" : function (d) { return d.rr; },
              "fill-opacity":0.3,
              "stroke-width" : 2 })
           .attr("stroke", function (d) {return xColor(Math.abs(d[1]-1));})
           .attr("fill", function (d) {return d3.rgb(xColor(Math.abs(d[1]-1))).brighter();})
           .call(force_buble.drag);

  var nlabel_buble = svgBuble.selectAll("text")
                             .data(targetBuble)
                             .enter().append("text")
                             .attr("class","labelBuble")
                             .style("fill","snow")
                             .style("font-size",function(d) {if (d[2]<300) {return 8;} else {return 24;}})
                             .attr("text-anchor","middle")
                             .text(function(d){ return d[0];})
                             .attr("opacity",0.8)
                               //   .attr("opacity",0)
                                  ;  

  force_buble.on("tick" , function() {
    var q = d3.geom.quadtree(targetBuble),
    i = 0,
    n = targetBuble.length;
    // CD
    while(++i < n) q.visit(collide(targetBuble[i]));
    // renew buble pos  
    circles.each(collide(0.5))
           .attr({"cx" : function (d) { if ((d.x-d.rr) >= padding_buble.left && (d.x + d.rr) <= (width_buble - padding_buble.right)) {return d.x;}
                                          else if ((d.x-d.rr) < padding_buble.left) {return d.rr + padding_buble.left;}
                                          else if ((d.x + d.rr) > (width_buble - padding_buble.right)) {return width_buble - padding_buble.right - d.rr ;}
                                      },
                  "cy" : function (d) { if ((d.y - d.rr) >= padding_buble.top && (d.y + d.rr) <=  (height_buble - padding_buble.bottom)) {return d.y;}
                                          else if ((d.y - d.rr) < padding_buble.top) {return d.rr+padding_buble.top;}
                                          else if ((d.y + d.rr) > (height_buble - padding_buble.bottom)) {return height_buble - padding_buble.bottom - d.rr;}
                                      }
                 });
    nlabel_buble.attr("dx", function (d) { if ((d.x-d.rr) >= padding_buble.left && (d.x + d.rr) <= (width_buble - padding_buble.right)) {return d.x;}
                                             else if ((d.x-d.rr) < padding_buble.left) {return d.rr+padding_buble.left;}
                                             else if ((d.x + d.rr) > (width_buble - padding_buble.right)) {return width_buble - padding_buble.right - d.rr}
                                      })
                .attr("dy", function (d) { if ((d.y - d.rr) >= padding_buble.top && (d.y + d.rr) <=  (height_buble - padding_buble.bottom)) {return d.y;}
                                             else if ((d.y - d.rr) < padding_buble.top) {return d.rr+padding_buble.top;}
                                             else if ((d.y + d.rr) > (height_buble - padding_buble.bottom)) {return height_buble - padding_buble.bottom - d.rr;}
                                      }
                     );
    });

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
        d3.selectAll(".buble").remove();
        d3.selectAll(".labelBuble").remove();
        force_buble.stop();
        var zoomBubleData = targetBuble.filter(function (d) {return d[0] >= xScale_sts.domain()[0] && d[0] <= xScale_sts.domain()[1] && d[1] >= yScale_sts.domain()[0] && d[1] <= yScale_sts.domain()[1]; })
        force_buble.nodes(zoomBubleData).start();
        var circles = svgBuble.selectAll("circle")
                              .data(zoomBubleData).enter()
                              .append("circle")
                              .attr("class","buble")
                              .attr({"r" : function (d) { return d.rr+3; },
                                     "fill-opacity":0.3,
                                     "stroke-width" : 2 })
                              .attr("stroke", function (d ) {return xColor(Math.abs(d[1]-1));})
                              .attr("fill", function (d ) {return d3.rgb(xColor(Math.abs(d[1]-1))).brighter();})
                              .call(force_buble.drag);

        var nlabel_buble = svgBuble.selectAll("text")
                                   .data(zoomBubleData)
                                   .enter().append("text")
                                   .attr("class","labelBuble")
                                   .style("fill","snow")
                                   .style("font-size",function(d) {if (d[2]<300) {return 16;} else {return 24;}})
                                   .attr("text-anchor","middle")
                                   .text(function(d){ return d[0];})
                                   .attr("opacity",0.8)
                               //   .attr("opacity",0)
                                  ;  

        force_buble.on("tick" , function() {
          var q = d3.geom.quadtree(targetBuble),
          i = 0,
          n = targetBuble.length;
          // CD
          while(++i < n) q.visit(collide(targetBuble[i]));
          // renew buble pos  
          circles.each(collide(0.5))
                 .attr({"cx" : function (d) { if ((d.x-d.rr) >= padding_buble.left && (d.x + d.rr) <= (width_buble - padding_buble.right)) {return d.x;}
                                          else if ((d.x-d.rr) < padding_buble.left) {return d.rr + padding_buble.left;}
                                          else if ((d.x + d.rr) > (width_buble - padding_buble.right)) {return width_buble - padding_buble.right - d.rr ;}
                                      },
                        "cy" : function (d) { if ((d.y - d.rr) >= padding_buble.top && (d.y + d.rr) <=  (height_buble - padding_buble.bottom)) {return d.y;}
                                          else if ((d.y - d.rr) < padding_buble.top) {return d.rr+padding_buble.top;}
                                          else if ((d.y + d.rr) > (height_buble - padding_buble.bottom)) {return height_buble - padding_buble.bottom - d.rr;}
                                      }
                        });
          nlabel_buble.attr("dx", function (d) { if ((d.x-d.rr) >= padding_buble.left && (d.x + d.rr) <= (width_buble - padding_buble.right)) {return d.x;}
                                             else if ((d.x-d.rr) < padding_buble.left) {return d.rr+padding_buble.left;}
                                             else if ((d.x + d.rr) > (width_buble - padding_buble.right)) {return width_buble - padding_buble.right - d.rr}
                                               })
                      .attr("dy", function (d) { if ((d.y - d.rr) >= padding_buble.top && (d.y + d.rr) <=  (height_buble - padding_buble.bottom)) {return d.y;}
                                             else if ((d.y - d.rr) < padding_buble.top) {return d.rr+padding_buble.top;}
                                             else if ((d.y + d.rr) > (height_buble - padding_buble.bottom)) {return height_buble - padding_buble.bottom - d.rr;}
                                               });
          });
    };
    
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
      d3.selectAll(".buble").remove();
      d3.selectAll(".labelBuble").remove();
      force_buble.stop();
      console.log( d3.selectAll(".buble").length, d3.selectAll(".labelBuble").length);
      force_buble.nodes(targetBuble).start();
// force circle
      var circles = svgBuble.selectAll("circle")
                            .data(targetBuble)
                            .enter()
                            .append("circle")
                            .attr("class","buble")
                            .attr({"r" : function (d) { return d.rr; },
                                   "fill-opacity":0.3,
                                   "stroke-width" : 2 })
                            .attr("stroke", function (d) {return xColor(Math.abs(d[1]-1));})
                            .attr("fill", function (d) {return d3.rgb(xColor(Math.abs(d[1]-1))).brighter();})
                            .call(force_buble.drag);

      var nlabel_buble = svgBuble.selectAll("text")
                                 .data(targetBuble)
                                 .enter().append("text")
                                 .attr("class","labelBuble")
                                 .style("fill","snow")
                                 .style("font-size",function(d) {if (d[2]<300) {return 8;} else {return 24;}})
                                 .attr("text-anchor","middle")
                                 .text(function(d){ return d[0];})
                                 .attr("opacity",0.8)
                               //   .attr("opacity",0)
                                  ;  

      force_buble.on("tick" , function() {
        var q = d3.geom.quadtree(targetBuble),
            i = 0,
            n = targetBuble.length;
        // CD
        while(++i < n) q.visit(collide(targetBuble[i]));
        // renew buble pos  
        circles.each(collide(0.5))
               .attr({"cx" : function (d) { if ((d.x-d.rr) >= padding_buble.left && (d.x + d.rr) <= (width_buble - padding_buble.right)) {return d.x;}
                                          else if ((d.x-d.rr) < padding_buble.left) {return d.rr + padding_buble.left;}
                                          else if ((d.x + d.rr) > (width_buble - padding_buble.right)) {return width_buble - padding_buble.right - d.rr ;}
                                      },
                      "cy" : function (d) { if ((d.y - d.rr) >= padding_buble.top && (d.y + d.rr) <=  (height_buble - padding_buble.bottom)) {return d.y;}
                                          else if ((d.y - d.rr) < padding_buble.top) {return d.rr+padding_buble.top;}
                                          else if ((d.y + d.rr) > (height_buble - padding_buble.bottom)) {return height_buble - padding_buble.bottom - d.rr;}
                                      }
                     });
        nlabel_buble.attr("dx", function (d) { if ((d.x-d.rr) >= padding_buble.left && (d.x + d.rr) <= (width_buble - padding_buble.right)) {return d.x;}
                                             else if ((d.x-d.rr) < padding_buble.left) {return d.rr+padding_buble.left;}
                                             else if ((d.x + d.rr) > (width_buble - padding_buble.right)) {return width_buble - padding_buble.right - d.rr}
                                             })
                    .attr("dy", function (d) { if ((d.y - d.rr) >= padding_buble.top && (d.y + d.rr) <=  (height_buble - padding_buble.bottom)) {return d.y;}
                                             else if ((d.y - d.rr) < padding_buble.top) {return d.rr+padding_buble.top;}
                                             else if ((d.y + d.rr) > (height_buble - padding_buble.bottom)) {return height_buble - padding_buble.bottom - d.rr;}
                                            });
    });
    };
    // CD function
    function collide (node) {
      var r = 0
      /*if (node.rr>16) {r = node.rr*1.1;}
        else {r = node.rr +3}*/
      var r= node.rr+10;
      var  nx1 = node.x - r,
           nx2 = node.x + r,
           ny1 = node.y - r,
           ny2 = node.y + r;

      return function (quad, x1, y1, x2, y2) {
        if(quad.point && (quad.point !== node)) {
          var x = node.x - quad.point.x,
              y = node.y - quad.point.y,
              l = Math.sqrt(x * x + y * y),
              r = node.rr + quad.point.rr;

        if(l < r) {
          l = (l - r) / l * 0.5;
          node.x -= x *= l;
          node.y -= y *= l;
          quad.point.x += x;
          quad.point.y +=y;
        }
      }
      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
    };
  };
    var sts_g = svgSts.selectAll("g").call(zoom);

};

// ]]>