import Phaser from 'phaser';

export default class Controls {
    constructor(scene) {
        this.scene = scene;
        let cursors = this.scene.input.keyboard.createCursorKeys();
        let wasd = this.getWASD()
        this.movement = {
            arrowKeys: cursors,
            wasd: wasd         
        }
        this.baseAttack = this.getAttackButtons();
        this.showDebug = this.getKeyboard('G');
		this.buildTower = this.getBuildButton();
        this.keyLocked = '';
        this.keyLockedI = -1;
    }

    buttonPressOnce(type) {
        if (this.keyLocked === type) return false
        switch(type) {
            case 'buildTower':
                return this.buildTowerState('down')
            case 'baseAttack':
                return this.baseAttackState('down')
            default:
                console.warn("Unknown Button Type: " + type);
                break;
        }
    }

    update() {
        if (this.keyLocked !== '') {
            switch(this.keyLocked) {
                case 'baseAttack':
                    this.baseAttackState('up');
                    break
                case 'buildTower':
                    this.buildTowerState('up');
                    break
                default:
                    return
            }
        }
    }

    getWASD() {
        let wasd = [];
        let str = "WASD";
        for(let i = 0; i < str.length; i++) {
            wasd.push(this.getKeyboard(str[i]));
        }
        return wasd;
    }

    getAttackButtons() {
        let buttons = [];
        buttons.push(this.getKeyboard(Phaser.Input.Keyboard.KeyCodes.SPACE));
        return buttons;
    }

    getKeyboard(button) {
        return this.scene.input.keyboard.addKey(button);
    }

    up() {
        return this.movement.arrowKeys.up.isDown || this.movement.wasd[0].isDown            
    }

    down() {
        return this.movement.arrowKeys.down.isDown || this.movement.wasd[2].isDown
    }

    left() {
        return this.movement.arrowKeys.left.isDown || this.movement.wasd[1].isDown
    }

    right() {
        return this.movement.arrowKeys.right.isDown || this.movement.wasd[3].isDown
    }

    getBuildButton() {
        let buttons = [];
        buttons.push(this.getKeyboard('E'));
        return buttons
    }

    baseAttackState(state) {
        let pressed = false;
        for (let i = 0; i < this.baseAttack.length; i++) {
            if (state === 'down') {
            pressed = this.baseAttack[i].isDown;
            } else {
                pressed = this.baseAttack[this.keyLockedI].isUp;
            }
            if (pressed && state === 'down') {
                this.keyLocked = 'baseAttack';
                this.keyLockedI = i;
                return pressed
            } else if (pressed && state ===  'up') {
                this.keyLocked = '';
                this.keyLockedI = -1;
                return pressed
            }
        }
        return pressed
    }

    buildTowerState(state) {
        let pressed = false;
        for (let i = 0; i < this.buildTower.length; i++) {
            if (state === 'down') {
                pressed = this.buildTower[i].isDown;
            } else {
                pressed = this.buildTower[this.keyLockedI].isUp;
            }

            if (pressed && state === 'down') {
                this.keyLocked = 'buildTower';
                this.keyLockedI = i;
                return pressed
            } else if (pressed && state ===  'up') {
                this.keyLocked = '';
                this.keyLockedI = -1;
                return pressed
            }
        }
        return pressed
    }

}