import React from 'react';

class Shortcuts extends React.Component {

  render() {
    return (
      <div>
        <p>The shortcut keys for Vor are similar to what you would expect from a normal text editor. For instance, to manage the open document:</p>
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
      </div>
    );
  }
}

export default Shortcuts;
