import { lazy } from 'react';

const Example = lazy(() => import('./pages/Example.page'));
const Dashboard = lazy(() => import('./pages/Dashbroad.page'));
const ListProject = lazy(() => import('./pages/ListProject.page'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail.page'));

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
  },
  {
    component: ListProject,
    exact: false,
    path: '/project/list'
  },
  {
    component: ProjectDetail,
    exact: false,
    path: '/project/detail/:id'
  }
];
