/*
 * This is a modified version of markdown-it-simplemath, which allows generic tags
 * to be produced.
 *
 * ORIGINAL COPYRIGHT NOTICE:
 * Copyright Adam Pritchard 2015
 * MIT License : http://adampritchard.mit-license.org/
 */

/*
This is basically a stripped down, simplified version of:
https://github.com/runarberg/markdown-it-math
The extra math libraries included by that project were too onerous for use in
Markdown Here, so this has been altered specifically for the needs of MDH.
*/

const scanDelims = (state, start) => {
  const pos = state.pos;
  let lastChar;
  let nextChar;
  let count;

  let isLastWhiteSpace;
  let isLastPunctChar;
  let isNextWhiteSpace;
  let isNextPunctChar;

  let canOpen = true;
  let canClose = true;

  const max = state.posMax;
  const isWhiteSpace = state.md.utils.isWhiteSpace;
  const isPunctChar = state.md.utils.isPunctChar;
  const isMdAsciiPunct = state.md.utils.isMdAsciiPunct;

  // treat beginning of the line as a whitespace
  lastChar = start > 0 ? state.src.charCodeAt(start - 1) : 0x20;
  if (pos >= max) {
    canOpen = false;
  }
  count = pos - start;

  // treat end of the line as a whitespace
  nextChar = pos < max ? state.src.charCodeAt(pos) : 0x20;
  isLastPunctChar = isMdAsciiPunct(lastChar) || isPunctChar(String.fromCharCode(lastChar));
  isNextPunctChar = isMdAsciiPunct(nextChar) || isPunctChar(String.fromCharCode(nextChar));
  isLastWhiteSpace = isWhiteSpace(lastChar);
  isNextWhiteSpace = isWhiteSpace(nextChar);

  if (isNextWhiteSpace) {
    canOpen = false;
  } else if (isNextPunctChar) {
    if (!(isLastWhiteSpace || isLastPunctChar)) {
      canOpen = false;
    }
  }

  if (isLastWhiteSpace) {
    canClose = false;
  } else if (isLastPunctChar) {
    if (!(isNextWhiteSpace || isNextPunctChar)) {
      canClose = false;
    }
  }

  return {
    can_open: canOpen,
    can_close: canClose,
    delims: count
  };
};


const makeParser = (open, close, tokenName) => (state, silent) => {
  let startCount;
  let found;
  let res;
  let token;
  let closeDelim;
  const max = state.posMax;
  const start = state.pos;
  const openDelim = state.src.slice(start, start + open.length);

  if (openDelim !== open) { return false; }

  if (silent) { return false; }    // Don’t run any pairs in validation mode

  res = scanDelims(state, start + open.length);
  startCount = res.delims;

  if (!res.can_open) {
    state.pos += startCount;
    // Earlier we checked !silent, but this implementation does not need it
    state.pending += state.src.slice(start, state.pos);
    return true;
  }

  state.pos = start + open.length;

  while (state.pos < max) {
    closeDelim = state.src.slice(state.pos, state.pos + close.length);
    if (closeDelim === close) {
      res = scanDelims(state, state.pos + close.length);
      if (res.can_close) {
        found = true;
        break;
      }
    }

    state.md.inline.skipToken(state);
  }

  if (!found) {
    // Parser failed to find ending tag, so it is not a valid math
    state.pos = start;
    return false;
  }

  if (start + close.length === state.pos) {
    // There is nothing between the delimiters -- don't match.
    state.pos = start;
    return false;
  }

  // Found!
  state.posMax = state.pos;
  state.pos = start + close.length;

  // Earlier we checked !silent, but this implementation does not need it
  // TODO: What is the 'math' and do we need to make it into a function argument?
  token = state.push(tokenName, 'math', 0);
  token.content = state.src.slice(state.pos, state.posMax);
  token.markup = open;

  state.pos = state.posMax + close.length;
  state.posMax = max;

  return true;
};

const generatePlugin = (md, options) => {
  const inlineOpen = options.inlineOpen || '$';
  const inlineClose = options.inlineClose || '$';

  if (!options || !options.inlineRenderer) {
    throw new Error('options.inlineRender is required');
  }

  if (!options || !options.tokenName) {
    throw new Error('options.tokenName is required');
  }

  var inlineRenderer = function render(tokens, idx) {
    return options.inlineRenderer(tokens[idx].content);
  };

  var inlinePlugin = makeParser(inlineOpen, inlineClose, options.tokenName);

  md.inline.ruler.before('escape', options.tokenName, inlinePlugin);
  md.renderer.rules[options.tokenName] = inlineRenderer;
};

export default generatePlugin;
