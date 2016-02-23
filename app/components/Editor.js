import React, { Component } from 'react';
import ProseMirror from 'react-prosemirror';

import 'prosemirror/dist/inputrules/autoinput';
import 'prosemirror/dist/menu/icons';
import 'prosemirror/dist/menu/menu';
import 'prosemirror/dist/menu/menubar';
import 'prosemirror/dist/markdown';
import debounce from 'lodash.debounce';

import Keymap from 'browserkeymap';

require('bulma/css/bulma.css');
require('../assets/css/katex.min.css');

export default class Editor extends Component {
  static propTypes = {
    text: React.PropTypes.string.isRequired,
    onUpdate: React.PropTypes.func.isRequired,

    onCreate: React.PropTypes.func.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onOpen: React.PropTypes.func.isRequired
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
    this._delayedSave = this._delayedSave.bind(this);

    this.performUpdate = debounce((text) => {
      this.props.onUpdate(text);
    }, 300);

    this.editorKeymap = new Keymap({
      'Ctrl-S': this._delayedSave,
      'Ctrl-N': this.props.onCreate,
      'Ctrl-O': this.props.onOpen
    });
  }

  componentDidMount() {
    const pm = this.refs.editor.pm;
    pm.addKeymap(this.editorKeymap);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.text !== this.state.markdown) {
      this.setState({
        markdown: nextProps.text
      });
    }
  }

  _delayedSave() {
    // delayed so that hopefully the debounced performUpdate function will have been called
    setTimeout(this.props.onSave, 500);
  }

  _onChange(newValue) {
    const val = newValue === '' ? ' ' : newValue;
    this.performUpdate(val);
  }

  render() {
    const { markdown, options } = this.state;

    return (
      <div className="columns is-marginless" style={{ position: 'absolute', top: '33px', left: '0', right: '0', bottom: '0', overflow: 'hidden' }}>
        <div className="column content is-fullwidth  is-marginless pm-container">
          <ProseMirror
            style={{ overflowY: 'auto' }}
            value={markdown}
            onChange={this._onChange}
            options={options}
            ref="editor"
          />
        </div>
      </div>
    );
  }
}
