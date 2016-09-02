import React from 'react';
import { connect } from 'react-redux';

// eslint-disable-next-line no-unused-vars
import Styles from '../../../stylesheets/components/modals/message';

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
            (No options)
          </div>
        </div>
      );
    }
    return null;
  }
}

MessageModal.propTypes = {
  modal: React.PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
  };
};

export default connect(mapStateToProps)(MessageModal);
