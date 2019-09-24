import { lazy } from 'react';

const Example = lazy(() => import('./pages/Example.page'));
const Dashboard = lazy(() => import('./pages/Dashbroad.page'));
const ListProject = lazy(() => import('./pages/ListProject.page'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail.page'));
const ProjectMemberHistory = lazy(() => import('./pages/ProjectMemberHistory.page'));
// const ProjectCreate = lazy(() => import('./pages/ProjectCreate.page'));


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
  },
  {
    component: ProjectMemberHistory,
    exact: false,
    path: '/project/memberHistory/:id'
  }
];
