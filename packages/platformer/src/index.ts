import Phaser from 'phaser';

import bombImg from './assets/bomb.png';
import platformImg from './assets/platform.png';
import dudeImg from './assets/dude.png';
import skyImg from './assets/sky.png';
import starImg from './assets/star.png';

let player: any;
let platforms: any;
let bombs: any;
let cursors: any;
let stars: any;
let score: number = 0;
let gameOver: boolean = false;
let scoreText: Phaser.GameObjects.Text;

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

function collectStar(player, star) {
  star.disableBody(true, true);
  score += 10;
  scoreText.setText(`score: ${score}`);

  if (stars.countActive(true) === 0) {
    stars.children.iterate((child) => {
      child.enableBody(true, child.x, 0, true, true);
    });

    let x =
      player.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);

    let bomb = bombs.create(x, 16, 'bomb');

    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200));
  }
}

function create(this: Phaser.Scene) {
  this.add.image(400, 300, 'sky');

  bombs = this.physics.add.group();
  platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, 'platform').setScale(2).refreshBody();
  platforms.create(600, 400, 'platform');
  platforms.create(50, 250, 'platform');
  platforms.create(750, 220, 'platform');

  player = this.physics.add.sprite(100, 450, 'dude');
  player.setCollideWorldBounds(true);
  player.setBounce(0.2);

  scoreText = this.add.text(16, 16, 'score: 0', { fontSize: 32 });

  cursors = this.input.keyboard.createCursorKeys();

  stars = this.physics.add.group({
    key: 'star',
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 },
  });

  stars.children.iterate(function (child: any) {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });

  this.physics.add.collider(bombs, platforms);
  this.physics.add.collider(stars, platforms);
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(player, bombs, () => {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');

    gameOver = true;
  }, undefined, this);
  this.physics.add.overlap(player, stars, collectStar, undefined, this);

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: 'turn',
    frames: [{ key: 'dude', frame: 4 }],
    frameRate: 20,
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });
}

function update() {
  if (cursors.left.isDown) {
    player.setVelocityX(-160);

    player.anims.play('left', true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);

    player.anims.play('right', true);
  } else {
    player.setVelocityX(0);

    player.anims.play('turn');
  }

  if (cursors.up.isDown && player.body.touching.down) {
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
