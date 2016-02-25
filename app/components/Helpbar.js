import React from 'react';
import Icon from 'react-fa';
import classNames from 'classnames';

import Modal from './Modal';

import {
  About,
  Developers,
  Exporting,
  Shortcuts
} from './help';

const helpMap = {
  about: <About />,
  developers: <Developers />,
  exporting: <Exporting />,
  shortcuts: <Shortcuts />
};

class Helpbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeNode: 'about'
    };

    this._setTab = this._setTab.bind(this);
  }

  _setTab(tabName) {
    this.setState({
      activeNode: tabName
    });
  }

  _getContent() {
    return helpMap[this.state.activeNode];
  }

  render() {
    return (
      <Modal>
        <h1 className="title">Help</h1>

        <h2 className="subtitle">
          Click the help button in the menu bar to close this box
        </h2>

        <div className="tabs is-boxed is-unselectable">
          <ul>
            <li className={classNames({ 'is-active': this.state.activeNode === 'about' })}>
              <a onClick={() => this._setTab('about')}>
                <Icon name="question-circle" /> About
              </a>
            </li>

            <li className={classNames({ 'is-active': this.state.activeNode === 'exporting' })}>
              <a onClick={() => this._setTab('exporting')}>
                <Icon name="save"/> Exporting
              </a>
            </li>

            <li className={classNames({ 'is-active': this.state.activeNode === 'shortcuts' })}>
              <a onClick={() => this._setTab('shortcuts')}>
                <Icon name="keyboard-o" /> Shortcuts
              </a>
            </li>

            <li className={classNames({ 'is-active': this.state.activeNode === 'developers' })}>
              <a onClick={() => this._setTab('developers')}>
                <Icon name="code" /> Developers
              </a>
            </li>
          </ul>
        </div>

        {this._getContent()}
      </Modal>
    );
  }
}

export default Helpbar;
