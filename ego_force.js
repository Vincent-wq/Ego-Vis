// data reading

var width=window.screen.width*0.7 , height=window.screen.availHeight*0.7;
var paddding = 100;
var color = d3.scale.category20();

//rendering
var svg_f = d3.select("body").append("svg").attr("width",width).attr("height",height);
var force_f = d3.layout.force()
              .size([width/2,height]) 
              .linkDistance(200) 
              .charge([-120])
              .gravity(0.04);

d3.csv("pECN/data/nodes1.csv", function(d) {if (d.type == 0 ) 
                                               {return {name:d.name,
                                                        type:+d.type,
                                                        //apd: function() {this.append("circle")},
                                                        fun: function() {this.attr("r","120")}};}
                                          else {return {name:d.name,
                                                        type:+d.type,
                                                       // apd:function() {this.append("rect")},
                                                        fun:function() {this.attr("width","50").attr("height","50")}};} },
	function(error,nodes) {
  //console.log(nodes)

  //var datas=[{type:"rect"  , fun:function() {this.attr("width","100").attr("height","100")}},
  //           {type:"circle", fun:function() {this.attr("r","120")}}];
   
                 //  nodes.forEach(function(d){
                  //     d3.select("svg").append( 
                  //      function() { if (d.type==0) {return "circle";} else {return "rect";}}).call(d.fun)} 
                  //     );

	//console.log(nodes)
	d3.csv("pECN/data/edgesf1.csv",function(d) {
		return {source:+d.source,target:+d.target,w:+d.w}},
		function(error,edges) {
	    //console.log(edges)
        
        var link = svg_f.selectAll(".link")
                      .data(edges)
                      .enter().append("line")
                      .attr("class", "link")
                      .style("stroke","#ccc")
                      .style("stroke-width",function(d){return d.w+4;});

        var t_map = {0:"'circle'",1:"'rect'",2:"'rect'",3:"'rect'"};

/*        var node = svg_f.selectAll(".node")
                        .data(nodes)
                        .enter().append( function() {return document.creatElement("circle");} )
                        .attr("class", "link")
                        .attr("r",120)
                        .attr("fill","steelblue");*/

        var node = svg_f.selectAll("node")
                        .data(nodes)
                        .enter().append( function(d){ if (d.type==0) {return document.createElement("circle");}
                                                    else {return document.createElement("rect");}}  )
                       .each(function (d) {
                        console.log(d3.select(this));
                        d3.select(this).call(d.fun)});
        
        var node =  nodes.forEach(function(d){
                       d3.select("svg").append(function(){ if (d.type==0) {return document.createElement("circle");}
                                                    else {return document.createElement("rect");}}).call(d.fun)
                    });
               
        // t_map[d.type] 
        // function(){ if (d.type==0) {return "circle";}
        //   call( function(d) {console.log(d.fun); return d.fun;} );                                        else {return "rect";}} 


//console.log(nodes);
//console.log(node);
        var label = svg_f.selectAll("text")
                         .data(nodes)
                         .enter().append("text")
                         .style("fill","snow")
                         .style("font-size",function(d){if (d.type == 0) {return 48;} else {return 30;}})
                         .attr("dx", 0)
                         .attr("dy", 0)
                         .text(function(d){ return d.name;});


        force_f.nodes(nodes)
             .links(edges)
             .start();

       // node.call(force_f.drag)

        force_f.on("tick", function(){ 
            node.attr("cx",function(d){ return d.x; })
                       .attr("cy",function(d){ return d.y; });
            label.attr("x", function(d){ return d.x; })
                       .attr("y", function(d){ return d.y; });
            link.attr("x1",function(d){ return d.source.x; })
                       .attr("y1",function(d){ return d.source.y; })
                       .attr("x2",function(d){ return d.target.x; })
                       .attr("y2",function(d){ return d.target.y; });});

	});}
  );

var g = d3.select('body')
        .append('svg')
        .attr('width',400)
        .attr('height',400);

var d = 'M153 334 C153 334 151 334 151 334 C151 339 153 344 156 344 C164 344 171 339 171 334 C171 322 164 314 156 314 C142 314 131 322 131 334 C131 350 142 364 156 364 C175 364 191 350 191 334 C191 311 175 294 156 294 C131 294 111 311 111 334 C111 361 131 384 156 384 C186 384 211 361 211 334 C211 300 186 274 156 274';

var path = g.append('path')
        .attr('d',d)
        .attr('style', 'fill:white;stroke:red;stroke-width:2');