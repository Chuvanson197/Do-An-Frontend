import { lazy } from 'react';

const Example = lazy(() => import('./pages/Example.page'));

export default [
  {
    component: Example,
    exact: true,
    path: '/'
  }
];
