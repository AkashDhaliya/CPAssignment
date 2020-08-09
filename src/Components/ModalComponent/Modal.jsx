import React, { Component } from "react";

const Modal =  (WrappedComponent) => {
  return class extends Component {
    render() {
      return (
        <div className={this.props.modal ? "modal show-modal" : "modal"}>
          <div className="modal-content">
            <WrappedComponent {...this.props} />
          </div>
        </div>
      );
    }
  };
};

export default Modal;
