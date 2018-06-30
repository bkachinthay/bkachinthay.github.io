/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { Component } from 'react';
import { compose } from 'redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import CssBaseline from 'material-ui/CssBaseline';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Ladders from 'containers/Ladders/Loadable';
import LadderDetail from 'containers/LadderDetail/Loadable';
import AddLadder from 'containers/Ladders/AddLadder/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import AlertContainer from './AlertContainer';
import reducer from './reducer';
import saga from './saga';

class App extends Component { // eslint-disable-line
  render() {
    return (
      <div>
        <CssBaseline />
        <Switch>
          <Redirect exact path="/" to="/ladders" />
          <Route path="/ladders" component={Ladders} />
          <Route path="/ladder/add" component={AddLadder} />
          <Route path="/ladder/:id/edit" component={AddLadder} />
          <Route path="/ladder/:id/:page(|ranking|matches)" component={LadderDetail} />
          <Route exact path="/ladder/:id" component={LadderDetail} />
          <Route component={NotFoundPage} />
        </Switch>
        <AlertContainer />
      </div>
    );
  }
}

const withReducer = injectReducer({ key: 'app', reducer });
const withSaga = injectSaga({ key: 'app', saga });

export default compose(
  withSaga,
  withReducer,
)(App);
