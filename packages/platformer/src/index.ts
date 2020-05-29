import Phaser from 'phaser';

import bombImg from './assets/bomb.png';
import platformImg from './assets/platform.png';
import dudeImg from './assets/dude.png';
import skyImg from './assets/sky.png';
import starImg from './assets/star.png';

function preload(this: any) {
  this.load.image('bomb', bombImg);
  this.load.image('platform', platformImg);
  this.load.image('sky', skyImg);
  this.load.image('star', starImg);
  this.load.spritesheet('dude', dudeImg, {
    frameWidth: 32,
    frameHeight: 32
  });
}

function create(this: any) {
  this.add.image(400, 300, 'sky');
  this.add.image(400, 300, 'star');
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
};


// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);
