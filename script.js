var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
c.shadowColor = 'red';
c.shadowBlur = 10;

function Star (x, y, radius, opacity, randomPositive, opacityChange) {
  
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.opacity = opacity;
	var randomPositive = Math.round(Math.random())*2 - 1;
  var opacityChange = 0.3 * randomPositive;
  
  this.draw = function() {
    c.beginPath();
    c.arc( this.x, this.y, this.radius, 0, Math.PI*2 );
    var color = 'rgba(250,250,250,' + this.opacity + ')';
    c.fillStyle = color;
    c.fill();
  }
  
  this.twinkle = function() {
    
    c.beginPath();
    c.arc( this.x, this.y, this.radius, 0, Math.PI*2 );  
    if (opacity > 0.85 || opacity < 0.1) {
      opacityChange = -opacityChange;
    }
    opacity += opacityChange;
    var color = 'rgba(250,250,250,' + opacity + ')';
    c.fillStyle = color;
    c.fill();
  }
}

var starArray = [];
function createStars() {	
	var amountOfStars = (window.innerWidth + window.innerHeight)/6;
	
	for (var i=0; i < amountOfStars; i++) {
		var x = Math.random() * window.innerWidth;
		var y = Math.random() * window.innerHeight;
		var radius = Math.random() * ( 1.5 - 0.5 ) + 0.5;
		var opacity = Math.random() * ( 0.85 - 0.1 ) + 0.1;
		var randomPositive = Math.round(Math.random())*2 - 1;
		var opacityChange = 0.1 * randomPositive;
		starArray.push(new Star(x, y, radius, opacity, randomPositive,opacityChange));
	}
};

createStars();

var arr = Math.floor(starArray.length/10);
console.log(arr);

function animate() {
  c.clearRect(0,0,innerWidth, innerHeight);
	for (var i = 0; i < arr*9; i++) {
		starArray[i].draw();
	}
	for (var j = arr*9; j < arr*10; j++) {
		starArray[j].twinkle();
	}
}

animate();
setInterval(function(){
  animate();
}, 100);

$(window).resize(function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	starArray.length = 0;
	createStars();
	animate();
})