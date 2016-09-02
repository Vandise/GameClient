import * as types from '../../src/client/constants/modal';
import * as actions from '../../src/client/actions/modalActions';

describe('Modal Actions', () => {
  it('Creates an action to close the modal', () => {
    const expectedAction = {
      type: types.CLOSE_MODAL,
      payload: {
        closed: true,
        statusCode: 1,
        message: null,
        options: [],
      },
    };
    expect(actions.closeModal()).to.eql(expectedAction);
  });
  it('Creates an action to display the modal', () => {
    const message = 'Nothing Happening Here';
    const expectedAction = {
      type: types.DISPLAY_MODAL,
      payload: {
        closed: false,
        statusCode: 1,
        message,
        options: [],
      },
    };
    expect(actions.displayModal(message)).to.eql(expectedAction);
  });
});
