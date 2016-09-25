import EventHandler from '../../../src/client/game/events/EventHandler';

const setup = () => {
  const events = {
    mockEvent: sinon.spy(),
  };
  return new EventHandler(events);
};

describe('Phaser Socket Event Handler', () => {
  it('Accepts a hash of events in the constructor', () => {
    const handler = setup();
    expect(Object.keys(handler.events).length).to.equal(1);
  });

  it('Calls with appropriate parameters', () => {
    const handler = setup();
    const params = [true, false];
    handler.emit('mockEvent', params);
    expect(handler.events.mockEvent.firstCall.args).to.eql(params);
  });

  it('Binds a new event', () => {
    const handler = setup();
    handler.bind('test', () => true);
    expect(Object.keys(handler.events).length).to.equal(2);
  });
});
