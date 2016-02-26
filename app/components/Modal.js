import React from 'react';
import { Colours } from '../Constants';

const styles = {
  wrapper: {
    position: 'fixed',
    top: '40px',
    left: 0,
    right: 0,
    bottom: 0,
    background: Colours.primaryDark90Percent,
    margin: 0,
    padding: '30px',
    zIndex: 10,

    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  },
  container: {
    margin: 0,
    padding: '20px',
    width: '60%',
    maxHeight: '80%',
    minWidth: '800px',
    minHeight: '50px',
    background: 'white',
    overflowY: 'auto',
    position: 'relative'
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'default'
  }
};

class Modal extends React.Component {
  static propTypes = {
    children: React.PropTypes.node.isRequired
  }

  render() {
    return (
      <div style={styles.wrapper} className="is-not-draggable">
        <div style={styles.container} className="is-not-draggable">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Modal;
