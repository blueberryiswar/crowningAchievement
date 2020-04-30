import 'phaser';

export default {
	  type: Phaser.AUTO,
	  parent: "phaser-example",
	  width: window.innerWidth,
	  height: window.innerHeight,
	  pixelArt: true,
	  roundPixels: true,
	  physics: {
	  	default: 'arcade',
	  	arcade: {
	  		gravity: { y: 0 },
	  		debug: false
	  	}
	  }
};