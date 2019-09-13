import React, { lazy, Suspense } from 'react';
import { Route, Router } from 'react-router-dom';
import { history } from './store';
import LoadingProgress from './components/Loading/LoadingProgress';

const Example = lazy(() => import('./pages/Example.page'));

const Routes = () => {
  return (
    <Suspense fallback={<LoadingProgress />}>
      <Router history={history}>
        <Route path="/" exact component={Example}></Route>
      </Router>
    </Suspense>
  );
};

export default Routes;
