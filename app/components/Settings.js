import React from 'react';

import { Colours } from '../Constants';

import { getFilePath } from '../utils/fileOperations';

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
    zIndex: 10
  },
  container: {
    margin: 0,
    padding: '20px',
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

class Settings extends React.Component {
  static propTypes = {
    onCancel: React.PropTypes.func.isRequired,
    onSave: React.PropTypes.func.isRequired,
    settings: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = Object.assign({}, { bibTextPath: '' }, this.props.settings);

    this._filePathChanged = this._filePathChanged.bind(this);
    this._getFilePath = this._getFilePath.bind(this);
    this._doSave = this._doSave.bind(this);
  }

  _doSave() {
    this.props.onSave(this.state);
  }

  _filePathChanged(p) {
    this.setState({
      bibtexPath: p
    });
  }

  _getFilePath() {
    getFilePath(this._filePathChanged, [
      { name: 'Bibtex', extensions: ['bib'] },
      { name: 'Text', extensions: ['txt'] }
    ]);
  }

  render() {
    return (
      <div style={styles.wrapper}>
        <div style={styles.container}>

          <span style={styles.closeButton}>
            <a className="button is-danger is-outlined" onClick={this.props.onCancel}>Cancel</a>
            {' '}
            <a className="button is-success" onClick={this._doSave}>Save</a>
          </span>

          <h1 className="title">Settings</h1>
          <p>
            Settings are saved in your data directory in the
            <code>settings.json</code> file
          </p>

          <hr />

          <p className="control">
            <label className="label">BibTex file path</label>
          </p>
          <p className="control is-grouped">
            <input className="input" type="text" placeholder="File Path" onClick={this._getFilePath} disabled value={this.state.bibtexPath} />
            <a className="button is-info" onClick={this._getFilePath}>Select</a>
          </p>

        </div>
      </div>
    );
  }
}

export default Settings;
