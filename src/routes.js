import Dashboard from './pages/Dashbroad.page';
import ListProject from './pages/ListProject.page';
import ProjectDetail from './pages/ProjectDetail.page';
import ProjectMemberHistory from './pages/ProjectMemberHistory.page';

export default [
  {
    component: Dashboard,
    exact: true,
    path: '/'
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
