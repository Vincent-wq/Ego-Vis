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
                   .range(["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd"]);

var tip_stellar1 = d3.tip()
                     .attr('class', 'd3-tip')
                     .offset([0, 0])
                     .html(function(d) {
                      return "id: <span style='color:orangered'>" + d.name + " t: " +d.ntype +" " + "</span>\n" + "  ofreq: <span style='color:orangered'>" + d.outf + "</span>\n"+"  odura: <span style='color:orangered'>" + d.outd + "</span>" +"  ifreq: <span style='color:orangered'>" + d.inf + "</span>\n"+"  idura: <span style='color:orangered'>" + d.ind + "</span>";
                     });

//scaterVis
var width_sts = 960, height_sts = 720;
var padding_sts = {"top": 80, "right": 140, "bottom": 140, "left": 120}
var axisWidth_sts = width_sts-padding_sts.right-padding_sts.left; var axisHeight_sts = height_sts-padding_sts.top-padding_sts.bottom;

//stellarVis
var width_stellar = 960, height_stellar = 720;
var padding_stellar = {"top": 0, "right": 0, "bottom": 0, "left": 240}
var axisW_stellar = width_stellar-padding_stellar.right-padding_stellar.left; var axisH_stellar = height_stellar-padding_stellar.top-padding_stellar.bottom;

var r_stellar = Math.min(width_stellar,height_stellar) / 2;
var rL1_stellar = 0.5; var rL2_stellar = 0.8;

var node_charge_stellar = d3.scale.quantize()
                            .domain([0,1,2,3,4,5,6])
                            .range([-5000,-50,-50,-50,-50,-50,-50])
// bubleVis
var width_buble = 720; var height_buble = 720;
var padding_buble = {"top": 20, "right": 20, "bottom": 20, "left": 20}
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
// global vars
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
   // legends
       
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

        var  legtxt_sts =  svgSts.selectAll("g").data(legTextData).enter()
                                 .append("text")
                                 .attr("x", function (d) {return width_sts-210;})
                                 //.attr("dx",function (d,i) {return -Math.round(Math.log10(d))*10;})
                                 .attr("y",  function (d,i) {return height_sts-padding_sts.bottom-240-32*i;})
                                 .attr("fill", "snow")
                                 .style("font-size", 18)
                                 .text(function (d) {return d;}) 
// Buble Vis draw 
   // back-ground
        svgBuble.append("rect")
                .attr("width",width_buble)
                .attr("height",height_buble)
                .attr("fill","k");
   // legends

//scatterVis 
  //draw
        drawScatter(k, data);
//stellarVis
  //draw
        drawStellar(n, data);
//bubleVis
  //draw
        drawBuble(k, data);

}});

function drawBuble (k,data) {
//data formating
  // sts- [ Bi, o_ind, o_ofreq, o_odura, oAW, Theta ]
        k = 3;
        var dataSts = {};
        dataSts.name = ["inD", "ofreq", "odura", "Bi", "oAW","SBD"];
        dataSts.data = [data.sts.o_ind, data.sts.o_ofreq, data.sts.o_odura, data.sts.Bi, data.sts.oAW, data.sts.Theta];
        var targetBuble = dataSts.data[k]; var targetName = dataSts.name[k];
        var rScale = d3.scale.linear()
                       .domain(d3.extent(targetBuble , function (d) {return d[2]; }))
                       .range([10, 70]);

        targetBuble.map( function (d,i)  {
          d.name = d[0];
          d.att1= d[1];
          d.att2= d[2];
          d.rr  = rScale(d[2]);
        });

  var xMM = d3.extent(targetBuble , function (d) {return Math.abs(d[1]-1); });
  var xRange = scatterNum.range().concat();
  var xColor = d3.scale.threshold().domain([0,0.1,0.2,0.3,0.5,0.7,1.0,2.0,5.0]).range(xRange.reverse());
  console.log(targetBuble);
  console.log(xColor.domain());

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
              "stroke-width" : 2 ,
              "class" : "circles" })
           .attr("stroke", function (d ) {return xColor(Math.abs(d.att1-1));})
           .attr("fill", function (d ) {return d3.rgb(xColor(Math.abs(d.att1-1))).brighter();})
           .call(force_buble.drag);

 var nlabel_buble = svgBuble.selectAll("text")
                                  .data(targetBuble)
                                  .enter().append("text")
                                  .style("fill","snow")
                                  .style("font-size",function(d) {if (d[2]<200) {return 0;} else if (d[2]<300) {return 8;} else {return 24;}})
                                  .attr("text-anchor","middle")
                                  //.attr("transform", "translate(" + width_stellar / 2 + "," + height_stellar / 2 + ")")
                                  .text(function(d){ return d.name;})
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
    }
    );

// CD function
  function collide (node) {
    var r = 0
    if (node.rr>16) {r = node.rr*1.1;}
      else {r = node.rr +3}
    //var r= node.rr+6,
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
  }

};

function drawScatter(k,data){
// Scatter Vis 
// deleting old elements
        var oldNodes =  svgSts.selectAll(".scatter_c"); oldNodes.remove();
        var oldXaxis =  svgSts.selectAll(".xAxis"); oldXaxis.remove();
        var oldYaxis =  svgSts.selectAll(".yAxis"); oldYaxis.remove();
        var oldinfotext =  svgSts.selectAll(".infotext"); oldinfotext.remove();
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
        console.log("targetData:");
        console.log(targetData);    
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
        console.log(d3.selectAll(".scatter_c"));
        //console.log(targetData); 
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
    };
    var sts_g = svgSts.selectAll("g").call(zoom);
};

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

         svgStellar.append("rect").attr("width",180)
                                  .attr("height",50)
                                  .attr("x",50)
                                  .attr("y",30)
                                  .attr("opacity",1)
                                  .attr("fill","royalblue")
                                  ;
         svgStellar.append("text").attr("x",60)
                                  .attr("y",74)
                                  .text("RandNode")
                                  .attr("fill","snow")
                                  .style("font-family","Agency FB")
                                  .style("font-weight","bold")
                                  .attr("opacity",1)
                                  .attr("font-size",48)
                                  ;
         svgStellar.append("rect").attr("width",180)
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
                                  .attr("font-size",40)
                                  ;

         svgStellar.selectAll(".infotext").data(visText)
                                    .enter().append("text")
                                    .attr("class","infotext")
                                    .attr("x",40)
                                    .attr("y",function (d,i)  {return 100+60*i;} )
                                    .attr("opacity",1)
                                    .text(function (d,i) {return d.name+":  "+d.value;})
                                    .style("fill","snow")
                                    .style("font-family","Agency FB")
                                    .style("font-weight","Bold")
                                    .style("font-size",36)
                                    .attr("infotext")
                                    ;
        //console.log(visText);
// Stellar Vis
    // data preparation
        var wo_stellar = 5; var wi_stellar = 5; var w2o_stellar = 1; var w2i_stellar = 1;
        var interAngleL1 = 10*Math.PI/180; var interAngleL2 = 0.5*Math.PI/180; var paddingAngle = Math.PI/180;
        var widthL1 = 0.2/2; var widthL2 = 0.2/2;

        selEgo = data.egos[n].nodes;
        var nodes_d_ego_stellar = selEgo.filter( function(d) {return d.ntype == 0});
        nodes_d_ego_stellar[0].r  =  r_stellar*0.3;
        nodes_d_ego_stellar[0].xx = 0;
        nodes_d_ego_stellar[0].yy = 0;

        var n1_stellar  = selEgo.filter( function(d) {return d.ntype == 1 }); var n2_stellar  = selEgo.filter( function(d) {return d.ntype == 2 });
        var n3_stellar  = selEgo.filter( function(d) {return d.ntype == 3 }); var n4_stellar  = selEgo.filter( function(d) {return d.ntype == 4 });
        var n5_stellar  = selEgo.filter( function(d) {return d.ntype == 5 }); var n6_stellar  = selEgo.filter( function(d) {return d.ntype == 6 });
        var nbi_stellar = n2_stellar.concat(n5_stellar);

        var arcL2_raw_stellar   = [n4_stellar.length,n6_stellar.length,n3_stellar.length,n1_stellar.length];
        var arcL2_sum_stellar   = arcL2_raw_stellar.reduce( function (d1,d2) {return d1+d2;} );
        var arcL2_angle_stellar = arcL2_raw_stellar.map( function (d) {return (2*Math.PI-arcL2_raw_stellar.length*interAngleL2)*d/arcL2_sum_stellar;});
        var arcL2_d_stellar = arcL2_angle_stellar.map(
                                                  function(d,i){ return {"rIn" : (rL2_stellar-widthL2)*r_stellar, "rOut" : (rL2_stellar+widthL2)*r_stellar,
                                                       "startAngle" : interAngleL2*(i+0.5) + eval(arcL2_angle_stellar.slice(0,i).concat([0]).join('+')),
                                                       "endAngle"   : interAngleL2*(i+0.5) + eval(arcL2_angle_stellar.slice(0,i+1).join('+')),
                                                       "index":i}
                                                    })
                                                 ;

        var arc_stellar = d3.svg.arc()
                            .innerRadius(function (d) {return d.rIn;})
                            .outerRadius(function (d) {return d.rOut;})
                            ;

        var acrL2 = svgStellar.selectAll(".arcPath")
                                    .data(arcL2_d_stellar).enter()
                                    .append("path")
                                    .attr("class","arcPath")
                                    .attr("d", function (d) {return arc_stellar(d);})
                                    .attr("fill", function (d) {return arc_Color(d.index);})
                                    .attr("fill-opacity",0.4)
                                    .attr("transform", "translate(" + (axisW_stellar / 2 + padding_stellar.left) +"," + (axisH_stellar / 2 + padding_stellar.top) + ")")
                                    ;
// chordVisl
        var selEgolinks = data.egos[n].links;
        //console.log(selEgolinks.length);

        if (selEgolinks.length > 0) {
          var transCode = {}; 
          for (i = 0; i < nbi_stellar.length; i++) { if (nbi_stellar[i].ntype == 2 && (nbi_stellar[i].outf > w2o_stellar && nbi_stellar[i].inf > w2i_stellar)) 
                                                         {transCode[nbi_stellar[i].name] = 3}
                                                     else if (nbi_stellar[i].ntype == 2 && (nbi_stellar[i].outf <= w2o_stellar || nbi_stellar[i].inf <= w2i_stellar))
                                                         {transCode[nbi_stellar[i].name] = 2}
                                                     else if (nbi_stellar[i].ntype == 5 && (nbi_stellar[i].outf > w2o_stellar && nbi_stellar[i].inf > w2i_stellar))
                                                         {transCode[nbi_stellar[i].name] = 0}
                                                     else if (nbi_stellar[i].ntype == 5 && (nbi_stellar[i].outf <= w2o_stellar || nbi_stellar[i].inf <= w2i_stellar))
                                                         {transCode[nbi_stellar[i].name] = 1}
                                                       }
                                                       ;
        // 3: in net, large weight
        // 2: in net, small weight
        // 0: outNet, large weight
        // 1: outNet, small weight 
        //console.log(transCode);
          var chord_d_stellar=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
          var links_d_stellar = selEgolinks.map( function (d) {return { source : transCode[d.source], target : transCode[d.target]};});

          for (i = 0; i < links_d_stellar.length; i++) {
            if (links_d_stellar[i].source != undefined && (links_d_stellar[i].target != undefined)) {
              switch (links_d_stellar[i].source){
                case 0: {chord_d_stellar[0][links_d_stellar[i].target] += 1; chord_d_stellar[links_d_stellar[i].target][0] += 1}; break;
                case 1: {chord_d_stellar[1][links_d_stellar[i].target] += 1; chord_d_stellar[links_d_stellar[i].target][1] += 1}; break;
                case 2: {chord_d_stellar[2][links_d_stellar[i].target] += 1; chord_d_stellar[links_d_stellar[i].target][2] += 1}; break;
                case 3: {chord_d_stellar[3][links_d_stellar[i].target] += 1; chord_d_stellar[links_d_stellar[i].target][3] += 1}; break;
                default: break;}
              };
            };
          var chord_stellar = d3.layout.chord()
                                .padding(0.2)
                                .matrix(chord_d_stellar)
                                ;

          var gChord_stellar = svgStellar.append("g").attr("transform", "translate(" + (axisW_stellar / 2 + padding_stellar.left) +"," + (axisH_stellar / 2 + padding_stellar.top) + ")");
          var gChord_node_stellar = gChord_stellar.append("g");
          var gChord_chord_stellar= gChord_stellar.append("g");
          var chord_arc_stellar = d3.svg.arc().innerRadius((rL1_stellar-widthL1)*r_stellar).outerRadius((rL1_stellar+widthL1)*r_stellar);
              gChord_node_stellar.selectAll(".outerPath")
                                 .data(chord_stellar.groups()).enter()
                                 .append("path")
                                 .attr("class", "outerPath")
                                 .style("fill", function (d) {return node_Color(d.index);})
                                 .attr("d", chord_arc_stellar)
                                 ;
          var gChord_chordInner_stellar = d3.svg.chord().radius((rL1_stellar-widthL1)*r_stellar*0.95);

              gChord_chord_stellar.selectAll(".innerPath")
                                  .data(chord_stellar.chords()).enter()
                                  .append("path")
                                  .attr("class","innerPath")
                                  .attr("d",gChord_chordInner_stellar)
                                  .style("fill",function (d) {return node_Color(d.source.index);})
                                  .attr("opacity",0.6)
                                  ;
              gChord_node_stellar.selectAll(".outerPath").on("mouseover",fade(0.1)).on("mouseout",fade(0.6));

          function fade (opacity) {
            return function (g,i) {
              gChord_chord_stellar.selectAll(".innerPath")
                                  .filter(function (d) {return d.source.index != i && d.target.index!= i;})
                                  .transition()
                                  .style("opacity",opacity);
                                  }
          };
        }

      else {
        var n5l_stellar = n5_stellar.filter(function (d) {return d.outf >  w2o_stellar && d.inf >  w2i_stellar;});
        var n5s_stellar = n5_stellar.filter(function (d) {return d.outf >= w2o_stellar || d.inf >= w2i_stellar;});
        var n2l_stellar = n2_stellar.filter(function (d) {return d.outf >  w2o_stellar && d.inf >  w2i_stellar;});
        var n2s_stellar = n2_stellar.filter(function (d) {return d.outf >= w2o_stellar || d.inf >= w2i_stellar;}); 

        var arcL1_raw_stellar   = [n5l_stellar.length, n5s_stellar.length, n2s_stellar.length, n2s_stellar.length];
        var arcL1_sum_stellar   = arcL1_raw_stellar.reduce( function (d1,d2) {return d1+d2;} );
        var arcL1_angle_stellar = arcL1_raw_stellar.map( function (d) {return (2*Math.PI-arcL1_raw_stellar.length*interAngleL1)*d/arcL1_sum_stellar;})
        var arcL1_d_stellar = arcL1_angle_stellar.map(
                                                  function(d,i){ return {"rIn" : (rL1_stellar-widthL1)*r_stellar, "rOut" : (rL1_stellar+widthL1)*r_stellar,
                                                       "startAngle" : interAngleL1*(i+0.5) + eval(arcL1_angle_stellar.slice(0,i).concat([0]).join('+')),
                                                       "endAngle"   : interAngleL1*(i+0.5) + eval(arcL1_angle_stellar.slice(0,i+1).join('+')),
                                                       "index": i}
                                                    });
        var arc_stellar = d3.svg.arc()
                            .innerRadius(function (d) {return d.rIn;})
                            .outerRadius(function (d) {return d.rOut;});

        var acrL1 = svgStellar.selectAll("#arcPath")
                                    .data(arcL1_d_stellar).enter()
                                    .append("path")
                                    .attr("class","arcPath")
                                    .attr("d", function (d) {return arc_stellar(d);})
                                    .attr("fill", function (d) {return node_Color(d.index);})
                                    .attr("fill-opacity",1)
                                    .attr("transform", "translate(" + (axisW_stellar / 2 + padding_stellar.left) +"," + (axisH_stellar / 2 + padding_stellar.top) + ")")
                                    ;

      };

        var n1_f_stellar = n1_stellar.filter( function(d) {return ( d.outf >= wo_stellar); } ); n1_f_stellar.sort(function(a,b){return a.outf < b.outf ? 1 : -1;});
        var n4_f_stellar = n4_stellar.filter( function(d) {return ( d.outf >= wo_stellar); } ); n4_f_stellar.sort(function(a,b){return a.outf < b.outf ? 1 : -1;});
        var n3_f_stellar = n3_stellar.filter( function(d) {return ( d.inf  >= wi_stellar); } ); n3_f_stellar.sort(function(a,b){return a.inf < b.inf ? 1 : -1;});
        var n6_f_stellar = n6_stellar.filter( function(d) {return ( d.inf  >= wi_stellar); } ); n6_f_stellar.sort(function(a,b){return a.inf < b.inf ? 1 : -1;});
        
        var rL1_max_stellar = 26; var rL2_max_stellar = 24;

        n1_f_stellar.map (
          function(d,i){
            var angleT = (arcL2_d_stellar[3].endAngle - arcL2_d_stellar[3].startAngle)*0.94 / (n1_f_stellar.length+1);
            d.angle = (arcL2_d_stellar[3].endAngle - arcL2_d_stellar[3].startAngle)*0.06 + angleT * (i+0.5) + arcL2_d_stellar[3].startAngle + interAngleL2/2 - Math.PI/2;
            var r = Math.abs(r_stellar*rL2_stellar*Math.sin(angleT/2))-2;
            if (r > rL2_max_stellar) {d.r = rL2_max_stellar;} else if (r < 3) {d.r = 3;} else d.r = r; 
            d.xx = r_stellar*rL2_stellar*Math.cos(d.angle);
            d.yy = r_stellar*rL2_stellar*Math.sin(d.angle);
            d.cc = c14(d.outf);
                      });
        n4_f_stellar.map (
          function(d,i){
            var angleT = (arcL2_d_stellar[0].endAngle - arcL2_d_stellar[0].startAngle) * 0.98 / (n4_f_stellar.length+1);
            d.angle = (arcL2_d_stellar[0].endAngle - arcL2_d_stellar[0].startAngle)*0.01 + angleT * (i+0.5) + arcL2_d_stellar[0].startAngle + interAngleL2/2 - Math.PI/2;
            var r = Math.abs(r_stellar*rL2_stellar*Math.sin(angleT/2))-2;
            if (r > rL2_max_stellar) {d.r = rL2_max_stellar;} else if (r < 3) {d.r = 3;} else d.r = r; 
            d.xx = r_stellar*rL2_stellar*Math.cos(d.angle);
            d.yy = r_stellar*rL2_stellar*Math.sin(d.angle);
            d.cc = c14(d.outf);
                      });
        n3_f_stellar.map (
          function(d,i){
            var angleT = (arcL2_d_stellar[2].endAngle - arcL2_d_stellar[2].startAngle) * 0.9 / (n3_f_stellar.length+1);
            d.angle = (arcL2_d_stellar[2].endAngle - arcL2_d_stellar[2].startAngle)*0.06 + angleT * (i+0.5) + arcL2_d_stellar[2].startAngle + interAngleL2/2 - Math.PI/2;
            var r = Math.abs(r_stellar*rL2_stellar*Math.sin(angleT/2))-2;
            if (r > rL2_max_stellar) {d.r = rL2_max_stellar;} else if (r < 3) {d.r = 3;} else d.r = r; 
            d.xx = r_stellar*rL2_stellar*Math.cos(d.angle);
            d.yy = r_stellar*rL2_stellar*Math.sin(d.angle);
            d.cc = c36(d.inf);
                      });
        n6_f_stellar.map (
          function(d,i){
            var angleT = (arcL2_d_stellar[1].endAngle - arcL2_d_stellar[1].startAngle)*0.9 / (n6_f_stellar.length+1);
            d.angle = (arcL2_d_stellar[1].endAngle - arcL2_d_stellar[1].startAngle)*0.06 + angleT * (i+0.5) + arcL2_d_stellar[1].startAngle + interAngleL2/2 - Math.PI/2;
            var r = Math.abs(r_stellar*rL2_stellar*Math.sin(angleT/2))-2;
            if (r > rL2_max_stellar) {d.r = rL2_max_stellar;} else if (r < 3) {d.r = 3;} else d.r = r; 
            d.xx = r_stellar*rL2_stellar*Math.cos(d.angle);
            d.yy = r_stellar*rL2_stellar*Math.sin(d.angle);
            d.cc = c36(d.inf);
                      });
        var nodes_d_stellar = n1_f_stellar.concat(n4_f_stellar, n3_f_stellar, n6_f_stellar)

        svgStellar.call(tip_stellar1);
                      
// Alter nodes initialize
        var nodes_stellar = svgStellar.selectAll(".node")
                            .data(nodes_d_stellar)
                            .enter().append("circle")
                            .attr("class","node")
                            .attr("cx",function(d){return d.xx;})
                            .attr("cy",function(d){return d.yy;})
                            .attr("r",function(d) {return d.r;})
                            .attr("fill",function (d) { return d.cc;})
                            .attr("opacity", 1)
                            .attr("stroke", function (d) {if (d.ntype == 2 || d.ntype == 5) {return d.cc1;}})
                            .attr("stroke-width", function (d) {return 0.3*d.r})
                            .attr("transform", "translate(" + (axisW_stellar / 2 + padding_stellar.left) +"," + (axisH_stellar / 2 + padding_stellar.top) + ")")
                            .on("mouseover", function(d,i) { tip_stellar1.show(d); })
                            .on("mouseout" , function(d,i) { tip_stellar1.hide(d); })
                            .on("dblclick",function(d,i){ d.fixed = false;})  
                            ;
// vis signature
        var trendWidth = 260; var trendHeight = 200; var trendX = 30; var trendY = 500;
        var trendPadding = { top: 5, right: 10, bottom: 5, left: 10 };
        var sigWidth  = trendWidth - trendPadding.left - trendPadding.right;
        var sigHeight = trendHeight - trendPadding.top - trendPadding.bottom;

        var rd1 = n1_stellar.concat(n2_stellar);
        var rd2 = n4_stellar.concat(n5_stellar);
        var rd3 = n6_stellar.concat(n5_stellar);
        var rd4 = n3_stellar.concat(n2_stellar);
        //1: innet out
        rd1.sort(function(a,b){return a.outf > b.outf ? 1 : -1;}); 
        //2: outnet out
        rd2.sort(function(a,b){return a.outf > b.outf ? 1 : -1;});
        //3: outnet in
        rd3.sort(function(a,b){return a.inf > b.inf ? 1 : -1;});   
        //4: innet in
        rd4.sort(function(a,b){return a.inf > b.inf ? 1 : -1;});
        var dataSig = [rd1,rd2,rd3,rd4];

        var svgTrendBG = svgStellar.append("rect")
                                 .attr("x",30)
                                 .attr("y",500)
                                 .attr("width",trendWidth)
                                 .attr("height",trendHeight)
                                 .attr("rx",5)
                                 .attr("ry",5)
                                 .attr("fill", "#f0f0f0")
                                 .attr("opacity", 0.3);
        //console.log(d3)                   
        var xDomainP = [0, d3.max([rd1.length,rd4.length])],
            yDomainP = [0, d3.max(rd1.concat(rd2), function (d) {return d.outf;})],
            xDomainN = [0, d3.max([rd2.length,rd3.length])],
            yDomainN = [0, d3.max(rd3.concat(rd4), function (d) {return d.outf;})];

        var xScaleP = d3.scale.linear().range([0,  sigWidth/2]).domain(xDomainP),
            yScaleP = d3.scale.linear().range([0, sigHeight/2]).domain(yDomainP),
            xScaleN = d3.scale.linear().range([0, -sigWidth/2]).domain(xDomainN),
            yScaleN = d3.scale.linear().range([0,-sigHeight/2]).domain(yDomainN);
        /*console.log(xScaleP.range()); console.log(xScaleP.domain());
        console.log(xScaleN.range()); console.log(xScaleN.domain());
        console.log(yScaleP.range()); console.log(yScaleP.domain());
        console.log(yScaleN.range()); console.log(yScaleN.domain());
        console.log(xScaleP(5)); */   
        var xAxisP  = d3.svg.axis().scale(xScaleP).orient('right').innerTickSize(4).outerTickSize(0).tickPadding(10),
            yAxisP  = d3.svg.axis().scale(yScaleP).orient('bottom').innerTickSize(4).outerTickSize(0).tickPadding(10),
            xAxisN  = d3.svg.axis().scale(xScaleN).orient('left').innerTickSize(4).outerTickSize(0).tickPadding(10),
            yAxisN  = d3.svg.axis().scale(yScaleN).orient('top').innerTickSize(4).outerTickSize(0).tickPadding(10);
        console.log(yAxisN); 
        var svgTrend = svgTrendBG.append('g').attr('transform', 'translate(' +  trendWidth/2 + ',' + trendHeight/2 + ')');

        /*drawPath(svgTrend, rd1, xAxisP, yAxisP, "out");
        drawPath(svgTrend, rd2, xAxisN, yAxisP, "out");
        drawPath(svgTrend, rd3, xAxisN, yAxisN, "in");
        drawPath(svgTrend, rd4, xAxisP, yAxisN, "in");*/
 
        // svgTrend, data, scaleLeft, scaleTop, scaleRight, scaleBottom
        function drawPath (svg, data, xScale, yScale, flag) {
          console.log(data);
          var pathd = d3.svg.area()
                        .interpolate("basis")
                        .x(function (d,i) {return xScale(i); })
                        .y0(function (d) {return 0; })
                        .y1(function (d) {if (flag == "in") {return yScale(d.inf);} 
                                            else if (flag == "out") {return yScale(d.outf);} 
                                            else {console.log("wrong type of "+flag);}})
                        ;
          console.log(data);
          svg.datum(data);
          svg.append("path")
             .attr("d", pathd)
             .attr("fill","blue")
             .attr("stroke","snow")
             .attr("transform","translate("+trendWidth/2+","+trendHeight/2+")")
             ;
          console.log(svg.d);
        };

    };

// ]]>