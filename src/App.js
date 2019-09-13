import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';

import routes from './routes';

const propTypes = {
  history: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired
};

const defaultProps = {};

const App = () => (
  <Switch>
    {routes.map((route) => (
      <Route key={route.path} {...route} />
    ))}
  </Switch>
);

App.propTypes = propTypes;

App.defaultProps = defaultProps;

export default withRouter(App);
