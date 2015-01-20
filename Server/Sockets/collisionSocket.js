var serverController = require('../../CreanvasNodeModule/ServerController');

var games = [];

// called only for the first of all users
var startApplication = function(socketName) {

	var collision = exports.applicationSocket = socketName;

	console.log('Setting up collision socket ');
	
	collision.on('connection', function(socket){
		
		console.log('user connected: ' + socket.id);

		// single user room stuff 
		var theStuff = new CollisionTest(collision, socket)

		socket.on('disconnect', function(){
			theStuff.disconnect();
			console.log('user disconnected');});
		
		socket.on('clientReady', function(){
			theStuff.start();
		});

	});
};

var CollisionTest = function(collision, socket){
	var game = this;
	
	// each user gets a new room
	this.controller = new serverController.Controller(collision, socket.id, false)
	this.controller.addSocket(socket);	

	this.controller.addAxeAlignedBox({
		name: 'left',
		clientType: 'verticalWall',
		left:0,
		right:20,
		top:0,
		bottom:500,
		position: {x: 0, y: 0},			
		solid: {mass:Infinity}
	});

	this.controller.addAxeAlignedBox({
		name: 'right',
		clientType: 'verticalWall',
		left:0,
		right:20,
		top:0,
		bottom:500,
		position: {x: 680, y: 0},			
		solid: {mass:Infinity}
	});

	/*
	this.controller.addAxeAlignedBox({
		name: 'middle',
		clientType: 'verticalWall',
		left:0,
		right:20,
		top:0,
		bottom:250,
		position: {x: 340, y: 125},			
		solid: {mass:Infinity}
	});*/

	this.controller.addAxeAlignedBox({
		name: 'top',
		clientType: 'horizontalWall',
		left:0,
		right:700,
		top:0,
		bottom:20,
		position: {x: 0, y: 0},			
		solid: {mass:Infinity}
	});

	this.controller.addAxeAlignedBox({
		name: 'bottom',
		clientType: 'horizontalWall',
		left:0,
		right:700,
		top:0,
		bottom:20,
		position: {x: 0, y: 480},			
		solid: {mass:Infinity}
	});
	/*
	for (var i=25;i<675;i=i+51)
	{
		this.controller.addCircle({
			name: 'round1',
			clientType: 'bigRound',
			radius: 25,
			position: {x: i, y: 0},			
			solid: {
				mass:Infinity}
		});
		this.controller.addCircle({
			name: 'round1',
			clientType: 'bigRound',
			radius: 25,
			position: {x: i, y: 500},			
			solid: {
				mass:Infinity}
		});
	};
	
	for (var j=25;j<475;j=j+51)
	{
		this.controller.addCircle({
			name: 'round1',
			clientType: 'bigRound',
			radius: 25,
			position: {x: 0, y: j},			
			solid: {
				mass:Infinity}
		});
		this.controller.addCircle({
			name: 'round1',
			clientType: 'bigRound',
			radius: 25,
			position: {x: 700, y: j},			
			solid: {
				mass:Infinity}
		});
	};*/
	
	
	for (var i=100;i<500;i=i+100) 
	for (var j=200;j<400;j=j+100)
//	for (var i=300;i<301;i=i+100) 
//		for (var j=300;j<301;j=j+100)
	{
		this.controller.addCircle({
			name: 'round1',
			clientType: 'round',
			radius: 10,
			position: {x: i, y: j-1.2*(i/5)},			
			solid: {mass:1, collisionCoefficient:1},
			moving: {speed:{x:i-300,y:j-200},acceleration:{y:0}}
		});
				this.controller.addCircle({
			name: 'round1',
			clientType: 'bigRound',
			radius: 25,
			position: {x: i, y: j-1.2*(i/5)+10+1+25},			
			solid: {mass:2, collisionCoefficient:1},
			moving: {speed:{x:i-300,y:j-200},acceleration:{y:0}}
		});
/*
			this.controller.addCircle({
				name: 'round1',
				clientType: 'bigRound',
				radius: 25,
				position: {x: i, y: j-1.2*(i/5)+10+1+25},			
				solid: {mass:2, collisionCoefficient:1},
				moving: {speed:{x:0,y:j-50},acceleration:{y:0}}
			});*/
	};
	
	this.disconnect = function()
	{
		game.controller.stop();
		console.log("Stop called, all sever timers stopped");
	};
	
	this.start = function()
	{
		console.log("ClientReady received, let's start");
		game.controller.resume();
	};
};

exports.startApplication = startApplication;
exports.applicationSocket = null;