import { lazy } from 'react';

const Example = lazy(() => import('./pages/Example.page'));
const Dashboard = lazy(() => import('./pages/Dashbroad.page'));

export default [
  {
    component: Dashboard,
    exact: true,
    path: '/'
  },
  {
    component: Example,
    exact: false,
    path: '/example/redux-example'
  }
];
