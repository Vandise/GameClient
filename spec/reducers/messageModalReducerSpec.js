import reducer from '../../src/client/reducers/messageModalReducer';
import * as actions from '../../src/client/constants/modal';

describe('Message Modal Reducer', () => {
  it('handles the CLOSE_MODAL event', () => {
    const payload = { closed: true, };
    expect(
      reducer({}, {
        type: actions.CLOSE_MODAL,
        payload,
      })).to.eql(payload);
  });
  it('handles the DISPLAY_MODAL event', () => {
    const payload = { message: 'Hello', };
    expect(reducer({},{
      type: actions.DISPLAY_MODAL,
      payload,
    })).to.eql(payload);
  });
});
