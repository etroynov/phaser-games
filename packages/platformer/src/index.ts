import Phaser from 'phaser';

import bombImg from './assets/bomb.png';
import platformImg from './assets/platform.png';
import dudeImg from './assets/dude.png';
import skyImg from './assets/sky.png';
import starImg from './assets/star.png';

let platforms;

function preload(this: Phaser.Scene) {
  this.load.image('bomb', bombImg);
  this.load.image('platform', platformImg);
  this.load.image('sky', skyImg);
  this.load.image('star', starImg);
  this.load.spritesheet('dude', dudeImg, {
    frameWidth: 32,
    frameHeight: 32,
  });
}

function create(this: Phaser.Scene) {
  this.add.image(400, 300, 'sky');

  platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, 'platform').setScale(2).refreshBody();
  platforms.create(600, 400, 'platform');
  platforms.create(50, 250, 'platform');
  platforms.create(750, 220, 'platform');
}

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  scene: {
    preload,
    create,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
};

// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);
