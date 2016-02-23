import React from 'react';

const styles = {
  helpbarWrapper: {
    position: 'fixed',
    background: '#448AFF',
    color: 'white',
    padding: '3em',
    fontSize: '1.1em',

    bottom: 0,
    width: '100%',
    zIndex: 6
  }
};

class Helpbar extends React.Component {
  render() {
    return (
      <div style={styles.helpbarWrapper}>
        <h1 style={{ fontSize: '1.5em', marginBottom: '0.5em' }}>Help</h1>

        <p>
          This is a very simple markdown editor. There are three keyboard shortcuts:
        </p>

        <ul style={{ padding: '1em' }}>
          <li><strong>Ctrl+N</strong> - create a file</li>
          <li><strong>Ctrl+O</strong> - open a file</li>
          <li><strong>Ctrl+S</strong> - save the current file</li>
        </ul>

        <p>You can also do standard word processing shortcuts such as</p>

        <ul style={{ padding: '1em' }}>
          <li><strong>Ctrl+B</strong> - bold formatting</li>
          <li><strong>Ctrl+I</strong> - italic formatting</li>
        </ul>

        <p>
          Click the help button in the menu bar to close this box
        </p>
      </div>
    );
  }
}

export default Helpbar;
