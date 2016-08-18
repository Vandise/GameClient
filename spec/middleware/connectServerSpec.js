import { CS_CONNECT } from '../../src/client/constants/actions';
import * as clientSettings from '../../src/client/constants/client';
import { testCSMiddleware } from '../../src/client/middleware/connectServer';

const noOP = () => {};
const setup = () => {
  const store = {};
  const initialConnect = sinon.spy();
  const initialEvent = sinon.spy();
  const actionData = {
    host: clientSettings.CONNECT_SERVER_HOST,
    port: clientSettings.CONNECT_SERVER_PORT,
  };

  return {
    store,
    iConn: initialConnect,
    iEvt: initialEvent,
    data: actionData,
  };
};

describe('Connect Server Middleware', () => {
  describe('On initial connect', () => {
    it('Calls onConnect', () => {
      const params = setup();
      const data = params.data;
      const middleware = testCSMiddleware(
        null,
        params.iConn,
        params.iEvt
      );
      middleware(params.store)(noOP)({
        type: CS_CONNECT,
        data,
      });
      expect(params.iConn.calledOnce).to.equal(true);
    });
  });
});
