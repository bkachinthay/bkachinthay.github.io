import { createSelector } from 'reselect';

const selectApp = (state) => state.get('app');

const selectRoute = (state) => state.get('route');

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);

const makeSelectAlertText = () => createSelector(
  selectApp,
  (appState) => appState.get('alertMessage') || ''
);

export {
  selectApp,
  makeSelectLocation,
  makeSelectAlertText,
};
