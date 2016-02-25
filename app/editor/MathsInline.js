import { render as katex } from 'katex';
import { Inline, Attribute } from 'prosemirror/dist/model';
import { elt } from 'prosemirror/dist/dom';

import GenericParser from './GenericParser';

// curried renderer
const mathsRenderer = (maths) => {
  const node = elt('span', {
    class: 'pm-maths-inline'
  }, ' \\(' + maths + '\\) ');

  katex(maths, node, { displayMode: false });
  return node;
};


class MathsInline extends Inline {
  get attrs() {
    return {
      maths: new Attribute
    };
  }
  get contains() { return null; }
  get draggable() { return false; }
}

MathsInline.register('parseDOM', 'span', {
  rank: 20,
  parse: (dom, state) => {
    if (!dom.classList.contains('pm-maths-inline')) {
      return false;
    }

    state.insert(MathsInline);
  }
});

MathsInline.prototype.serializeDOM = node => {
  node.rendered = mathsRenderer(node.attrs.maths);
  return node.rendered;
};

MathsInline.prototype.serializeMarkdown = (ser, node) => {
  const md = '$$' + node.attrs.maths + '$$';
  ser.text(md, false);
};

MathsInline.register('parseMarkdown', 'math_inline', {
  parse: function parse(state, tok) {
    state.addNode(this, {
      maths: tok.content
    });
  }
});

// install the maths plugin
MathsInline.register('configureMarkdown', 'math_inline', parser => {
  return parser.use(GenericParser, {
    inlineRenderer: mathsRenderer,
    inlineOpen: '$$',
    inlineClose: '$$',
    tokenName: 'math_inline'
  });
});

MathsInline.register('command', 'insert', {
  derive: {
    params: [
      {
        attr: 'maths',
        label: 'Maths',
        type: 'text'
      }
    ]
  },
  label: 'Maths - Inline',
  menu: {
    group: 'inline',
    rank: 70,
    display: {
      type: 'icon',
      width: 512,
      height: 512,
      path: 'M165.304,284.075l52.534-76.223h35.689v-47.967h-73.374l-39.971,65.096l-7.137,11.991c-1.521,2.279-2.57,4.285-3.14,5.996 h-0.856c-0.571-2.279-1.615-4.285-3.14-5.996c-3.999-7.234-6.189-11.231-6.567-11.991l-39.687-65.096H0.859v47.967h39.112 l52.819,77.661l-56.243,83.083H0v47.675h73.66l44.252-71.376c2.856-4.569,5.236-8.758,7.139-12.563l2.568-5.995h0.859 c0.571,2.279,1.619,4.288,3.14,5.995l6.855,11.995l45.395,71.944h70.81v-47.675h-31.132L165.304,284.075z M400.571,174.734v22.839h-66.239c0.567-6.28,3.47-12.275,8.706-17.987c5.235-5.708,11.464-10.607,18.698-14.7 c7.231-4.093,15.037-8.894,23.414-14.417c8.378-5.521,16.133-11.091,23.271-16.706c7.139-5.612,13.038-12.891,17.699-21.838 c4.661-8.945,6.995-18.751,6.995-29.408c0-18.846-6.476-33.927-19.418-45.253c-12.933-11.326-29.872-16.989-50.819-16.989 c-19.984,0-37.873,6.189-53.662,18.558c-7.054,5.52-13.049,11.803-17.997,18.843l29.988,26.269 c4.185-5.14,7.61-8.757,10.29-10.849c8.754-7.426,17.98-11.137,27.682-11.137c7.807,0,14.514,2.331,20.13,6.995 c5.615,4.665,8.408,10.614,8.408,17.843c0,6.283-2.472,12.371-7.42,18.276c-4.938,5.896-11.136,11.038-18.562,15.415 c-7.409,4.375-15.406,9.563-23.982,15.559c-8.562,5.996-16.557,12.181-23.982,18.555c-7.419,6.377-13.606,14.609-18.555,24.698 c-4.949,10.088-7.427,21.222-7.427,33.404c0,3.424,0.384,7.81,1.144,13.134l0.855,7.7h146.756v-58.803H400.571z'
    }
  }
});

export default MathsInline;
