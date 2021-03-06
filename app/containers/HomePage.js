import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { open, save, update, create } from '../actions/markdown';

import Titlebar from '../components/Titlebar';
import Editor from '../components/Editor';

class DumbHomePage extends Component {
  static propTypes = {
    document: React.PropTypes.object.isRequired,

    create: React.PropTypes.func.isRequired,
    save: React.PropTypes.func.isRequired,
    update: React.PropTypes.func.isRequired,
    open: React.PropTypes.func.isRequired
  };

  render() {
    const { document } = this.props;
    const { text } = document;

    let words;

    if (text === undefined || text.length === 0) {
      words = 0;
    } else {
      words = text.match(/([^\s][\w]+)/) ? text.match(/(\w+)/g).length : 0;
    }

    return (
      <div>
        <Titlebar words={words} path={document.path} dirty={document.dirty} />

        <Editor text={text}
          onUpdate={this.props.update}
          onCreate={this.props.create}
          onSave={this.props.save}
          onOpen={this.props.open}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    document: state.markdown
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ open, save, update, create }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DumbHomePage);
