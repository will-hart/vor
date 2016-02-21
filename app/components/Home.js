import React, { Component } from 'react';
import ProseMirror from 'react-prosemirror';

import Navbar from './Navbar';

import 'prosemirror/dist/inputrules/autoinput';
import 'prosemirror/dist/menu/icons';
import 'prosemirror/dist/menu/menu';
import 'prosemirror/dist/menu/tooltipmenu';
import 'prosemirror/dist/markdown';

require('bulma/css/bulma.css');

export default class Home extends Component {
  static propTypes = {
    text: React.PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      options: {
        docFormat: 'markdown',
        autoInput: true,
        tooltipMenu: { selectedBlockMenu: true },
        menuBar: { float: true }
      },
      text: props.text
    };

    this._onChange = this._onChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.text !== this.props.text) {
      this._doTextUpdate();
      this.state.text = newProps.text;
    }
  }

  componentWillUnmount() {
    this._doTextUpdate();
  }

  _onChange(newValue) {
    this.setState({
      text: newValue === '' ? ' ' : newValue
    });
  }

  render() {
    const { options } = this.state;
    const words = this.state.text.match(/([^\s][\w]+)/) ? this.state.text.match(/(\w+)/g).length : 0;

    return (
      <div>
        <Navbar words={words} />

        <div className="columns is-marginless" style={{ position: 'absolute', width: '100%', top: '40px' }}>
          <div className="column content is-fullwidth pm-container">
            <ProseMirror
              value={this.state.text}
              onChange={this._onChange}
              options={options}
              ref="pm"
            />
          </div>
        </div>
    </div>
    );
  }
}
