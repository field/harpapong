var GoalEffect = function(ctx, width, height) {
	
	this.ctx = ctx;
	this.width = width;
	this.height = height;

	this.flag = false;
	this.frameCounter = 0;

	this.renderText = false;
	this.textToRender = "GOAL!";
	this.ctx.font = "2pt Arial";


}

var p = GoalEffect.prototype;

p.start = function() {

	this.frameCounter = 0;

};

p.render = function() {


	this.flag = !this.flag;
	this.frameCounter++;
	

	if (this.flag){
		this.ctx.fillStyle = "white";
		for (var i=0; i < 20; i++){
			var x = Math.floor(Math.random() * this.width);
			var y = Math.floor(Math.random() * this.height);
			this.ctx.fillRect(x,y,1,1);

		}

		
	} else {

		this.ctx.fillStyle = "rgb(50,50,50)";
		this.ctx.fillRect(0,0,this.width, this.height);	

	}

	if (this.renderText){
		this.ctx.fillStyle = "green";
		this.ctx.fillText(this.textToRender, this.width- this.frameCounter, Math.floor(this.height/2) + 4);

	}

	

};

module.exports = GoalEffect;