import * as clientSettings from '../../src/client/constants/client';
import * as CS from '../../src/client/middleware/connectServer';
import { connectCS } from '../../src/client/actions/connectServerActions';

const noOP = () => {};
const setup = () => {
  const store = {};
  const actionData = {
    host: clientSettings.CONNECT_SERVER_HOST,
    port: clientSettings.CONNECT_SERVER_PORT,
  };
  return {
    store,
    iConn: sinon.spy(),
    iEvt: sinon.spy(),
    iState: sinon.spy(),
    data: actionData,
  };
};

describe('Connect Server Middleware', () => {
  describe('On initial connect', () => {
    it('Calls connect', () => {
      CS.state[0].action = sinon.spy();
      const params = setup();
      const data = params.data;
      const middleware = CS.middleware(
        null,
      );
      middleware(params.store)(noOP)(connectCS());
      //expect(params.iConn.calledOnce).to.equal(true);
    });
  });
});
