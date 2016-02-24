import bibtexParser from 'bib2json';
import { loadFile } from './fileOperations';

let citationPath = null;
let citations = [];

class CitationManager {
  static setPath(path) {
    citationPath = path;

    if (path && path.length > 0) {
      const inputFile = loadFile(citationPath, '');
      citations = bibtexParser(inputFile);
    }
  }

  static getCitationData(key) {
    const { entries } = citations;

    if (!entries) {
      return null;
    }

    const item = entries.find((e) => {
      return e.EntryKey === key;
    });

    if (!item) {
      return null;
    }

    return item;
  }

  static getCitation(key) {
    const { EntryKey } = CitationManager.getCitationData(key) || {};

    if (EntryKey) {
      return '@' + EntryKey; // TODO use citeproc for actual citation?
    }

    return `## Unknown citation: ${key}`;
  }
}

export default CitationManager;
