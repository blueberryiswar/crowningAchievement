import Phaser from "phaser";
import Player from "../Prefabs/Player";
import Controls from "../Utils/Controls";


export default class GameScene extends Phaser.Scene {
	constructor(key) {
		super(key);
    }

    init() {
		this.layers = {};
		this.debug = false;
	}

	create() {
		this.events.emit('newGame');
		//this.createMap();
		this.controls = new Controls(this);
		this.cursors = this.input.keyboard.createCursorKeys();

        this.createPlayer();
        this.setUpCamera();
    }

	createPlayer() {
		this.player = new Player(this, 5, 10);
    }
    
    setUpCamera() {
		this.cameras.main.startFollow(this.player, true, 0.2, 0.2);
		this.cameras.main.setDeadzone(20, 20);
        //this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.setBounds(0, 0, 2840, 1080);
		this.cameras.main.setZoom(3);
	}

    update(time, delta) {
		this.controls.update();
        this.player.update(delta);
    }


}