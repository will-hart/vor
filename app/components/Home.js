import React, { Component } from 'react';
import ProseMirror from 'react-prosemirror';

import 'prosemirror/dist/inputrules/autoinput';
import 'prosemirror/dist/menu/icons';
import 'prosemirror/dist/menu/menu';
import 'prosemirror/dist/menu/tooltipmenu';
import 'prosemirror/dist/markdown';
import debounce from 'lodash.debounce';

require('bulma/css/bulma.css');

export default class Home extends Component {
  static propTypes = {
    text: React.PropTypes.string.isRequired,
    onUpdate: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      markdown: this.props.text,
      options: {
        docFormat: 'markdown',
        autoInput: true,
        tooltipMenu: { selectedBlockMenu: true },
        menuBar: { float: true }
      }
    };

    this._onChange = this._onChange.bind(this);

    this.performUpdate = debounce(this.props.onUpdate, 300);
  }

  componentWillReceiveProps(nextProps) {
    // console.log("new props", nextProps, this.state);
    if (nextProps.text !== this.state.markdown) {
      this.setState({
        markdown: nextProps.text
      });
    }
  }

  _onChange(newValue) {
    const val = newValue === '' ? ' ' : newValue;
    this.performUpdate(val);
  }

  render() {
    const { markdown, options } = this.state;

    return (
      <div className="columns is-marginless" style={{ position: 'absolute', width: '100%', top: '40px' }}>
        <div className="column content is-fullwidth pm-container">
          <ProseMirror
            value={markdown}
            onChange={this._onChange}
            options={options}
            ref="pm"
          />
        </div>
      </div>
    );
  }
}
