import React from 'react';
import path from 'path';


const styles = {
  wrapper: {
    background: '#689F38',
    position: 'fixed',
    top: 0,
    zIndex: 5,
    width: '100%',
    height: '40px',
    color: 'white',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'flex-start'
  },
  wordCount: {
    background: '#8BC34A',
    display: 'inline-block',
    height: '100%',
    paddingLeft: '1em',
    paddingRight: '1em',
    marginRight: '1em'
  }
};

class Titlebar extends React.Component {
  static propTypes = {
    path: React.PropTypes.string.isRequired,
    dirty: React.PropTypes.bool.isRequired,
    words: React.PropTypes.number.isRequired
  };

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
      <div style={styles.wrapper}>
        <p className="is-inline is-unselectable">
          <span style={{ color: '#EEE', paddingLeft: '1em' }}>
            {fileDir}
            {fileDir === 'New Document' ? '' : path.sep}
          </span>
          <strong>{fileName}</strong>
          {fileDir !== 'New Document' && this.props.dirty ? '*' : ''}
        </p>

        <p className="is-inline is-unselectable">
          <span style={styles.wordCount}>
            { this.props.words ? this.props.words + ' words' : '0 words '}
          </span>
        </p>
      </div>
    );
  }
}

export default Titlebar;
