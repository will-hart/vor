import React from 'react';
import Icon from 'react-fa';

const styles = {
  navbar: { position: 'fixed', top: '0', zIndex: '5', width: '100%', background: 'white', padding: '3px', height: '33px' },
  navlink: { padding: '3px' }
};

class Navbar extends React.Component {
  static propTypes = {
    path: React.PropTypes.string.isRequired,
    words: React.PropTypes.number.isRequired,
    onCreate: React.PropTypes.func.isRequired,
    onOpen: React.PropTypes.func.isRequired,
    onSave: React.PropTypes.func.isRequired
  };

  render() {
    console.log(this.props, this.props.path);

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

          <p className="is-inline">
            { this.props.path === '' ? ' New File' : this.props.path }
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
