"use strict";

(function() {
	var VD, //handle to app -to be initialized with a new instance
		body = document.getElementsByTagName("body")[0];
	
	body.onload = function() {
		VD = new VDay();
		body.onmouseup = VD.dragOff;
		body.onscroll = function(){ event.preventDefault(); };
		
		return;
	};
	
	//method used to obtain url variables
	function getUrlVars() {
		var vars = {},
			parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value){
				vars[key] = value;
			});
		
		return vars;
	}
	
	//the 'heart' of the app ;-)
	function VDay() {
		var my_x,
			my_y,
			drag = false,
			canvas = document.getElementById('my_canvas'), //canvas handle
			context = my_canvas.getContext("2d"), //controls canvas 'modes'
			clear_button = document.getElementById('clear-button'),
			heart = new Image(),
			background = new Image(),
			name = getUrlVars()["name"],
			thisVDay = this;
		
		//translates from page coordinates to canvas coordinates
		function translateCoords(event) {
			my_x = event.pageX - canvas.offsetLeft;
			my_y = event.pageY - canvas.offsetTop;
			
			return;
		}
		
		function drawTrail(event) {
			var touches;
			
			if(event.targetTouches) {
				touches = event.targetTouches;
				
				for(var i = 0; i < touches.length; i++) {
					my_x = touches[i].pageX - canvas.offsetLeft;
					my_y = touches[i].pageY - canvas.offsetTop;
					context.drawImage(heart, my_x - (heart.width >> 1), my_y - (heart.height >> 1));
				}
			}
			else if(drag) {
				translateCoords(event);
				context.drawImage(heart, my_x - (heart.width >> 1), my_y - (heart.height >> 1));
			}
			
			return;
		}
		
		//touch event handlers
		canvas.ontouchstart = drawTrail;
		canvas.ontouchmove = drawTrail;
		canvas.ontouchend = drawTrail;
		
		heart.src = "small_heart.gif";
		background.src = "happy_vday.png";
		
		//grabs the url variable, "name"
		if(getUrlVars()["name"] == undefined) { name = "You"; }
		
		//overwrites canvas with background graphics: an image and name
		clear_button.onclick = function refresh() {
			context.drawImage(background, 0, 0);
			context.fillStyle = "rgb(255, 0, 0)";
			context.font = "36px Brush Script MT"; //"30px Arial";
			context.fillText(name + '!', 150, 170);
			
			return;
		}
		
		//draws a trail of hearts
		canvas.onmousemove = drawTrail;
		
		canvas.onmousedown = function dragOn(){ drag = true; } //drag on (here be drag-on's)
		this.dragOff = function dragOff(){ drag = false; } //drag off (slurred pittsburgh-ese insult)
		
		return;
	}
	
	return;
})();
