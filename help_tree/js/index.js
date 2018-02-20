
var width=500,height=250,
margin={left:50,right:20,top:30,bottom:20},
g_width=width-margin.right-margin.left,
g_height=height-margin.top-margin.bottom;

//建立svg
d3.select("#container").append("svg:svg").attr("width",width).attr("height",height)

d3.select("svg").append("g").attr("transform","translate("+margin.left+","+margin.top+")").attr("class","aa")
d3.select("svg").append("g").attr("transform","translate("+margin.left+","+margin.top+")").attr("class","bb")

var data=[1,3,5,5,6,7,4,8,3]
var data2=[5,7,5,7,3,7,4,3,3]
var data_=[];
var data2_=[];
var scale_x=d3.scale.linear()
.domain([0,data.length-1])
.range([0,g_width])


var scale_y=d3.scale.linear()
.domain([0,d3.max(data)])
.range([g_height,0])

var line_generation=d3.svg.line()
.x(function  (d,i) {
	return scale_x(i);
})
.y(function  (d) {
	return scale_y(d);
})

d3.select("g.aa").append("path").attr("d",line_generation(data))
d3.select("g.bb").append("path").attr("d",line_generation(data2))

var x_axis=d3.svg.axis().scale(scale_x),
y_axis=d3.svg.axis().scale(scale_y).orient("left");


d3.select("svg").append("g").attr("transform","translate("+margin.left+","+(g_height+margin.top)+")")
.call(x_axis);

d3.select("svg").append("g").attr("transform","translate("+margin.left+","+margin.top+")")
.call(y_axis);

d3.select("g.aa").append("path").attr("d",line_generation(data))
var event_bg=d3.select("svg").append("g").attr("transform","translate("+margin.left+","+margin.top+")");
var line=event_bg.append("path").attr("d","M0,0L0,"+g_height).attr("transform","translate(0,0)").style("stroke","#000");
event_bg.append("rect").attr("width",g_width).attr("height",g_height).attr("opacity","0").on("mousemove",function(d){


	var set_X=d3.mouse(this)[0];


	var set_Y=d3.mouse(this)[1];
	console.log(set_Y);
	line.attr("transform","translate("+scale_x(Math.round(scale_x.invert(set_X)))+",0)");
	d3.select("div.show").text("data="+data[Math.round(scale_x.invert(set_X))]+" data2="+data2[Math.round(scale_x.invert(set_X))]);
});


