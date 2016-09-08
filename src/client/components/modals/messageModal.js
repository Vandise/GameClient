import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modalActions';

// eslint-disable-next-line no-unused-vars
import Styles from '../../../stylesheets/components/modals/message';

const options = {
  Ok: closeModal,
};

export class MessageModal extends React.Component {
  render() {
    const modal = this.props.modal;
    if (!modal.closed) {
      return (
        <div className="message-modal">
          <div className="modal-header">
            Status Code: {modal.statusCode}
          </div>
          <div className="modal-body">
            <p>{modal.message}</p>
          </div>
          <div className="modal-footer">
            <div>
              {modal.options.map((opt) => {
                return (
                  <a
                    key={`opt-${opt}`}
                    className={'button red'}
                    onClick={() => this.props.dispatch(options[opt]())}
                  >
                    {opt}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

MessageModal.propTypes = {
  dispatch: React.PropTypes.func,
  modal: React.PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
  };
};

export default connect(mapStateToProps)(MessageModal);
