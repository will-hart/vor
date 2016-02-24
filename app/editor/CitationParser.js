// Process ~subscript~

// same as UNESCAPE_MD_RE plus a space
const UNESCAPE_RE = /\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;

const subscript = (state, silent) => {
  const max = state.posMax;
  const start = state.pos;

  // check if starts with [@
  if (state.src.charCodeAt(start) !== 0x5B/* [ */ ||
    state.src.charCodeAt(start + 1) !== 0x40/* @ */) {
    return false;
  }

  // don't run any pairs in validation mode
  if (silent) {
    return false;
  }

  // check if is at least "[@a]"
  if (start + 4 >= max) {
    return false;
  }

  state.pos = start + 1;

  let found = false;

  while (state.pos < max) {
    if (state.src.charCodeAt(state.pos) === 0x5D/* ] */) {
      found = true;
      break;
    }

    state.md.inline.skipToken(state);
  }

  if (!found || start + 1 === state.pos) {
    state.pos = start;
    return false;
  }

  const content = state.src.slice(start + 2, state.pos);

  // don't allow unescaped spaces/newlines inside
  if (content.match(/(^|[^\\])(\\\\)*\s/)) {
    state.pos = start;
    return false;
  }

  // found!
  state.posMax = state.pos;
  state.pos = start + 2;

  const token = state.push('citation', '', 0);
  token.content = content.replace(UNESCAPE_RE, '$1');

  state.pos = state.posMax + 1;
  state.posMax = max;
  return true;
};

const renderOpenTag = (tokens, idx, _options, env, self) => {
  if (tokens[idx].nesting === 1) {
    tokens[idx].attrPush(['class', 'pm-citation']);
  }

  return self.renderToken(tokens, idx, _options, env, self);
};

const citationPlugin = (md) => {
  md.inline.ruler.before('emphasis', 'sub', subscript);
  md.renderer.rules.citation_open = renderOpenTag;
};

export default citationPlugin;
