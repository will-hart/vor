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

  static getCitation(key) {
    console.log('Getting citation for key', key);

    const { entries } = citations;

    if (!entries) {
      return `## Unknown citation: ${key}`;
    }

    const item = entries.find((e) => {
      return e.EntryKey === key;
    });

    if (!item) {
      return `UNKNOWN: ${key}`;
    }

    return item.EntryKey;
  }
}

export default CitationManager;
