import 'pixi';
import 'p2';
import Phaser from 'phaser';
import characterSelect from './states/characterSelect';
import eventHandler from './events/EventHandler';

export default class extends Phaser.Game {

  constructor(user, dispatch, container = 'gameContainer', width = 950, height = 600) {
    super(width, height, Phaser.AUTO, container, null);
    this.user = user.user;
    this.dispatch = dispatch;
    this.playerData = {};
    this.isInitialized = false;
    this.eventHanlder = null;
    this.state.add('CharacterSelect', characterSelect, false);
  }

  setPlayerData(data) {
    console.log('Setting Player Data', data);
    this.playerData = data;
  }

  initalize() {
    this.isInitialized = true;
    this.eventHandler = new eventHandler({}, this);
    this.state.start('CharacterSelect');
  }
}
