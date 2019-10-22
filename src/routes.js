import Dashboard from './pages/Dashbroad.page';
import ProjectPage from './pages/Projects.page';
import ProjectDetail from './pages/ProjectDetail.page';
import ProjectMemberHistory from './pages/ProjectMemberHistory.page';
import LoginPage from './pages/Login.page';
import ListMemberPage from './pages/ListMember.page';
import Customerpage from './pages/Customers.page';

export default [
  {
    component: Dashboard,
    exact: true,
    path: '/'
  },
  {
    component: ProjectPage,
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
  },
  {
    component: LoginPage,
    exact: false,
    path: '/login'
  },
  {
    component: Customerpage,
    exact: false,
    path: '/customers'
  },
  {
    component: ListMemberPage,
    exact: false,
    path: '/member/list'
  }
];
