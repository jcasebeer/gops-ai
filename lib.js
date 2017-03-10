//"use strict"; // BREAKS FIREFOX

function degstorads(degs) 
//Given Degrees, Return Radians
{

	return degs * (Math.PI/180);
}

function lengthdir_x(len,dir)
//given a length and an angle (in Degrees), return the horizontal (x) component of 
//the vector of the angle and direction
{

	return len * Math.cos(degstorads(dir));
}

function lengthdir_y(len,dir)
// Performs the same function as lengthdir_x, but returns the vertical component
{

	return len * Math.sin(degstorads(dir));
}

// Game object, handles drawing graphics, playing sound,
// and the loop
function Game(width, height)
{
	this.width = width;
	this.height = height;

	this.canvas = document.createElement("canvas");
	this.canvas.width = this.width;
	this.canvas.height = this.height;

	this.ctx  = this.canvas.getContext("2d");

	document.body.appendChild(this.canvas);
}

// function to resize the drawing canvas
Game.prototype.resize = function(width, height)
{
	this.canvas.width = width;
	this.canvas.height = height;
}

// loop function
Game.prototype.Loop = function(update)
{
	var loop = function() 
	{
		update();
		window.requestAnimationFrame(loop, this.canvas);
	}
	window.requestAnimationFrame(loop, this.canvas);
}

// draw a rectangle
Game.prototype.drawRectangle = function(x,y,w,h,c)
{
	this.ctx.fillStyle = c || "#ffffff";
	this.ctx.fillRect(x,y,w,h);
}

Game.prototype.drawCircle = function(x,y,r,c)
{
	this.ctx.fillStyle = c || "#ffffff";
	this.ctx.beginPath();
	this.ctx.arc(x,y,r,0,Math.PI*2,true);
	this.ctx.closePath();
	this.ctx.fill();
}

// draw a line
Game.prototype.drawLine = function(xfrom, yfrom, xto, yto, c, w)
{
	this.ctx.beginPath();
	this.ctx.moveTo(xfrom, yfrom);
	this.ctx.lineTo(xto,yto);
	this.ctx.lineWidth = w || 1;
	this.ctx.strokeStyle = c || "#ffffff";
	this.ctx.closePath();
	this.ctx.stroke();
}

Game.prototype.drawText = function(x,y,font,color,text)
{
	this.ctx.fillStyle = color;
	this.ctx.font = font;
	this.ctx.textBaseline = "top";
	this.ctx.fillText(text,x,y);
}

// Game input handling object
function Input()
{
	this.down = {};
	this.pressed = {};

	var _this = this;
	document.addEventListener("keydown", 
		function (e)
		{
			e.preventDefault();
			e.stopPropagation();
			_this.down[e.keyCode] = true;
		}
	);
	document.addEventListener("keyup", 
		function(e)
		{
			e.preventDefault();
			e.stopPropagation();
			delete _this.down[e.keyCode];
			delete _this.pressed[e.keyCode];
		}
	);
}

Input.prototype.isDown = function(key)
{

	return this.down[key];
}

Input.prototype.isPressed = function(key)
{
	if (this.pressed[key])
	{
		return false;
	}
	else 
	if (this.down[key])
	{
		this.pressed[key] = true;
		return true;
	}
	return false;
}

// object storing keycodes for input
var Keyboard = {
	backspace: 8,
	tab: 9,
	enter: 13,
	shift: 16,
	ctrl: 17,
	alt: 18,
	esc: 27,
	space: 32,
	pageup: 33,
	pagedown: 34,
	end: 35,
	home: 36,
	left: 37,
	up: 38,
	right: 39,
	down: 40,
	ins: 45,
	del: 46,
	t0: 48,
	t1: 49,
	t2: 50,
	t3: 51,
	t4: 52,
	t5: 53,
	t6: 54,
	t7: 55,
	t8: 56,
	t9: 57,
	a: 65,
	b: 66,
	c: 67,
	d: 68,
	e: 69,
	f: 70,
	g: 71,
	h: 72,
	i: 73,
	j: 74,
	k: 75,
	l: 76,
	m: 77,
	n: 78,
	o: 79,
	p: 80,
	q: 81,
	r: 82,
	s: 83,
	t: 84,
	u: 85,
	v: 86,
	w: 87,
	x: 88,
	y: 89,
	z: 90,
	n0: 96,
	n1: 97,
	n2: 98,
	n3: 99,
	n4: 100,
	n5: 101,
	n6: 102,
	n7: 103,
	n8: 104,
	n9: 105
}