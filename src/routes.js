import React, { lazy, Suspense } from 'react';
import { history } from './redux/store';
import { Route, Router } from 'react-router-dom';
import LoadingProgress from './components/LoadingProgress';

const Example = lazy(() => import('./components/Example'));

const Routes = () => {
  return (
    <Suspense fallback={<LoadingProgress />}>
      <Router history={history}>
        <Route exact path="/" component={Example} />
      </Router>
    </Suspense>
  );
};

export default Routes;
