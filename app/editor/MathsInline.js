import { render as katex } from 'katex';
import { Inline, Attribute } from 'prosemirror/dist/model';
import { elt } from 'prosemirror/dist/dom';

const mathsRenderer = maths => {
  const node = elt('span', {
    class: 'pm-maths-inline'
  }, ' \\(' + maths + '\\) ');

  katex(maths, node);
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
  get kind() { console.warn('Use NodeKind here on upgrade to 0.4.0'); return 'inline'; }
  set kind(k) { console.warn('Ignored seting MathsInline Node Kind to', k); }
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
  const md = '$' + node.attrs.maths + '$';
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
  return parser.use(require('markdown-it-simplemath'), { inlineRenderer: mathsRenderer });
});

MathsInline.register('command', 'insert', {
  derive: {
    params: [
      {
        attr: 'maths',
        label: 'Maths',
        type: 'text',
        prefill: function doPrefill(pm) {
          const { node } = pm.selection;
          if (node && node.type === this) {
            return node.attrs.maths;
          }
        }
      }
    ]
  },
  label: 'Maths - Inline',
  menu: {
    group: 'insert',
    rank: 70,
    display: {
      type: 'label',
      label: 'Maths - Inline'
    }
  }
});

MathsInline.prototype.handleClick = (pm) => {
  const command = pm.commands['mathsinline:insert'];
  console.log('Handling click on inline maths');
  console.log(pm.commands['mathsinline:insert'].self.kind);
  if (command) {
    command.exec(pm);
  }

  return command !== null;
};

export default MathsInline;
