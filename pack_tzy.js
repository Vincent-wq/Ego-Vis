var width=window.screen.width , height=window.screen.availHeight;

var svg = d3.select("body").append("svg")
			.attr({ "width":width ,
					"height":height });
// force layout 初始化
var force = d3.layout.force()
			  .charge(0)
			  .gravity(0.02)
			  .size([width , height]);

// ego0_1000
d3.json("data/ego0_1000.json" , function (error , data) {	
	var nodes = [];

// 设置circle半径
	var rScale = d3.scale.linear()
				   .domain(d3.extent(data.egos , function (d) { return (d.nodeSts)[0].value; }))  
     			   .range([1 , 50]);

var count = 0;

// 载入数据
	data.egos.forEach(function (d) {
		if(count++ < 300)
		nodes.push({name: d.name ,
					radius : rScale((d.nodeSts)[0].value)});
	});

	var root = nodes[0];

	root.radius = 0;

	root.fixed = true;

	force.nodes(nodes).start();

// 画出circle
	var circles = svg.selectAll("circle")
					 .data(nodes.slice(1))
					 .enter()
					 .append("circle")
					 .attr({"r" : function (d) { return d.radius; } ,
							"stroke" : d3.rgb(27 , 98 , 165) ,
							"class" : "circles" })
					 .call(force.drag);
   

	force.on("tick" , function() {
		var q = d3.geom.quadtree(nodes),
			i = 0,
			n = nodes.length;

// 碰撞检测
		while(++i < n) q.visit(collide(nodes[i]));

// circle位置更新			
		circles.each(collide(0.5))
			   .attr({"cx" : function (d) {return d.x; },
				   	  "cy" : function (d) {return d.y; }});
	});


// 碰撞检测函数
	function collide (node) {
		var r= node.radius + 16,
			nx1 = node.x - r,
			nx2 = node.x + r,
			ny1 = node.y - r,
			ny2 = node.y + r;

		return function (quad, x1, y1, x2, y2) {
			if(quad.point && (quad.point !== node)) {
				var x = node.x - quad.point.x,
					y = node.y - quad.point.y,
					l = Math.sqrt(x * x + y * y),
					r = node.radius + quad.point.radius;

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

});  
