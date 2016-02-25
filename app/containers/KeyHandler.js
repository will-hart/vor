import React from 'react';
import { mouseTrap } from 'react-mousetrap';

class KeyHandler extends React.Component {
  static propTypes = {
    children: React.PropTypes.node.isRequired,
    bindShortcut: React.PropTypes.func.isRequired,
    unbindShortcut: React.PropTypes.func.isRequired,

    create: React.PropTypes.func.isRequired,
    open: React.PropTypes.func.isRequired,
    save: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.bindShortcut(['command+s', 'ctrl+s'], this.props.save);
    this.props.bindShortcut(['command+n', 'ctrl+n'], this.props.create);
    this.props.bindShortcut(['command+o', 'ctrl+o'], this.props.open);
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default mouseTrap(KeyHandler);
