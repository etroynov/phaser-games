import Phaser from 'phaser';

import bombImg from './assets/bomb.png';
import platformImg from './assets/platform.png';
import dudeImg from './assets/dude.png';
import skyImg from './assets/sky.png';
import starImg from './assets/star.png';

let player: any;
let platforms: any;
let cursors: any;

function preload(this: Phaser.Scene) {
  this.load.image('bomb', bombImg);
  this.load.image('platform', platformImg);
  this.load.image('sky', skyImg);
  this.load.image('star', starImg);
  this.load.spritesheet('dude', dudeImg, {
    frameWidth: 32,
    frameHeight: 48,
  });
}

function create(this: Phaser.Scene) {
  this.add.image(400, 300, 'sky');

  platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, 'platform').setScale(2).refreshBody();
  platforms.create(600, 400, 'platform');
  platforms.create(50, 250, 'platform');
  platforms.create(750, 220, 'platform');

  player = this.physics.add.sprite(100, 450, 'dude');
  player.setCollideWorldBounds(true);
  player.setBounce(0.2);

  player = this.physics.add.sprite(100, 450, 'dude');

  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  
  this.physics.add.collider(player, platforms);

  cursors = this.input.keyboard.createCursorKeys();

  this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
  });

  this.anims.create({
      key: 'turn',
      frames: [ { key: 'dude', frame: 4 } ],
      frameRate: 20
  });

  this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
  });
}

function update() {
  if (cursors.left.isDown)
  {
      player.setVelocityX(-160);

      player.anims.play('left', true);
  }
  else if (cursors.right.isDown)
  {
      player.setVelocityX(160);

      player.anims.play('right', true);
  }
  else
  {
      player.setVelocityX(0);

      player.anims.play('turn');
  }

  if (cursors.up.isDown && player.body.touching.down)
  {
      player.setVelocityY(-330);
  }
}

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  scene: {
    preload,
    create,
    update,
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
