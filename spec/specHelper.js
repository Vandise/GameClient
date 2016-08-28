import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import chai from 'chai';
import jsdom from 'jsdom';

const dom = jsdom.jsdom;
const exposedProperties = ['window', 'navigator', 'document'];

global.document = dom('');
global.window = document.defaultView;

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

chai.use(sinonChai);
global.expect = chai.expect;
global.sinon = sinon;
global.chai = chai;
global.noOP = () => {};
global.mockServerEvent = (middleware, action, store) => {
  return middleware.server(
    null,
    store,
    noOP,
    null
  )(action.type, action.payload);
};
