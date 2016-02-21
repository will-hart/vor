import React from 'react';
import Icon from 'react-fa';
import path from 'path';
import { mouseTrap } from 'react-mousetrap';

const styles = {
  navbar: { position: 'fixed', top: '0', zIndex: '5', width: '100%', background: 'white', padding: '3px', height: '33px' },
  navlink: { padding: '3px' }
};

class Navbar extends React.Component {
  static propTypes = {
    path: React.PropTypes.string.isRequired,
    words: React.PropTypes.number.isRequired,
    dirty: React.PropTypes.bool.isRequired,

    bindShortcut: React.PropTypes.func.isRequired,

    onCreate: React.PropTypes.func.isRequired,
    onOpen: React.PropTypes.func.isRequired,
    onSave: React.PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.bindShortcut('ctrl+s', this.props.onSave);
    this.props.bindShortcut('ctrl+o', this.props.onOpen);
    this.props.bindShortcut('ctrl+n', this.props.onCreate);
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
      <nav style={styles.navbar}>
        <div className="is-pulled-left">
          <p className="is-inline">
            <a style={styles.navlink} onClick={this.props.onCreate}>
              <Icon name="file-o" />
            </a>
          </p>

          <p className="is-inline">
            <a style={styles.navlink} onClick={this.props.onSave}>
              <Icon name="save" />
            </a>
          </p>

          <p className="is-inline">
            <a style={styles.navlink} onClick={this.props.onOpen}>
              <Icon name="folder-open-o" />
            </a>
          </p>

          <p className="is-inline is-unselectable">
            <span style={{ color: '#BBB', paddingLeft: '1em' }}>
              {fileDir}
              {fileDir === '' ? '' : path.sep}
            </span>
            <strong>{fileName}</strong>
            {this.props.dirty ? '*' : ''}
          </p>
        </div>

        <div className="is-pulled-right is-unselectable">
          { this.props.words ? <p className="is-inline">{this.props.words} words</p> : '0 words '}
        </div>
      </nav>
    );
  }
}

export default mouseTrap(Navbar);
