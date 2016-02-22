import React from 'react';
import path from 'path';

import Icon from 'react-fa';

import remote from 'remote';
const BrowserWindow = remote.require('browser-window');


const styles = {
  wrapper: {
    background: '#689F38',
    zIndex: 5,
    width: '100%',
    height: '40px',
    color: 'white',
    paddingLeft: '0.4em',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'flex-start'
  },
  icon: {
    fontSize: '1em',
    verticalAlign: 'middle'
  },
  wordCount: {
    background: '#8BC34A',
    display: 'inline-block',
    height: '100%',
    paddingLeft: '1em',
    paddingRight: '1em',
    marginRight: '1em'
  },
  buttonGroup: {
    marginRight: '0.5em'
  },
  windowButton: {
    padding: '0.3em 0.5em',
    textAlign: 'center',
    verticalAlign: 'middle',
    fontSize: '1em',
  }
};

class Titlebar extends React.Component {
  static propTypes = {
    path: React.PropTypes.string.isRequired,
    dirty: React.PropTypes.bool.isRequired,
    words: React.PropTypes.number.isRequired
  };

  _minimise() {
    BrowserWindow.getFocusedWindow().minimize();
  }

  _maximise() {
    BrowserWindow.getFocusedWindow().maximize();
  }

  _close() {
    BrowserWindow.getFocusedWindow().close();
  }

  render() {
    const filePath = this.props.path;
    let fileDir;
    let fileName;

    if (filePath && filePath !== '') {
      fileDir = path.dirname(filePath);
      fileName = path.basename(filePath);
    } else {
      fileDir = 'New Document';
    }

    return (
      <div className="is-draggable" style={styles.wrapper}>
        <div className="is-inline is-unselectable">
          <Icon name="bars" style={styles.icon} />
          <span style={{ color: '#EEE', paddingLeft: '1em' }}>
            {fileDir}
            {fileDir === 'New Document' ? '' : path.sep}
          </span>
          <strong>{fileName}</strong>
          {fileDir !== 'New Document' && this.props.dirty ? '*' : ''}
        </div>

        <div className="is-inline is-unselectable">
          <span style={styles.wordCount}>
            { this.props.words ? this.props.words + ' words' : '0 words '}
          </span>

          <span className="is-not-draggable" style={styles.buttonGroup}>
            <span style={styles.windowButton} className="window-button">
              <Icon style={styles.icon} name="bars" onClick={this._minimise} />
            </span>
            <span style={styles.windowButton} className="window-button">
              <Icon style={styles.icon} name="clone" onClick={this._maximise} />
            </span>
            <span style={styles.windowButton} className="window-close-button">
              <Icon style={styles.icon} name="close" onClick={this._close} />
            </span>
          </span>
        </div>
      </div>
    );
  }
}

export default Titlebar;
