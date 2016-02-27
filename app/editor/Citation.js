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

// install the maths plugin
Citation.register('configureMarkdown', 'citation', parser => {
  return parser.use(CitationParser);
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
    group: 'inline',
    rank: 73,
    display: {
      type: 'icon',
      width: 256, height: 512,
      path: 'M164.454,36.547H54.818c-15.229,0-28.171,5.33-38.832,15.987C5.33,63.193,0,76.135,0,91.365v109.632 c0,15.229,5.327,28.169,15.986,38.826c10.66,10.656,23.606,15.988,38.832,15.988h63.953c7.611,0,14.084,2.666,19.414,7.994       c5.33,5.325,7.994,11.8,7.994,19.417v9.131c0,20.177-7.139,37.397-21.413,51.675c-14.275,14.271-31.499,21.409-51.678,21.409 H54.818c-4.952,0-9.233,1.813-12.851,5.427c-3.615,3.614-5.424,7.898-5.424,12.847v36.549c0,4.941,1.809,9.233,5.424,12.848 c3.621,3.613,7.898,5.427,12.851,5.427h18.271c19.797,0,38.688-3.86,56.676-11.566c17.987-7.707,33.546-18.131,46.68-31.265 c13.131-13.135,23.553-28.691,31.261-46.679c7.707-17.987,11.562-36.877,11.562-56.671V91.361c0-15.23-5.33-28.171-15.987-38.828 S179.679,36.547,164.454,36.547z'
    }
  }
});

export default Citation;
