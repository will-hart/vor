import React from 'react';
import path from 'path';

import Icon from 'react-fa';

import remote from 'remote';
const BrowserWindow = remote.require('browser-window');

import Helpbar from './Helpbar';


const styles = {
  wrapper: {
    background: '#455A64',
    zIndex: 5,
    width: '100%',
    height: '40px',
    color: 'white',
    paddingLeft: '0.8em',

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

  constructor(props) {
    super(props);

    this.state = {
      helpVisible: false
    };

    this._showHelp = this._showHelp.bind(this);
  }

  _minimise() {
    BrowserWindow.getFocusedWindow().minimize();
  }

  _maximise() {
    const win = BrowserWindow.getFocusedWindow();

    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  }

  _close() {
    BrowserWindow.getFocusedWindow().close();
  }

  _showHelp() {
    this.setState({
      helpVisible: !this.state.helpVisible
    });
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

    const wordCountClass = 'word-count' + (this.props.dirty ? ' dirty' : '');

    return (
      <div>
        {this.state.helpVisible === true ? <Helpbar /> : ''}
        <div className="is-draggable" style={styles.wrapper}>
          <div className="is-inline is-unselectable">
            <Icon name="bars" className="is-not-draggable" style={styles.icon} onDoubleClick={this._close} />
            <span style={{ color: '#999', paddingLeft: '1em' }}>
              {fileDir}
              {fileDir === 'New Document' ? '' : path.sep}
            </span>
            <strong style={{ color: '#FFF' }}>{fileName}</strong>
            {fileDir !== 'New Document' && this.props.dirty ? '*' : ''}
          </div>

          <div className="is-inline is-unselectable">
            <span className={wordCountClass}>
              { this.props.words ? this.props.words + ' words' : '0 words '}
            </span>

            <span className="is-not-draggable" style={styles.buttonGroup}>
              <span style={styles.windowButton} className="window-help-button">
                <Icon style={styles.icon} name="question" onClick={this._showHelp} />
              </span>
              <span style={styles.windowButton} className="window-button">
                <Icon style={styles.icon} name="angle-double-down" onClick={this._minimise} />
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
      </div>
    );
  }
}

export default Titlebar;
