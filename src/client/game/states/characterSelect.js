import Phaser from 'phaser';
import debug from '../../util/console';

export default class extends Phaser.State {

  init() {
    debug('initializing charcter select');
  }

  preload() {
    debug('Preloading sprites');
    const text = this.add.text(this.world.centerX, this.world.centerY, "Hello "+this.game.playerData.user.username, { font: '16px Arial', fill: '#dddddd', align: 'center' });
    text.anchor.setTo(0.5, 0.5);
  }

  create() {
    debug('render character select');
    return true;
  }
}