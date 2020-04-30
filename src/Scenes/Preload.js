import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
	constructor(key) {
		super(key);
    }

    preload() {
        
        this.load.spritesheet('player', 'assets/characters/player.png', {
            frameWidth: 32,
            frameHeight: 32
        });
    }

	create() {
        this.scene.start('Game');

        this.add.text(0,0, "hack", {font:"1px 8bit", fill: "#fff"});
    }
}