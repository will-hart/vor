import React from 'react';

import Modal from './Modal';

import { getFilePath } from '../utils/fileOperations';

const styles = {
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

    this.state = Object.assign({}, { bibtexPath: '', pandocPath: '' }, this.props.settings);

    this._filePathChanged = this._filePathChanged.bind(this);
    this._getFilePath = this._getFilePath.bind(this);
    this._doSave = this._doSave.bind(this);
  }

  _doSave() {
    this.props.onSave(this.state);
  }

  _filePathChanged(p, varName) {
    let newPath = '';

    if (p) {
      newPath = p[0];
    }

    this.setState({
      [varName]: newPath
    });
  }

  _getFilePath(varName) {
    getFilePath((p) => this._filePathChanged(p, varName), [
      { name: 'Bibtex', extensions: ['bib'] },
      { name: 'Text', extensions: ['txt'] }
    ]);
  }

  _getExecutablePath(varName) {
    getFilePath((p) => this._filePathChanged(p, varName), [
      { name: 'Executable', extensions: ['exe'] }
    ]);
  }

  render() {
    return (
      <Modal>
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
          <input className="input" type="text" placeholder="File Path" onClick={() => this._getFilePath('bibtexPath')} disabled value={this.state.bibtexPath} />
          <a className="button is-info" onClick={() => this._getFilePath('bibtexPath')}>Select</a>
        </p>

        <p className="control">
          <label className="label">Pandoc executable path</label>
        </p>
        <p className="control is-grouped">
          <input className="input" type="text" placeholder="Pandoc Path" onClick={() => this._getExecutablePath('pandocPath')} disabled value={this.state.pandocPath} />
          <a className="button is-info" onClick={() => this._getExecutablePath('pandocPath')}>Select</a>
        </p>
      </Modal>
    );
  }
}

export default Settings;
