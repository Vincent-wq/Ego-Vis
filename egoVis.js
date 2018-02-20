//<![CDATA[

// system conf and gloabal constancts

// global varebles
var selEgo = null;
var colorRadar = d3.scale.ordinal()
                   .range(["#1f78b4","#33a02c","#e31a1c","#6a3d9a","#B5B800","#b15928"]);
                   // original light yellow D8DB00
var nw_Color = d3.scale.quantize()  
                          .domain([0,1])
                          .range(["#bf812d","#80cdc1",])
var w_Color = {"r": "#b2182b", "b": "#2166ac", "n":"none"};
var colorHC = ["#6DA8E3", "#b2182b"];
// original blue 2166ac
var scatterNum = d3.scale.threshold()
                   .domain([3,5,10,25,50,100,200,3000,30000])
                   .range(["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd"]);

//scaterVis
var width_sts = 960, height_sts = 720;
var padding_sts = {"top": 80, "right": 140, "bottom": 140, "left": 120}
var axisWidth_sts = width_sts-padding_sts.right-padding_sts.left; 
var axisHeight_sts = height_sts-padding_sts.top-padding_sts.bottom;
//groupVis
var width_group = 960, height_group = 720;
var padding_group = {"top": 20, "right": 20, "bottom": 20, "left": 240}
var x_group = width_group-padding_group.right-padding_group.left; 
var y_group = height_group-padding_group.top-padding_group.bottom;
//stellarVis
var width_stellar = 960, height_stellar = 720;
var padding_stellar = {"top": 0, "right": 0, "bottom": 0, "left": 240}
var axisW_stellar = width_stellar-padding_stellar.right-padding_stellar.left; 
var axisH_stellar = height_stellar-padding_stellar.top-padding_stellar.bottom;
//radarVis
var paddingRadar = {top: 50, right: 20, bottom: 10, left: 20},
    widthRadar   = 960,
    heightRadar  = 720;

//stellarVis
var svgStellar  = d3.select("#stellarVis")
                    .append("svg")
                    .attr("width",width_stellar)
                    .attr("height",height_stellar);
//groupVis
var svgGroup  = d3.select("#groupVis")
                  .append("svg")
                  .attr("width",width_group)
                  .attr("height",height_group);
//scatterVis
var svgSts  = d3.select("#scatterVis")
                .append("svg")
                .attr("width", width_sts)
                .attr("height", height_sts);
//tstVis
var svgTest  = d3.select("#testVis")
                 .append("svg")
                 .attr("width", 800)
                 .attr("height", 600);
var totalN = 200;
// Reading data and Vis
d3.json("data/ego8-100.json",  
  function(error,data) {
        if (error) {return console.log(error);}
        else {
        
        var n = 0;
        var k =0;
        svgStellar.append("rect")
                  .attr("width",width_stellar)
                  .attr("height",height_stellar)
                  .attr("fill","white");

        svgSts.append("rect")
              .attr("width",width_sts)
              .attr("height",height_sts)
              .attr("fill","white");

        var  legend_sts =  svgSts.selectAll("g")
                                 .data(scatterNum.range()).enter()
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
                                 .attr("x", function (d) {return width_sts-230;})
                                 .attr("y",  function (d,i) {return height_sts-padding_sts.bottom-240-32*i;})
                                 .attr("fill", "k")
                                 .style("font-size", 18)
                                 .text(function (d) {return d;})

        svgTest.append("rect")
               .attr("width",800)
               .attr("height",600)
               .attr("fill","snow");

//groupVis
        svgGroup.append("rect")
                .attr("width",width_group)
                .attr("height",height_group)
                .attr("fill","white");
//scatterVis 
        drawScatter(k, data);
//bubleVis
        drawGlyph(0, data);
//stellarVis
        drawStellar(392, data);
//run test
        drawTest(data);

/*        svgSts.call(d3.downloadable({
          width:1024,
          height:720,
          filename:"sts.png"
        }));
        svgGroup.call(d3.downloadable({
          width:1024,
          height:720,
          filename:"group.png"
        }));
        svgStellar.call(d3.downloadable({
          width:1024,
          height:720,
          filename:"example.png"
        }));*/

}});



function drawGlyph (k, data) {

  // deleting old elements
        var oldBgs =  svgGroup.selectAll(".bg"); oldBgs.remove();
        var oldRadars =  svgGroup.selectAll(".radar"); oldRadars.remove();
        var oldInfoTexts = svgGroup.selectAll(".infotext"); oldInfoTexts.remove();
        var oldHcircles = svgGroup.selectAll(".halfcircle"); oldHcircles.remove();
        var oldChordChords= svgGroup.selectAll(".iPath"); oldChordChords.remove();
        var oldRect = svgGroup.selectAll(".rect"); oldRect.remove();

// info Texts        
         svgGroup.selectAll(".rect").data([1,2,3]).enter().append("rect").attr("width",100)
                                  .attr("height",50)
                                  .attr("x",50)
                                  .attr("y",function (d,i) {return 30 + 150*i})
                                  .attr("opacity",1)
                                  .attr("fill","royalblue")
                                  ;
         svgGroup.selectAll(".rect").data([1,2,3]).enter().append("text").attr("x",60)
                                  .attr("y", function (d,i) {return 74 + 150*i;})
                                  .text(function (d,i) {return "G "+d;})
                                  .attr("fill","snow")
                                  .style("font-family","Agency FB")
                                  .style("font-weight","bold")
                                  .attr("opacity",1)
                                  .attr("font-size",48)
                                  ;
          svgGroup.selectAll(".rect").data([1,2,3]).enter().append("rect").attr("width",100)
                                  .attr("height",50)
                                  .attr("x",50)
                                  .attr("y", function (d,i) {return 30+i*150;})
                                  .attr("opacity",0)
                                  .attr("fill","red")
                                  .on("click",function (d,i) { k = d-1; console.log(k); drawGlyph(k,data);})
                                  ;

                        svgGroup.append("text")
                                  .attr("class","infotext")
                                  .attr("x",50)
                                  .attr("y",680)
                                  .text(k)
                                  .attr("fill","royalblue")
                                  .style("font-family","Agency FB")
                                  .style("font-weight","bold")
                                  .attr("opacity",1)
                                  .attr("font-size",40)
                                  ;

    // arc conf
        var ng = 16, sng = 4;
        var widthPanel = 240; var widthb = (width_group - widthPanel) / sng;
        var heightb = height_group / sng; rMax = Math.min(widthb,heightb) / sng; 

        var rArcMin = 0.5*rMax, rArcMax = 0.8*rMax, rRadarMin=0.8*rMax, rRadarMax = 1.1*rMax;
        // data preparation
        var rdata = data.examples[k];
        var gs = data.gsize[k]
        var scaleFactor = [];
        var radardata = [];
        // radar data pre
        for (var tmp in rdata) {
          radardata.push([{"axis":"out degree","value":rdata[tmp][0]},
                          {"axis":"average weight","value":rdata[tmp][1]},
                          {"axis":"self balance distance","value":rdata[tmp][2]},
                          {"axis":"in degree","value":rdata[tmp][3]},
                          {"axis":"balance index","value":rdata[tmp][4]},
                          {"axis":"weight","value":rdata[tmp][5]}]);

          scaleFactor.push(rdata[tmp][0]);
          scaleFactor.push(rdata[tmp][3]);
        };      
        
        var rScale   = d3.scale.linear().domain(d3.extent(scaleFactor)).range([rArcMin+(rArcMax-rArcMin)/2,rArcMax]);
       
    //prepare Arc data   
        dataS1 = rdata.map(function (d,i) {return {
          xx : widthPanel + ((i-(i%sng)) / sng + 0.5) * widthb,
          yy : (i%sng+0.5)*heightb,
          size : rScale(d[0]),
          val  : d[3]/(d[0]+d[3])
          }
        });
        // console.log(dataS1.length,dataS1)
// draw back ground
         var borderRingi = svgGroup.selectAll(".circle")
                                   .data(dataS1)
                                   .enter().append("circle")
                                   .attr("class","bg")
                                   .attr({
                                   "cx": function (d) { return d.xx;},
                                   "cy": function (d) { return d.yy;},
                                   "r": rRadarMin,
                                   "fill-opacity":0,
                                   "stroke": "#E6DBCB",
                                   "stroke-width": 2,
                                   "stroke-opacity": 0.5,
                                   "alpha": 0.8
                                  });

         var borderRingo = svgGroup.selectAll(".circle")
                                   .data(dataS1)
                                   .enter().append("circle")
                                   .attr("class","bg")
                                   .attr({
                                   "cx": function (d) { return d.xx;},
                                   "cy": function (d) { return d.yy;},
                                   "r":rRadarMax,
                                   "fill-opacity":0,
                                   "stroke": "#E6DBCB",
                                   "stroke-width":2,
                                   "stroke-opacity" : 0.5,
                                   "alpha":0.8
                                  });

        var cenCircle = svgGroup.selectAll(".circle")
                                .data(dataS1)
                                .enter().append("circle")
                                .attr("class","bg")
                                .attr({
                                  "cx": function (d) { return d.xx;},
                                  "cy": function (d) { return d.yy;},
                                  "r":function (d) {return rScale(gs);},
                                  "fill": "#E6DBCB",
                                  "opacity": 0.6
                                });
// draw arc pie 
        var zinScale = d3.scale.quantize()
                         .domain([34.0,34.4])
                         .range(["#4393c3","#92c5de","#d1e5f0"].reverse())
        var zoutScale = d3.scale.quantize()
                          .domain([34.0,34.4])
                          .range(["#d6604d","#f4a582","#fddbc7"].reverse())
// draw radar line  
      //  console.log(radardata) 
      //  console.log(dataS1)                              
        for (var tmp in radardata) {
         // console.log(tmp,radardata[tmp])
          var pos = [dataS1[tmp].xx, dataS1[tmp].yy];
          var options = { iRadius: rRadarMin,        //Width of the circle
                          oRadius: rRadarMax,        //Height of the circle
                          dotRadius: 6,      //The size of the colored circles of each blog
                          strokeWidth: 3,    //The width of the stroke around each blob
                          loc:pos,
                          color: colorRadar //Color function
                        };

          circleRadar(svgGroup,[radardata[tmp]],options);
          var ci = zinScale(Math.abs(dataS1[tmp].size-gs)/gs);
          var co = zoutScale(Math.abs(dataS1[tmp].size-gs)/gs);
          //console.log("input",tmp, "pos", pos, "val ",Math.round(dataS1[tmp].val*100)/100)
          console.log("draw picture");
          halfCircle(svgGroup, pos, rMax*0.5, Math.round(dataS1[tmp].val*100)/100, colorHC);
         
        }    
};

function circleRadar(svg, data, options) {
  var cfg = {
   iRadius: 100,        //Width of the circle
   oRadius: 200,        //Height of the circle
   maxValue: 0,
   minValue: 0,       //What is the value that the biggest circle will represent
   dotRadius: 36,      //The size of the colored circles of each blog
   strokeWidth: 20,    //The width of the stroke around each blob
   loc:[0,0],
   color: d3.scale.category10() //Color function
  };
  //Put all of the options into a variable called cfg
  if('undefined' !== typeof options){
    for(var i in options){
    if('undefined' !== typeof options[i]){ cfg[i] = options[i]; }
    }//for i
  }//if
  //If the supplied maxValue is smaller than the actual one, replace by the max in the data
  var maxValue = Math.max(cfg.maxValue, d3.max(data, function(i){return d3.max(i.map(function(o){return o.value;}))}));
  var minValue = Math.min(cfg.minValue, d3.min(data, function(i){return d3.min(i.map(function(o){return o.value;}))}));
  var allAxis  = (data[0].map(function(i, j){return i.axis})), //Names of each axis
      total    = allAxis.length,                               //The number of different axes                                //Radius of the outermost circle
      angleSlice = Math.PI * 2 / total;                        //The width in radians of each "slice"
  
  //Scale for the radius
  var rScale = d3.scale.linear()
                 .range([cfg.iRadius, cfg.oRadius])
                 .domain([minValue, maxValue]);
  
  //Initiate the radar chart SVG
  svg.attr("class", "radar");
  //Append a g element    
  var g = svg.append("g")
             .attr("transform", "translate(" + cfg.loc[0]+ "," + cfg.loc[1] + ")");
/////////////////////////////////////////////////////////
////////// Glow filter for some extra pizzazz ///////////
  var filter = g.append('defs').append('filter').attr('id','glow'),
      feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation','2.5').attr('result','coloredBlur'),
      feMerge = filter.append('feMerge'),
      feMergeNode_1 = feMerge.append('feMergeNode').attr('in','coloredBlur'),
      feMergeNode_2 = feMerge.append('feMergeNode').attr('in','SourceGraphic');
/////////////////////////////////////////////////////////
///////////// Draw the radar chart blobs ////////////////
//The radial line function
  var radarLine = d3.svg.line.radial()
                    .interpolate("cardinal-closed")
                    .radius(function(d) { return rScale(d.value); })
                    .angle(function(d,i) {  return i*angleSlice; });
//Create a wrapper for the blobs  
  var blobWrapper = g.selectAll(".radarWrapper")
                     .data(data)
                     .enter().append("g")
                     .attr("class", "radarWrapper");
//Create the outlines 
      blobWrapper.append("path")
                 .attr("class", "radar")
                 .attr("d", function(d,i) { return radarLine(d); })
                 .style("stroke-width", cfg.strokeWidth + "px")
                 .style("stroke", function(d,i) { return "#F6833C"; })
                 .style("fill", "none")
                 .style("filter" , "url(#glow)");    
//Append the circles
      blobWrapper.selectAll(".radarCircle")
                 .data(function(d,i) { return d;})
                 .enter().append("circle")
                 .attr("class", "radar")
                 .attr("r", cfg.dotRadius)
                 .attr("cx", function(d,i){ return rScale(d.value) * Math.cos(angleSlice*i - Math.PI/2); })
                 .attr("cy", function(d,i){ return rScale(d.value) * Math.sin(angleSlice*i - Math.PI/2); })
                 .style("fill", function(d,i,j) { return cfg.color(i); })
                 .style("fill-opacity", 0.9);
}//RadarChart

function drawScatter(k,data) {
// Scatter Vis 
// deleting old elements
        var oldNodes =  svgSts.selectAll(".scatter_c"); oldNodes.remove();
        var oldXaxis =  svgSts.selectAll(".xAxis"); oldXaxis.remove();
        var oldYaxis =  svgSts.selectAll(".yAxis"); oldYaxis.remove();
        var oldinfotext =  svgSts.selectAll(".infotext"); oldinfotext.remove();
//data formating
  // sts- [ Bi, o_ind, o_ofreq, o_odura, oAW, Theta ]
        var dataSts = {};
        dataSts.name = ["inD", "ofreq", "odura", "AB", "oAW","TB"];
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
                                 .attr("font-family","Agency FB" ).attr("font-size",80).attr("fill","k").attr("font-weight","bold").text(targetName);

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
                                 .attr("fill","snow")
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
                                      .attr("fill","snow")
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
        var oldNodes =  svgStellar.selectAll(".chordPath"); oldNodes.remove();
        var oldInfoTexts = svgStellar.selectAll(".infotext"); oldInfoTexts.remove();
        var oldChordNodes = svgStellar.selectAll(".oPath"); oldChordNodes.remove();
        var oldChordChords= svgStellar.selectAll(".iPath"); oldChordChords.remove();
        var oldRect = svgStellar.selectAll(".rect"); oldRect.remove();
// info Texts        
         svgStellar.selectAll(".rect").data([1,2,3]).enter().append("rect").attr("width",100)
                                  .attr("height",50)
                                  .attr("x",50)
                                  .attr("y",function (d,i) {return 30 + 150*i})
                                  .attr("opacity",1)
                                  .attr("fill","royalblue")
                                  ;
         svgStellar.selectAll(".rect").data([1,2,3]).enter().append("text").attr("x",60)
                                  .attr("y", function (d,i) {return 74 + 150*i;})
                                  .text(function (d,i) {return "G "+d;})
                                  .attr("fill","snow")
                                  .style("font-family","Agency FB")
                                  .style("font-weight","bold")
                                  .attr("opacity",1)
                                  .attr("font-size",48)
                                  ;
          svgStellar.selectAll(".rect").data([1,2,3]).enter().append("rect").attr("width",100)
                                  .attr("height",50)
                                  .attr("x",50)
                                  .attr("y", function (d,i) {return 30+i*150;})
                                  .attr("opacity",0)
                                  .attr("fill","red")
                                  .on("click",function (d,i) { n = Math.round(Math.random()*totalN)+200*i; drawStellar(n,data);})
                                  ;
                                  // draw arc pie 
/*        var zinScale = d3.scale.quantize()
                         .domain([34.0,34.4])
                         .range(["#4393c3","#92c5de","#d1e5f0"].reverse())
        var zoutScale = d3.scale.quantize()
                          .domain([34.0,34.4])
                          .range(["#d6604d","#f4a582","#fddbc7"].reverse())
                          */

         svgStellar.selectAll(".rect").data([1,2,3]).enter().append("circle")
                                  .attr("r",20)
                                  .attr("cx",70)
                                  .attr("cy",function (d,i) {return 120 + 150*i})
                                  .attr("opacity",1)
                                  .attr("fill","#92c5de")
                                  ;
         svgStellar.selectAll(".rect").data([1,2,3]).enter().append("circle")
                                  .attr("r",20)
                                  .attr("cx",130)
                                  .attr("cy",function (d,i) {return 120 + 150*i})
                                  .attr("opacity",1)
                                  .attr("fill","#f4a582")
                                  ;

         svgStellar.selectAll(".rect").data([1,2,3]).enter().append("text")
                                  .attr("x",70)
                                  .attr("y", function (d,i) {return 120 + 150*i;})
                                  .attr("dx",-5)
                                  .attr("dy",8)
                                  .text("N")
                                  .attr("fill","snow")
                                  .style("font-family","Agency FB")
                                  .style("font-weight","bold")
                                  .attr("opacity",1)
                                  .attr("font-size",24)
                                  ;
         svgStellar.selectAll(".rect").data([1,2,3]).enter().append("text")
                                  .attr("x",130)
                                  .attr("y", function (d,i) {return 120 + 150*i;})
                                  .attr("dx",-5)
                                  .attr("dy",8)
                                  .text("A")
                                  .attr("fill","snow")
                                  .style("font-family","Agency FB")
                                  .style("font-weight","bold")
                                  .attr("opacity",1)
                                  .attr("font-size",24)
                                  ;
          svgStellar.selectAll(".rect").data([1,2,3]).enter().append("circle")
                                  .attr("r",20)
                                  .attr("cx",70)
                                  .attr("cy",function (d,i) {return 120 + 150*i})
                                  .attr("opacity",0)
                                  .attr("fill","red")
                                  .on("click",function (d,i) { n = Math.round(Math.random()*100)+100+200*i; drawStellar(n,data);})
                                  ;
          svgStellar.selectAll(".rect").data([1,2,3]).enter().append("circle")
                                  .attr("r",20)
                                  .attr("cx",130)
                                  .attr("cy",function (d,i) {return 120 + 150*i})
                                  .attr("opacity",0)
                                  .attr("fill","red")
                                  .on("click",function (d,i) { n = Math.round(Math.random()*100)+200*i; drawStellar(n,data);})
                                  ;
         
                        svgStellar.append("text")
                                  .attr("class","infotext")
                                  .attr("x",50)
                                  .attr("y",500)
                                  .text(n)
                                  .attr("fill","royalblue")
                                  .style("font-family","Agency FB")
                                  .style("font-weight","bold")
                                  .attr("opacity",1)
                                  .attr("font-size",40)
                                  ;
// Stellar Vis
    // data preparation
        var selEgo  = data.egos[n],
            sigData = selEgo.signature,
            linkData= selEgo.links;
            bnwData  = selEgo.nw.slice(0,2);
            nwData  = selEgo.nw.slice(2,4);
        var outd = selEgo.nw[4];

        var alterWidth = d3.scale.threshold().domain([50,150,200,300]).range([2,1.5,1,0.5,0.2]);
        console.log(outd)
        var R = Math.min(width_stellar,height_stellar) / 2;
        var rL1= 0.3 , rL2 = 0.37, rL3 = 0.386, rL4 =0.9,
            wL1=0.05, wL2 =0.01, 
            interAngle1 = 10*Math.PI/180, interAngle2 = 0.5*Math.PI/180, padAngle = Math.PI/180;

    
    // social signature out-red, in+blue
  // data pre
  var tdata1 = sigData.d1.map(function (d,i) { return parseInt(d.v); });
  var tdata2 = sigData.d2.map(function (d,i) { return parseInt(d.v); });
  var tdata=[]; var rtdata=[];
  
  for (var i=0; i<(tdata1.length); i++) {
    tdata.push(tdata1[i]+tdata2[i]);
    rtdata.push([tdata1[i], tdata2[i], sigData.d1[i].c, sigData.d2[i].c]) };
    rtdata.sort( function (a,b) {return (a[0]+a[1]) < (b[0]+b[1]) ? 1 : -1;} )
    tdata.sort( function (a,b) {return (a < b ? 1 : -1);} )
  console.log(tdata)
  console.log(rtdata)
  console.log(n);
  // confs...
  var angle =2 * Math.PI/rtdata.length;
  var wScale = d3.scale.linear().domain([0, 1.1*d3.max(tdata)]).range([rL3*R, rL4*R]);
  
  // layer 1 and layer 2 pies and arcs
  var sigPie = d3.layout.pie()
                         .sort(null)
                         .value(function(d,i) {  return 1; })
                         .startAngle(0)
                         .endAngle(2*Math.PI);

  var arc1 = d3.svg.arc()
               .innerRadius(rL3*R)
               .outerRadius(function(d) {return wScale(d.data[0]);})
               ;

  var arc2 = d3.svg.arc()
               .innerRadius(function(d) {return wScale(d.data[0]);})
               .outerRadius(function(d) {
/*                console.log(n); 
                console.log(d.data);
                console.log(wScale(d.data[0]+d.data[1]));*/
                return wScale(d.data[0]+d.data[1]);})
               ;
  var pierchartdata = sigPie(rtdata)

  // add paths
      svgStellar.selectAll(".iPath")
                .data(pierchartdata)
                .enter().append("path")
                .attr("fill",function (d) {return w_Color[d.data[2]];})
                .attr("stroke", "snow")
                .attr("class", "iPath")
                .attr("d", arc1)
                .attr("stroke-width", function()　{return alterWidth(outd);})
               // .attr("stroke-opacity",0)
                .attr("transform", "translate(" + width_stellar/2 +"," + height_stellar/2 + ")");

      svgStellar.selectAll(".oPath")
                .data(pierchartdata)
                .enter().append("path")
                .attr("fill",function (d) {return w_Color[d.data[3]];})
                .attr("stroke", "snow")
                .attr("class", "oPath")
                .attr("d", arc2)
                .attr("stroke-width", function() {return alterWidth(outd);})
                //.attr("stroke-opacity",0)
                .attr("transform", "translate(" + width_stellar/2 +"," + height_stellar/2 + ")");
                

    // chord of inter - bi-contacts links (if have)
        if (linkData.toString() != [[0,0],[0,0]].toString()) {
          var chord_stellar = d3.layout.chord()
                                .padding(0.2)
                                .matrix(linkData);

          var gChord_stellar = svgStellar.append("g")
                               .attr("transform", "translate(" + width_stellar/2 +"," + height_stellar/2 + ")");

          var gChord_node_stellar = gChord_stellar.append("g");
          var gChord_chord_stellar= gChord_stellar.append("g");
          var chord_arc_stellar = d3.svg.arc().innerRadius((rL1-wL1)*R).outerRadius((rL1+wL1)*R);
              gChord_node_stellar.selectAll(".oPath")
                                 .data(chord_stellar.groups()).enter()
                                 .append("path")
                                 .attr("class", "oPath")
                                 .style("fill", function (d) {return nw_Color(d.index);})
                                 .attr("d", chord_arc_stellar)
                                 .on("mouseover",fade(0.1))
                                 .on("mouseout",fade(0.6));

          var gChord_chordInner_stellar = d3.svg.chord().radius((rL1-wL1) * R * 0.96);
              gChord_chord_stellar.selectAll(".chordPath")
                                  .data(chord_stellar.chords()).enter()
                                  .append("path")
                                  .attr("class","chordPath")
                                  .attr("d",gChord_chordInner_stellar)
                                  .style("fill",function (d) {return nw_Color(d.source.index);})
                                  .attr("opacity",0.6)
                                  .attr("stroke-width",0)
                                  .attr("stroke-opacity",0);

          function fade (opacity) {
            return function (g,i) {
              gChord_chord_stellar.selectAll(".chordPath")
                                  .filter(function (d) {return d.source.index != i && d.target.index!= i;})
                                  .transition()
                                  .style("opacity",opacity);
                                  }
          };
        }
    // chord of inter - bi-contacts links (if not have)
      else {
        var l1_data   = bnwData;
        var l1_sum   = l1_data.reduce( function (d1,d2) {return d1+d2;} );
        // if  no bi-contacts, do nothing 
        if (l1_sum == 0 ) {
          console.log("no bi-direction contacts!")
        }
        else {
          var arcL1_angle_stellar = l1_data.map( function (d) {return (2*Math.PI-l1_data.length*interAngle1)*d / l1_sum;})
          var arcL1_d_stellar = arcL1_angle_stellar.map(
                                                  function(d,i){ return {"rIn" : (rL1-wL1)*R, "rOut" : (rL1+wL1)*R,
                                                       "startAngle" : interAngle1*(i+0.5) + eval(arcL1_angle_stellar.slice(0,i).concat([0]).join('+')),
                                                       "endAngle"   : interAngle1*(i+0.5) + eval(arcL1_angle_stellar.slice(0,i+1).join('+')),
                                                       "index": i}
                                                    }); // end of map
        var arc_nomatrix = d3.svg.arc().innerRadius(function (d) {return d.rIn;}).outerRadius(function (d) {return d.rOut;});
        var acrL1 = svgStellar.selectAll("#arcPath")
                                    .data(arcL1_d_stellar).enter()
                                    .append("path")
                                    .attr("class","arcPath")
                                    .attr("d", function (d) {return arc_nomatrix(d);})
                                    .attr("fill", function (d) {return nw_Color(d.index);})
                                    .attr("fill-opacity",1)
                                    .attr("stroke-width",0)
                                    .attr("stroke-opacity",0)
                                    .attr("transform", "translate(" + width_stellar/2 +"," + height_stellar/2 + ")");
       };// else have bi-contacts 
    };//else  chord of inter - bi-contacts links (if not have)

    // total in and out net users
    var l2_data   = nwData;
        var l2_sum   = l2_data.reduce( function (d1,d2) {return d1+d2;} );
        if (l2_sum == 0 ) {
          console.log("no bi-direction contacts!")
        }
        else {
          var arcL2_angle_stellar = l2_data.map( function (d) {return (2*Math.PI-l2_data.length*interAngle2)*d / l2_sum;})
          var l2_data = arcL2_angle_stellar.map(
                                                  function(d,i){ return {"rIn" : (rL2-wL2)*R, "rOut" : (rL2+wL2)*R,
                                                       "startAngle" : interAngle2*(i+0.5) + eval(arcL2_angle_stellar.slice(0,i).concat([0]).join('+')),
                                                       "endAngle"   : interAngle2*(i+0.5) + eval(arcL2_angle_stellar.slice(0,i+1).join('+')),
                                                       "index": i}
                                                    });
        var arc_stellar = d3.svg.arc()
                            .innerRadius(function (d) {return d.rIn;})
                            .outerRadius(function (d) {return d.rOut;});

        var acrL2 = svgStellar.selectAll("#arcPath")
                                    .data(l2_data).enter()
                                    .append("path")
                                    .attr("class","arcPath")
                                    .attr("d", function (d) {return arc_stellar(d);})
                                    .attr("fill", function (d) {return nw_Color(d.index);})
                                    .attr("fill-opacity",1)
                                    .attr("stroke-width",0)
                                    .attr("stroke-opacity",0)
                                    .attr("transform", "translate(" + width_stellar/2 +"," + height_stellar/2 + ")")
                                    ;
         } //end has in or out net contacts

};// end drawStellar()

 function halfCircle(svg, pos ,r , val, color) {
    //console.log("postition:"+pos);
    // console.log("x:"+(2*r + 2*(0.5-val)*r)+" y:"+r+"\tval:"+val+"\tr:"+r);
    //console.log("r", r ,"shift ", 2*(val-0.5)*r)
   var rect1 = svg.append("g").attr("id","r1");
   var rect2 = svg.append("g").attr("id","r2");

    var defs1 = rect1.append("defs");
        defs1.append("clipPath")
            .attr("id", "circle1")
            .append("circle")
            .attr("cx", 2*r + 2*(0.5-val)*r)
            .attr("cy", r)
            .attr("r", r);

   var defs2 = rect2.append("defs");
       defs2.append("clipPath")
            .attr("id", "circle2")
            .append("circle")
            .attr("cx", 2*(0.5-val)*r)
            .attr("cy", r)
            .attr("r", r);

    draw1(rect1,pos,r,val,color);
    draw2(rect2,pos,r,val,color);
    
  };
  
  function draw1(svg,pos,r,val,color){
      svg.append("rect")
           .attr("clip-path", "url(#circle1)")
           .attr("width", 2*r)
           .attr("height", 2*r)
           .style("fill", color[0])
           .attr("class","halfcircle")
           .attr("stroke","none")
           .attr("stroke-opacity", 0)
           .attr("stroke-width", 0)
           .attr("transform", "translate(" + (pos[0] - 2*r + 2*(val-0.5)*r) + "," +(pos[1] - r) + ")")
           ;
  };

  function draw2(svg,pos,r,val,color){

    svg.append("rect")
           .attr("clip-path", "url(#circle2)")
           .attr("width", 2*r)
           .attr("height", 2*r)
           .style("fill", color[1])
           .attr("class","halfcircle")
           .attr("stroke","none")
           .attr("stroke-opacity", 0)
           .attr("stroke-width", 0)
           .attr("transform", "translate(" + (pos[0] + 2*(val-0.5)*r) + "," + (pos[1] - r) + ")")
           ;
  }

function drawTest(data) {
  var tdata = [0.1, 0.2, 0.3];
  var colorHC = ["#2166ac", "#b2182b"];
  halfCircle(svgTest, [300,200], 100, 0.8, colorHC);
}

// ]]>