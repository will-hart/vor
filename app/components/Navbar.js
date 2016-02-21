import React from 'react';
import Icon from 'react-fa';

const styles = {
  navbar: { position: 'fixed', top: '0', zIndex: '5', width: '100%', background: 'white', padding: '3px', height: '33px' },
  navlink: { padding: '3px' }
};

class Navbar extends React.Component {
  static propTypes = {
    words: React.PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this._createFile = this._createFile.bind(this);
    this._saveFile = this._saveFile.bind(this);
    this._openFile = this._openFile.bind(this);
  }

  _createFile() {
    console.log('creating');
  }

  _saveFile() {
    console.log('saving');
  }

  _openFile() {
    console.log('opening');
  }

  render() {
    return (
      <nav style={styles.navbar}>
        <div className="is-pulled-left">
          <p className="is-inline">
            <a style={styles.navlink} onClick={() => this._createFile()}>
              <Icon name="file-o" />
            </a>
          </p>

          <p className="is-inline">
            <a style={styles.navlink} onClick={() => this._saveFile()}>
              <Icon name="save" />
            </a>
          </p>

          <p className="is-inline">
            <a style={styles.navlink} onClick={() => this._openFile()}>
              <Icon name="folder-open-o" />
            </a>
          </p>
        </div>

        <div className="is-pulled-right is-unselectable">
          { this.props.words ? <p className="is-inline">{this.props.words} words</p> : '0 words '}
        </div>
      </nav>
    );
  }
}

export default Navbar;
