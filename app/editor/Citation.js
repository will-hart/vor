import { Inline, Attribute } from 'prosemirror/dist/model';
import { elt } from 'prosemirror/dist/dom';

import CitationParser from './CitationParser';
import CitationManager from '../utils/CitationManager';

// curried renderer
const citationRenderer = (source) => {
  return elt('span', {
    class: 'pm-citation'
  }, '(' + CitationManager.getCitation(source) + ')');
};

class Citation extends Inline {
  get attrs() {
    return {
      source: new Attribute
    };
  }
  get contains() { return null; }
  get draggable() { return false; }
  get kind() { console.warn('Use NodeKind here on upgrade to 0.4.0'); return 'inline'; }
  set kind(k) { console.warn('Ignored seting MathsInline Node Kind to', k); }
}

Citation.register('parseDOM', 'span', {
  rank: 20,
  parse: (dom, state) => {
    if (!dom.classList.contains('pm-citation')) {
      return false;
    }

    state.insert(Citation);
  }
});

Citation.prototype.serializeDOM = node => {
  node.rendered = citationRenderer(node.attrs.source);
  return node.rendered;
};

Citation.prototype.serializeMarkdown = (ser, node) => {
  const md = '[@' + node.attrs.source + ']';
  ser.text(md, false);
};

Citation.register('parseMarkdown', 'citation', {
  parse: function parse(state, tok) {
    state.addNode(this, {
      source: tok.content
    });
  }
});

// install the maths plugin
Citation.register('configureMarkdown', 'citation', parser => {
  return parser.use(CitationParser, {
    inlineRenderer: citationRenderer,
    inlineOpen: '[\u0040',
    inlineClose: ']',
    tokenName: 'citation'
  });
});

Citation.register('command', 'insert', {
  derive: {
    params: [
      {
        attr: 'source',
        label: 'Source',
        type: 'text'
      }
    ]
  },
  label: 'Citation',
  menu: {
    group: 'insert',
    rank: 73,
    display: {
      type: 'label',
      label: 'Citation'
    }
  }
});

export default Citation;
