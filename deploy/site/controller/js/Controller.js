(function() {
	
	var Controller = {

		GAME_STATE_CONNECTING : "gameStateConnecting",
		GAME_STATE_WAIT : "gameStateWait",
		GAME_STATE_DURING : "gameStateDuring",
		GAME_STATE_GOAL : "gameStateGoal",
		GAME_STATE_AFTER : "gameStateAfter",

		state : null,
		socket : null,
		input : null,
		playerId : "",
		score : 0,
		win : false,

		updateFlag : true,

		init : function(wsUrl, playerId, controlMethod) {

			this.state = this.GAME_STATE_CONNECTING;

			this.playerId = playerId;

			if (controlMethod == "mouse"){
				this.input = MouseInput.init();
			} else {
				this.input = AccelInput.init(controlMethod);	
			}
			
			

			this.socket = io.connect(wsUrl);
			this.socket.on("connect", this.socketConnectHandler.bind(this));

			this.update();

			return this;
		},

		socketConnectHandler : function() {

			
			this.socket.on("identify", this.onIdentify.bind(this));
			this.socket.on("start", this.onGameStart.bind(this));
			this.socket.on("goal", this.onGameGoal.bind(this));
			this.socket.on("bounce", this.onPaddleBounce.bind(this));
			this.socket.on("finish", this.onGameEnd.bind(this));

		},

		onIdentify : function(){

			// identify as controller
			this.socket.emit("registercontroller", { id : this.playerId });

		},

		onGameWait : function() {

			this.state = this.GAME_STATE_WAIT;

			// we're waiting for the other player to connect

		},

		onGameStart : function() {

			this.state = this.GAME_STATE_DURING;

			console.log("Game start!");

			this.score = 0;
			this.win = false;

			// TODO : handle game start

		},

		onGameEnd : function(data) {

			this.state = this.GAME_STATE_AFTER;

			this.socket.disconnect();
			
			console.log("Game ended");
			console.log(data.score);

			var myScore = data.score[this.playerId];
			var opponentId = ( this.playerId == "a" ) ? "b" : "a";
			var opponentScore = data.score[opponentId];

			this.win = myScore > opponentScore;

		},

		onGameGoal : function(data){

			console.log("GOAL!");
			console.log(data);

			this.score = data[this.playerId];

			if (audioManager){
				audioManager.playGoal();
			}

		},

		onPaddleBounce : function() {

			// TODO : Beep

			console.log("Bounce");

			if (audioManager){
				audioManager.playBounce();
			}

		},

		update : function() {

			window.requestAnimationFrame(this.update.bind(this));

			if (this.socket && this.state == this.GAME_STATE_DURING){

				if (this.updateFlag){

					this.socket.emit("position", { position : this.input.value });
				}
				this.updateFlag = !this.updateFlag;
			}

		},


		resize : function() {



		}

	};

	window.Controller = Controller;


})();