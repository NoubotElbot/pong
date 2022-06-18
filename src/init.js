import Bootloader from './bootloader.js';
import Scene_play from './scenes/scena_play.js';
import Phaser from "phaser";

const config = {
    width: 540,
    height: 300,
    parent: 'container',
    physics: {
        default: 'arcade'
    },
    scene: [Bootloader, Scene_play],
};

var game = new Phaser.Game(config);
