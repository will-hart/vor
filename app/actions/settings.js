import CitationManager from '../utils/CitationManager';


export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';

function save(settingsDelta) {
  const { bibtexPath } = settingsDelta;

  if (bibtexPath) {
    CitationManager.setPath(bibtexPath);
  }

  return {
    type: UPDATE_SETTINGS,
    settingsDelta
  };
}

export {
  save
};
