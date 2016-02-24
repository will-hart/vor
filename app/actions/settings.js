export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';

function save(settingsDelta) {
  console.log('Dispatching save');
  return {
    type: UPDATE_SETTINGS,
    settingsDelta
  };
}

export {
  save
};
