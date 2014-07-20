(function(global) {
	
	var CanvasRenderer = {

		canvas : null,
		ctx : null,
		isNode : false,

		width : 800,
		height : 600,

		init : function(_width, _height) {

			this.width = _width || 800;
			this.height = _height || 600;

			// Making this work in both node and browser contexts
			if (document && document.createElement){
				
				this.canvas = document.createElement("canvas");
				this.canvas.width = this.width;
				this.canvas.height = this.height;

			} else {
				this.isNode = true;
				var Canvas = require("canvas");
				this.canvas = new Canvas(this.width, this.height);

			}

			this.ctx = this.canvas.getContext("2d");
			this.ctx.fillStyle = "red";


			return this;
		},


		render : function(game){

			this.ctx.clearRect(0,0,this.width, this.height);

			this.ctx.save();

			this.ctx.scale(this.width, this.height);

			// player a
			aX = (game.pos.a.x - game.pw / 2);
			aY = (game.pos.a.y - game.ph / 2);
			this.ctx.fillRect(aX, aY, game.pw, game.ph);

			// player b
			bX = (game.pos.b.x - game.pw / 2);
			bY = (game.pos.b.y - game.ph / 2);
			this.ctx.fillRect(bX, bY, game.pw, game.ph);

			// ball
			// this.ctx.beginPath();
			// this.ctx.arc(game.pos.ball.x, game.pos.ball.y, game.ballSize, 0, 2 * Math.PI, false);
			// this.ctx.fill();
			var bw = game.ballSize;
			this.ctx.fillRect(game.pos.ball.x -bw/2, game.pos.ball.y - bw/2, bw, bw);


			this.ctx.restore();

		}




	};

	global.CanvasRenderer = (global.module || {}).exports = CanvasRenderer;


})(this);