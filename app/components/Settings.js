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
    onSave: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      bibtexPath: ''
    };

    this._filePathChanged = this._filePathChanged.bind(this);
    this._doSave = this._doSave.bind(this);
  }

  _doSave() {
    this.props.onSave(this.state);
  }

  _filePathChanged(e) {
    this.setState({
      bibtexPath: e.target.value
    });
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
            <input className="input" type="file" placeholder="File Path" onChange={this._filePathChanged} value={this.state.bibtexPath} />
          </p>

        </div>
      </div>
    );
  }
}

export default Settings;
