import { render as katex } from 'katex';
import { Inline, Attribute } from 'prosemirror/dist/model';
import { elt } from 'prosemirror/dist/dom';
import { toText } from 'prosemirror/dist/format';

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

  get contains() {
    return null;
  }

  get draggable() {
    return false;
  }
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
        label: 'Maths',
        type: 'text',
        attr: 'maths',
        prefill: function prefillMenu(pm) {
          console.log('Prefilling Inline Maths', pm);
          return this.attrs.maths;
        }
      }
    ]
  },
  label: 'Insert Inline Maths',
  menu: {
    group: 'insert',
    rank: 20,
    display: {
      type: 'label',
      label: 'Image'
    }
  }
});

MathsInline.prototype.handleClick = (pm) => {
  const command = pm.commands['mathsinline:insert'];
  console.log('Handling click on inline maths');
  if (command) {
    command.exec(pm);
  }

  return command !== null;
};

export default MathsInline;
