import { render as katex } from 'katex';
import { Inline, Attribute } from 'prosemirror/dist/model';
import { elt } from 'prosemirror/dist/dom';

class MathsInline extends Inline {
  get attrs() {
    return {
      maths: new Attribute
    };
  }
  get contains() {
    return null;
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
  if (node.rendered) {
    node.rendered = node.rendered.cloneNode(true);
  } else {
    node.rendered = elt('span', {
      class: 'pm-maths-inline'
    }, ' \\(' + node.attrs.maths + '\\) ');

    console.log(node.rendered);
    katex(node.attrs.maths, node.rendered);
  }

  return node.rendered;
};

MathsInline.register('command', 'insert', {
  derive: {
    params: [
      {
        name: 'LaTeX Maths',
        attr: 'maths',
        label: 'LaTeX Maths',
        type: 'text',
        prefill: (pm) => {
          const { node } = pm.selection;
          if (node && node.type === MathsInline) {
            return node.attrs.maths;
          }
        }
      }
    ]
  },
  label: 'Maths - Inline',
  menu: {
    group: 'insert',
    rank: '20',
    display: {
      type: 'label',
      label: 'Maths - Inline'
    }
  }
});

MathsInline.protoype.handleClick = pm => {
  const command = pm.commands['mathsinline:insert'];
  if (command) {
    command.exec(pm);
  }

  return command !== null;
};

export default MathsInline;
