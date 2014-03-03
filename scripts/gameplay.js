/*jslint browser: true, white: true, plusplus: true */
/*global MYGAME, console, KeyEvent, requestAnimationFrame, performance */
MYGAME.screens['game-play'] = (function() {
	'use strict';
	
	var mouseCapture = false,
		myMouse = MYGAME.input.Mouse(),
		myKeyboard = MYGAME.input.Keyboard(),
		myTexture = null,
		cancelNextRequest = false,
		levelHandler = null;
	
	function initialize() {
		console.log('game initializing...');

		MYGAME.score = 0;
		
		/*
		myTexture = MYGAME.graphics.Texture( {
			image : MYGAME.images['images/Clock.png'],
			center : { x : 100, y : 100 },
			width : 100, height : 100,
			rotation : 0,
			moveRate : 200,			// pixels per second
			rotateRate : 3.14159	// Radians per second
		});
		
		//coins = MYGAME.makeCoins(35, 35, 35, 640, true);
		
		
		/*
		//
		// Create the keyboard input handler and register the keyboard commands
		myKeyboard.registerCommand(KeyEvent.DOM_VK_A, myTexture.moveLeft);
		myKeyboard.registerCommand(KeyEvent.DOM_VK_D, myTexture.moveRight);
		myKeyboard.registerCommand(KeyEvent.DOM_VK_W, myTexture.moveUp);
		myKeyboard.registerCommand(KeyEvent.DOM_VK_S, myTexture.moveDown);
		myKeyboard.registerCommand(KeyEvent.DOM_VK_Q, myTexture.rotateLeft);
		myKeyboard.registerCommand(KeyEvent.DOM_VK_E, myTexture.rotateRight);
		myKeyboard.registerCommand(KeyEvent.DOM_VK_ESCAPE, function() {
			//
			// Stop the game loop by canceling the request for the next animation frame
			cancelNextRequest = true;
			//
			// Then, return to the main menu
			MYGAME.game.showScreen('main-menu');
		});
		
		//
		// Create an ability to move the logo using the mouse
		myMouse = MYGAME.input.Mouse();
		
		
		myMouse.registerCommand('mousedown', function(e) {
			mouseCapture = true;
			myTexture.moveTo({x : e.layerX, y : e.layerY});
		});
		*/
		
		myMouse.registerCommand('mouseup', function(e) {
			if (levelHandler !== null) {
				levelHandler.mouseClicks.push(e);
			}
		});
		
		/*
		myMouse.registerCommand('mousemove', function(e) {
			if (mouseCapture) {
				myTexture.moveTo({x : e.layerX, y : e.layerY});
			}
		});
		*/
	}
	
	//------------------------------------------------------------------
	//
	// This is the Game Loop function!
	//
	//------------------------------------------------------------------
	function gameLoop(time) {
		MYGAME.elapsedTime = time - MYGAME.lastTimeStamp;
		MYGAME.lastTimeStamp = time;

		myKeyboard.update(MYGAME.elapsedTime);
		myMouse.update(MYGAME.elapsedTime);

		MYGAME.graphics.clear();
		//myTexture.draw();
		
		if(levelHandler.gameInProgress) {
			levelHandler.update(MYGAME.elapsedTime);
			levelHandler.render(MYGAME.elapsedTime);
		} else {
			cancelNextRequest = true;
			MYGAME.game.showScreen('main-menu');
		}


		if (!cancelNextRequest) {
			requestAnimationFrame(gameLoop);
		}
	}
	
	function run() {
		MYGAME.lastTimeStamp = performance.now();
		
		MYGAME.score = 0;
		levelHandler = MYGAME.MakeLevelHandler();
		levelHandler.init();
		document.getElementById('score').style.visibility = "visible";
		
		/*
		var normal = {us: 5, canadian: 5, roman: 5},
			extra = {us: 10, canadian: 10, roman: 10};
		
		level = MYGAME.MakeLevel(normal, extra, 'Level 1');
		level.init();
		*/
		// Start the animation loop
		cancelNextRequest = false;
		requestAnimationFrame(gameLoop);
	}
	
	return {
		initialize : initialize,
		run : run
	};
}());
