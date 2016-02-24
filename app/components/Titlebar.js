import React from 'react';
import path from 'path';

import Icon from 'react-fa';

import remote from 'remote';
const BrowserWindow = remote.require('browser-window');

import Helpbar from './Helpbar';
import Settings from './Settings';


const styles = {
  wrapper: {
    background: '#455A64',
    zIndex: 5,
    width: '100%',
    height: '40px',
    color: 'white',
    paddingLeft: '0.8em',
    position: 'fixed',

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
    words: React.PropTypes.number.isRequired,
    document: React.PropTypes.object.isRequired,
    settings: React.PropTypes.object.isRequired,
    onSaveSettings: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      helpVisible: false,
      settingsVisible: false
    };

    this._showHelp = this._showHelp.bind(this);
    this._showSettings = this._showSettings.bind(this);
    this._saveSettings = this._saveSettings.bind(this);
  }

  _minimise(e) {
    e.preventDefault();
    BrowserWindow.getFocusedWindow().minimize();
    return false;
  }

  _maximise(e) {
    e.preventDefault();
    const win = BrowserWindow.getFocusedWindow();

    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }

    return false;
  }

  _close(e) {
    e.preventDefault();
    BrowserWindow.getFocusedWindow().close();
    return false;
  }

  _showHelp(e) {
    e.preventDefault();
    this.setState({
      helpVisible: !this.state.helpVisible
    });
    return false;
  }

  _showSettings(e) {
    e.preventDefault();
    this.setState({
      settingsVisible: !this.state.settingsVisible
    });
    return false;
  }

  _saveSettings(settings) {
    console.log('Saving Settings');
    this.props.onSaveSettings(settings);
    this.setState({
      settingsVisible: false
    });
  }

  render() {
    const filePath = this.props.document.path;
    let fileDir;
    let fileName;

    if (filePath && filePath !== '') {
      fileDir = path.dirname(filePath);
      fileName = path.basename(filePath);
    } else {
      fileDir = 'New Document';
    }

    const wordCountClass = 'word-count' + (this.props.document.dirty ? ' dirty' : '');

    return (
      <div>
        {this.state.helpVisible === true ? <Helpbar /> : ''}
        {this.state.settingsVisible === true ? <Settings onCancel={this._showSettings} onSave={this._saveSettings} /> : ''}

        <div className="is-draggable" style={styles.wrapper}>
          <div className="is-inline is-unselectable">
            <Icon name="bars" className="is-not-draggable" style={styles.icon} onDoubleClick={this._close} />
            <span style={{ color: '#999', paddingLeft: '1em' }}>
              {fileDir}
              {fileDir === 'New Document' ? '' : path.sep}
            </span>
            <strong style={{ color: '#FFF' }}>{fileName}</strong>
            {fileDir !== 'New Document' && this.props.document.dirty ? '*' : ''}
          </div>

          <div className="is-inline is-unselectable">
            <span className={wordCountClass}>
              { this.props.words ? this.props.words + ' words' : '0 words '}
            </span>

            <span className="is-not-draggable" style={styles.buttonGroup}>
              <span style={styles.windowButton} className="window-help-button" onClick={this._showHelp}>
                <Icon style={styles.icon} name="question"/>
              </span>
              <span style={styles.windowButton} className="window-help-button" onClick={this._showSettings}>
                <Icon style={styles.icon} name="cogs" />
              </span>
              <span style={styles.windowButton} className="window-button" onClick={this._minimise}>
                <Icon style={styles.icon} name="angle-double-down" o/>
              </span>
              <span style={styles.windowButton} className="window-button" onClick={this._maximise}>
                <Icon style={styles.icon} name="clone" />
              </span>
              <span style={styles.windowButton} className="window-close-button" onClick={this._close}>
                <Icon style={styles.icon} name="close" />
              </span>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Titlebar;
