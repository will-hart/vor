import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { open, save, update, create } from '../actions/markdown';
import { save as saveSettings } from '../actions/settings';
const combinedActions = { open, save, update, create, saveSettings };

import KeyHandler from './KeyHandler';
import Titlebar from '../components/Titlebar';
import Editor from '../components/Editor';

class DumbHomePage extends Component {
  static propTypes = {
    document: React.PropTypes.object.isRequired,
    settings: React.PropTypes.object.isRequired,

    create: React.PropTypes.func.isRequired,
    open: React.PropTypes.func.isRequired,
    save: React.PropTypes.func.isRequired,
    saveSettings: React.PropTypes.func.isRequired,
    update: React.PropTypes.func.isRequired
  };

  render() {
    const { document, settings } = this.props;
    const { text } = document;

    let words;

    if (text === undefined || text.length === 0) {
      words = 0;
    } else {
      words = text.match(/([^\s][\w]+)/) ? text.match(/(\w+)/g).length : 0;
    }

    return (
      <KeyHandler {...this.props}>
        <Titlebar
          words={words}
          document={document}
          settings={settings}
          onSaveSettings={this.props.saveSettings}
        />

        <Editor text={text}
          onUpdate={this.props.update}
          onCreate={this.props.create}
          onSave={this.props.save}
          onOpen={this.props.open}
        />
      </KeyHandler>
    );
  }
}

function mapStateToProps(state) {
  return {
    document: state.markdown,
    settings: state.settings
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(combinedActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DumbHomePage);
